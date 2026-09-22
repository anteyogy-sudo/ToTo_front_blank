import { create } from "zustand";
import { persist } from "zustand/middleware";
import debounce from "lodash.debounce";
import { useUserStore } from "@/stores/useUserStore";
import { useCityStore } from "@/features/navbar/stores/useCityStore";
import { CartItemProps, CartProps } from "@/types/cart.types";
import {nanoid} from "nanoid";
import {cartApi} from "@/features/cart/api/cart.api";

interface PendingDelete {
    id: number;
    expiresAt: number;
    timeoutId: ReturnType<typeof setTimeout>;
}

interface PendingRemoval {
    id: string;
    items: CartItemProps[];
}

interface CartStore {
    items: CartItemProps[];
    cart: CartProps | null;
    selectedCart: CartProps | null;
    selectedCartCount: number;
    count: number;
    isLoading: boolean;

    pendingDeletes: Record<number, PendingDelete>;
    pendingRemovals: Record<string, PendingRemoval>;
    markPendingDelete: (id:number)=>void;
    undoPendingDelete: (id:number)=>void;
    confirmPendingDelete: (id: number) => void;

    selectedIds: number[];
    toggleSelect: (id: number) => void;
    selectAll: () => void;
    clearSelection: () => void;
    getSelectedItems: () => CartItemProps[];
    zeroAmountIds: number[];

    // actions
    fetchCart: () => Promise<void>;
    fetchSelectedCart: () => Promise<void>;
    add: (id: number, amount?: number) => void;
    changeAmount: (id: number, delta: number) => void;
    remove: (ids: number[]) => string;
    undoRemoval: (removalId: string) => void;
    confirmRemoval: (removalId: string) => void;
    mergeCart: () => void;
    isUpdating: boolean;
    clearCart: () => string;

}

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => {
            const syncCart = async () => {
                const { items, zeroAmountIds } = get();

                if (!items.length && !zeroAmountIds.length) {
                    set({
                        cart: null,
                        count: 0,
                    });
                    return;
                }

                const itemsForServer = [
                    ...items,
                    ...zeroAmountIds.map((id) => ({
                        id,
                        amount: 0,
                    })),
                ];

                try {
                    await cartApi.put(itemsForServer);

                    if (!items.length) {
                        set({
                            cart: null,
                            count: 0,
                            zeroAmountIds: [],
                        });
                        return;
                    }
                } catch (e) {
                    console.error("Cart sync PUT error: ", e);
                }

                try {
                    const resp = await cartApi.post(items);

                    set({
                        cart: resp?.data,
                        count: updateCount(items),
                        zeroAmountIds: [],
                    });
                } catch (e) {
                    console.error("Cart sync RESP error: ", e);
                }
            };

            const debouncedSync = debounce(syncCart, 800);

            const updateCount = (items: CartItemProps[]) =>
                items.reduce((sum, i) => sum + i.amount, 0);

            const setNewCart = async (items: CartItemProps[]) => {
                if (!items.length) {
                    set({
                        cart: null,
                        items: [],
                        count: 0,
                        pendingDeletes: {},
                        isUpdating: false,
                    });
                    return;
                }

                //ToDo: isUpdating before actions, not in setNewCart
                set({ isUpdating: true });

                try {
                    const resp = await cartApi.post(items);

                    set({
                        items: items,
                        cart: resp?.data,
                        count: updateCount(items),
                        isLoading: false,
                        isUpdating: false,
                    });
                } catch (e) {
                    console.error("Ошибка замены локальной корзины. ", e);
                    set({
                        cart: null,
                        isUpdating: false,
                    });
                }
            };

            const debouncedFetchSelectedCart = debounce(async() => {
                await get().fetchSelectedCart();
            }, 1000);

            const syncSelectedIds = (
                items: CartItemProps[],
                selectedIds: number[]
            ) => {
                const validIds = new Set(items.map(i => i.id));
                return selectedIds.filter(id => validIds.has(id));
            };

            return {
                items: [],
                cart: null,
                count: 0,
                selectedCart: null,
                selectedCartCount: 0,
                selectedIds: [],
                isLoading: true,
                isUpdating: false,
                pendingDeletes: {},
                pendingRemovals: {},
                zeroAmountIds: [],

                mergeCart: async () => {
                    const serverItems = await cartApi.get();

                    const mergedCart: CartItemProps[] = [...serverItems, ...get().items].reduce<CartItemProps[]>((acc, item) => {
                        const found = acc.find(i => i.id === item.id);
                        if (found) {
                            found.amount += item.amount;
                        } else {
                            acc.push({ id: item.id, amount: item.amount });
                        }
                        return acc;
                    }, []);

                    try {
                        await cartApi.put(mergedCart).catch (e => console.error("Ошибка отправки merged корзины на сервер", e));
                        await setNewCart(mergedCart);
                        set({
                            selectedIds: mergedCart.map(i => i.id),
                        });
                    } catch (error) {
                        console.error("Error when merge-updating cart: ", error);
                    }
                },

                fetchCart: async () => {
                    const { token } = useUserStore.getState();
                    const { confirmedCity } = useCityStore.getState();
                    if (!confirmedCity) {
                        set({ isLoading: false });
                        console.error("Error when fetching cart, city not confirmed");
                        return;
                    }

                    let items: CartItemProps[];
                    try {
                        if (token) {
                            items = await cartApi.get();
                        } else {
                            items = get().items ?? [];
                        }

                        if (items.length === 0) {
                            set({ cart: null, isLoading: false });
                            return;
                        }

                        await setNewCart(items);

                        const syncedSelected = syncSelectedIds(items, get().selectedIds);

                        set({
                            selectedIds: syncedSelected.length ? syncedSelected : items.map(i => i.id),
                            pendingDeletes: {},
                        });

                        console.log("Cart: fetching cart successfully ended.");
                    } catch (e) {
                        console.error("Error when fetching cart: ", e);
                    } finally {
                        set({ isLoading: false });
                    }
                },

                fetchSelectedCart: async () => {
                    const items = get().items;
                    const selectedIds = syncSelectedIds(items, get().selectedIds);

                    if (!selectedIds.length) {
                        set({ selectedCart: null });
                        return;
                    }

                    const selectedItems = items.filter(i =>
                        selectedIds.includes(i.id)
                    );

                    const selectedItemsCount = selectedItems.reduce((sum, item) => sum + item.amount, 0);

                    try {
                        const postResponse = await cartApi.post(selectedItems);
                        set({ selectedCart: postResponse?.data, isUpdating: false, selectedCartCount: selectedItemsCount });
                        console.log("Cart: fetching selectedCart successfully ended. Response: ", postResponse);
                    } catch (e) {
                        console.error("Error when fetching selectedCart: ", e);
                    }
                },

                add: (id, amount = 1) => {
                    try {
                        const existing = get().items.find((item) => item.id === id);
                        const newItems = existing
                            ? get().items.map((item) =>
                                item.id === id ? { ...item, amount: item.amount + amount } : item
                            )
                            : [...get().items, { id, amount }];

                        // const selectedIds = get().selectedIds.includes(id) ? get().selectedIds : [...get().selectedIds, id];

                        debouncedSync();
                        set({
                            items: newItems,
                            selectedIds: [...new Set([...get().selectedIds, id])],
                        });
                    } catch(e) {
                        console.error("Error when adding item: ", e);
                    }
                },

                changeAmount: (id, delta) => {
                    try {
                        const newItems = get().items.map((item) => {
                            if (item.id !== id) return item;

                            const newAmount = item.amount + delta;
                            if (newAmount <= 0) {
                                get().markPendingDelete(id);
                            }

                            return {...item, amount: newAmount};
                        }).filter(Boolean) as CartItemProps[];

                        set({
                            items: newItems,
                        });

                        debouncedSync();

                        const newSelectedCartCount= get().selectedCartCount + delta;

                        if (get().selectedIds.includes(id)) {
                            set({isUpdating: true, selectedCartCount: newSelectedCartCount});
                            debouncedFetchSelectedCart();
                        }
                    } catch (e) {
                        console.error("Error when changeAmount: ", e);
                    }
                },

                remove: (ids) => {
                    const removalId = nanoid();

                    const removedItems = get().items.filter(i => ids.includes(i.id));
                    if (!removedItems.length) return removalId;

                    const newItems = get().items.filter(i => !ids.includes(i.id));
                    const newSelected = get().selectedIds.filter(id => !ids.includes(id));

                    const {token} = useUserStore.getState();
                    const removedItemsIds = removedItems.map((r) => r.id);

                    if (token) {
                        try {
                            cartApi.delete(removedItemsIds);
                        } catch (e) {
                            console.error("Error when removal: ", e);
                        }
                    }

                    set({
                        items: newItems,
                        count: updateCount(newItems),
                        selectedIds: newSelected,
                        pendingRemovals: {
                            ...get().pendingRemovals,
                            [removalId]: {
                                id: removalId,
                                items: removedItems,
                            },
                        },
                    });

                    setNewCart(newItems);

                    return removalId;
                },

                undoRemoval: (removalId) => {
                    const removal = get().pendingRemovals[removalId];
                    if (!removal) return;

                    const restoredItems = [...get().items, ...removal.items];

                    const pending = { ...get().pendingRemovals };
                    delete pending[removalId];

                    cartApi.put(removal.items);

                    const newSelected = [...new Set([
                            ...get().selectedIds,
                            ...removal.items.map(i => i.id),
                        ])];

                    set({
                        items: restoredItems,
                        count: updateCount(restoredItems),
                        pendingRemovals: pending,
                        selectedIds: newSelected,
                    });

                    setNewCart(restoredItems);
                },

                confirmRemoval: (removalId) => {
                    const pending = { ...get().pendingRemovals };
                    delete pending[removalId];

                    set({ pendingRemovals: pending });
                },

                toggleSelect: (id) => {
                    const selectedIds = get().selectedIds.includes(id)
                        ? get().selectedIds.filter(i => i !== id)
                        : [...get().selectedIds, id];
                    set({ selectedIds });
                },

                selectAll: () => {
                    set({ selectedIds: get().items.map(i => i.id) });
                },

                clearSelection: () => {
                    set({ selectedIds: [], selectedCartCount: 0 });
                },

                getSelectedItems: () => {
                    const { items, selectedIds } = get();
                    return items.filter(i => selectedIds.includes(i.id));
                },

                markPendingDelete: (id) => {
                    const existing = get().pendingDeletes[id];
                    if (existing?.timeoutId) {
                        clearTimeout(existing.timeoutId);
                    }
                    const expiresAt = Date.now() + 5000;

                    const timeoutId = setTimeout(() => {
                        get().confirmPendingDelete(id);
                    }, 5000);

                    set(state => ({
                        pendingDeletes: {
                            ...state.pendingDeletes,
                            [id]: { id, expiresAt, timeoutId }
                        }
                    }));
                },

                undoPendingDelete: (id) => {
                    set(state => {
                        const pending = state.pendingDeletes[id];
                        if (pending?.timeoutId) {
                            clearTimeout(pending.timeoutId);
                        }

                        const copy = { ...state.pendingDeletes };
                        delete copy[id];

                        const newZeroIds = new Set(state.zeroAmountIds);
                        newZeroIds.delete(id);

                        return {
                            pendingDeletes: copy,
                            zeroAmountIds: state.zeroAmountIds.filter((zeroId) => zeroId !== id),
                        };
                    });
                },

                confirmPendingDelete: async (productId) => {
                    const pending = get().pendingDeletes[productId];
                    if (!pending) return;

                    if (pending.timeoutId) {
                        clearTimeout(pending.timeoutId);
                    }

                    const newItems = get().items.filter((item) => item.id !== productId);

                    set(state => {
                        const copy = { ...state.pendingDeletes };
                        delete copy[productId];

                        return {
                            items: newItems,
                            pendingDeletes: copy,
                            zeroAmountIds: [...state.zeroAmountIds, productId],
                            count: updateCount(newItems),
                            selectedIds: state.selectedIds.filter((s) => s !== productId),
                        };
                    });

                    debouncedSync();
                },

                clearCart: () => {
                    console.log("В разработке сайта с 09/2025г. по 2027г. участвовали:\nFrontend: \nМаслов Владислав Андреевич\nBackend: Трапезников Дмитрий Николаевич\nПомощь в Frontend оказали: Чебыкина Карина Александровна");
                    const removalId = nanoid();
                    const currentItems = get().items;

                    if (!currentItems.length) return removalId;

                    set({
                        items: [],
                        count: 0,
                        selectedIds: [],
                        cart: null,
                        pendingRemovals: {
                            ...get().pendingRemovals,
                            [removalId]: {
                                id: removalId,
                                items: currentItems,
                            },
                        },
                    });

                    cartApi.clearFull();

                    return removalId;
                },
            };
        },
        {
            name: "cart-storage",
            partialize: (state) => ({
                items: state.items,
                count: state.count,
            }),
        }
    )
);
