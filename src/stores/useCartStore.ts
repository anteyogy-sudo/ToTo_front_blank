import { create } from "zustand";
import { persist } from "zustand/middleware";
import debounce from "lodash.debounce";
import {CartItemProps, CartProps} from "@/types/cart.types";
import {cartApi} from "@/features/cart/api/cart.api";

// interface PendingDelete {
//     id: number;
//     expiresAt: number;
//     timeoutId: ReturnType<typeof setTimeout>;
// }
//
// interface PendingRemoval {
//     id: string;
//     items: CartItemProps[];
// }

interface CartStore {
    items: CartItemProps[];
    cart: CartProps | null;
    isLoading: boolean;
    cartRevision: number;


    // toggleSelect: (id: number) => void;
    // selectAll: () => void;
    // clearSelection: () => void;
    // getSelectedItems: () => CartItemProps[];

    // ACTIONS
    //
    mergeCart: () => void;
    replaceItemsFromServer: () => Promise<void>;
    postItems: (items?: CartItemProps[]) => Promise<void>;
    //
    clear: () => void;
    replace: (newItems: CartItemProps[]) => void;
    add: (id: number, amount?: number) => void;
    changeAmount: (id: number, delta: number) => void;
    remove: (id: number) => void;

    selectedItems: Record<string, boolean>;
    toggleItemSelection: (key: string) => void;
    setSelection: (keys: string[], selected: boolean) => void;

    selectAll: () => void;
    clearSelection: () => void;

    // pendingDeletes: Record<number, PendingDelete>;
    // markPendingDelete: (id:number)=>void;
    // undoPendingDelete: (id:number)=>void;
    // confirmPendingDelete: (id: number) => void;


    // pendingRemovals: Record<string, PendingRemoval>;
    // undoRemoval: (removalId: string) => void;
    // confirmRemoval: (removalId: string) => void;
}

export const getCartSelectionKey = (setId: number | null, productIndex: number): string => {
    if (setId === null) {
        return `outside:${productIndex}`;
    }
    return `set:${setId}:${productIndex}`;
};

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => {
            // Отправка изменённой корзины на сервер
            const pushChanges = async () => {
                try {
                    const { items, postItems } = get();

                    // Шаг 1. Отправить изменённый список товаров на сервер (с отправкой нулевых товаров)
                    await cartApi.put(items)
                        .catch((err) => console.error("pushChanges: Ошибка при выполнении запроса PutCart. ", err));

                    // Шаг 2. Заменить список товаров на список товаров без удалённых (нулевых товаров)
                    const filteredItems = items.filter(item => item.amount !== 0)
                    set({ items: filteredItems });

                    // // Шаг 3. Получаем актуальную структуру корзины
                    await postItems(filteredItems)
                } catch (e) {
                    console.error("Ошибка при выполнении pushChanges: ", e);
                }
            };

            // Debounce на отправку изменений и обновление структуры корзины
            const debouncedPushChanges = debounce(pushChanges, 700);

            return {
                items: [],
                cart: null,
                cartRevision: 0,
                isLoading: true,
                pendingDeletes: {},
                pendingRemovals: {},
                selectedItems: {},


                mergeCart: async () => { // Используется во время авторизации на сайте, чтобы не потерять локальные товары
                    try {
                        // Шаг 1. Получить товары корзины с сервера
                        const serverItems = await cartApi.get()
                            .catch((err) => console.log("Не удалось получить товары корзины с сервера при merge корзин. ", err));

                        // Шаг 2. Аккумулировать товары локальной и серверной корзин
                        const mergedCart: CartItemProps[] = [...serverItems, ...get().items].reduce<CartItemProps[]>((acc, item) => {
                            const found = acc.find(i => i.id === item.id);
                            if (found) {
                                found.amount += item.amount;
                            } else {
                                acc.push({ id: item.id, amount: item.amount });
                            }
                            return acc;
                        }, []);

                        // Шаг 3. Отправить merge товары на сервер, чтобы сохранить их
                        set({ items: mergedCart });
                        await debouncedPushChanges();
                    } catch (error) {
                        console.error("Ошибка при merge локальной и серверной корзин: ", error);
                    }
                },

                replaceItemsFromServer: async () => { // Используется для получения актуальных товаров пользователя
                    // ПРОВЕРЯТЬ USER ДО ВЫЗОВА!
                    try {
                        const serverItems = await cartApi.get();

                        set({items: serverItems});
                    } catch (e) {
                        console.error("Ошибка во время выполнения replaceFromServer: ", e);
                    } finally {
                        set({ isLoading: false });
                    }
                },

                postItems: async (items: CartItemProps[] = get().items) => { // Используется для получения структуры корзины из списка товаров
                    try {
                        // Если товаров нет --> отобразить пустую корзину без запроса
                        if (items.length === 0) {
                            set({ cart: null, selectedItems: {} });
                            return;
                        }

                        // Шаг 1. POST-запрос по товарам
                        const resp = await cartApi.post(items)
                            .catch((err) => console.error("postCart: ошибка запроса POST. ", err));
                        if (!resp) return;

                        const nextCart = resp.data as CartProps;
                        const previousSelection = get().selectedItems;
                        const nextSelection: Record<string, boolean> = {};

                        nextCart.sets.forEach((cartSet) => {
                            cartSet.goods.forEach((_product, productIndex) => {
                                const key = getCartSelectionKey( cartSet.id, productIndex );
                                nextSelection[key] = previousSelection[key] ?? true;
                            });
                        });

                        set({
                            cart: nextCart,
                            selectedItems: nextSelection,
                            cartRevision: get().cartRevision + 1,
                        });

                        console.log("---------- CART: ", nextCart);

                        // ToDo: обновить итоги корзины
                        console.log("PostCart успешно завершён.");
                    } catch (e) {
                        console.error("Ошибка при выполнении postCart. ", e);
                    } finally {
                        set({ isLoading: false });
                    }
                },

                add: async (id, amount = 1) => {
                    try {
                        // Если товар уже есть в списке, тогда не добавлять
                        const existing = get().items.find((item) => item.id === id);
                        if (existing) { return }

                        // Шаг 1. Добавить товар к списку товаров
                        const newItems = [...get().items, { id, amount }];

                        // Шаг 2. Обновить список товаров и отправить изменения на сервер
                        set({ items: newItems });
                        await debouncedPushChanges();

                    } catch(e) {
                        console.error("Ошибка при добавлении товара в корзину: ", e);
                    }
                },

                changeAmount: async (id, delta) => {
                    try {
                        // Шаг 1. Собрать новый (изменённый) список товаров
                        const newItems = get().items
                            .map((item) => {
                                if (item.id !== id) return item;
                                return {...item, amount: item.amount + delta}; // изменить количество товара
                            });

                        // Шаг 2. Обновить список товаров и отправить изменения на сервер
                        set({ items: newItems });
                        await debouncedPushChanges();
                    } catch (e) {
                        console.error("Ошибка при изменении количества товара в корзине: ", e);
                    }
                },

                remove: async (id) => {
                    try {
                        // Шаг 1. Собрать новый (изменённый) список товаров
                        const newItems = get().items
                            .map((item) => {
                                if (item.id !== id) return item;
                                return {...item, amount: 0}; // сделать товар удаленным (нулевым)
                            });

                        // Шаг 2. Обновить список товаров и отправить изменения на сервер
                        set({ items: newItems });
                        await debouncedPushChanges();
                    } catch (e) {
                        console.error("Ошибка при удалении товара из корзины: ", e);
                    }
                },

                clear: async () => {
                    try {
                        set({ items: [], cart: null });
                        await cartApi.clearFull()
                            .then(() => console.log("Корзина очищена"));
                    } catch (e) {
                        console.error("Ошибка при очистке корзины: ", e);
                    }
                },

                replace: (newItems: CartItemProps[]) => {
                    set({ items: newItems });
                },

                toggleItemSelection: (key) => {
                    set((state) => ({
                        selectedItems: { ...state.selectedItems, [key]: !state.selectedItems[key], },
                    }));
                },

                setSelection: (keys, selected) => {
                    set((state) => {
                        const nextSelection = { ...state.selectedItems, };
                        keys.forEach((key) => {
                            nextSelection[key] = selected;
                        });
                        return { selectedItems: nextSelection, };
                    });
                },

                selectAll: () => {
                    const { cart } = get();
                    if (!cart) { return; }
                    const nextSelection: Record<string, boolean > = {};

                    cart.sets.forEach((cartSet) => {
                        cartSet.goods.forEach((_product, productIndex) => {
                            const key = getCartSelectionKey(cartSet.id, productIndex); nextSelection[key] = true;
                        } );
                    });

                    set({ selectedItems: nextSelection, });
                },

                clearSelection: () => {
                    const { cart } = get(); if (!cart) { return; }
                    const nextSelection: Record<string, boolean > = {};
                    cart.sets.forEach((cartSet) => {
                        cartSet.goods.forEach((_product, productIndex) => {
                            const key = getCartSelectionKey( cartSet.id, productIndex ); nextSelection[key] = false;
                        });
                    });
                    set({ selectedItems: nextSelection,});
                },
            };
        },
        {
            name: "cart-storage",
            partialize: (state) => ({
                items: state.items,
            }),
        }
    )
);
