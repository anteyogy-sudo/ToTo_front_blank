'use client';

import {Container} from "@/components/Container";
import Image from "next/image";
import NoCart from "@/assets/resources/NoCart.svg";
import {ChoosePharmacy} from "@/features/pharmacy/choose/components/choose-pharmacy";
import {useEffect} from "react";
import {useIsomorphicLayoutEffect} from "@/hooks/useIsomorphicLayoutEffect";
import {useOpenCatalogStoreStore} from "@/features/navbar/stores/useOpenCatalogStore";
import { useCartStore } from "@/stores/useCartStore";
import {CartSkeleton} from "@/features/cart/components/ProductsListSkeleton";
import {Separator} from "@/components/ui/separator";
import {Checkbox} from "@/components/ui/checkbox";
import {CartSetCard} from "@/features/cart/components/cart-Sets";
import {CartOrder} from "@/features/cart/components/cart-Order";
import toast from "react-hot-toast";
import {UndoClearToast} from "@/features/cart/components/cartClearUndoToast";
import {usePharmacyStore} from "@/stores/usePharmacyStore";
import {useUserStore} from "@/stores/useUserStore";
// import {GiftProducts} from "@/features/cart/older_cart/components/GiftProducts";
// import {BlueOutlinedBonus} from "@/icons/blue-outlined-bonus";
// import {BuyingTogetherProducts} from "@/features/cart/older_cart/components/BuyingTogetherProducts";

export const Cart = () => {
    const replaceItemsFromServer = useCartStore(state => state.replaceItemsFromServer);
    const postItems =  useCartStore(state => state.postItems);
    const clear =  useCartStore(state => state.clear);
    const clearSelection = useCartStore(state => state.clearSelection);
    const selectAll = useCartStore(state => state.selectAll);
    const selectedItems = useCartStore(state => state.selectedItems);
    const isLoading = useCartStore(state => state.isLoading);
    const cart = useCartStore(state => state.cart);
    const items = useCartStore(state => state.items);
    const cartRevision = useCartStore(state => state.cartRevision);

    const confirmedPharmacy = usePharmacyStore(state => state.confirmedPharmacy);
    const user = useUserStore(state => state.user);

    useIsomorphicLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const setOpenCatalog = useOpenCatalogStoreStore(state => state.setOpenCatalog);
    
    useEffect(() => {
        if (user) {
            replaceItemsFromServer();
        }
        postItems();
    }, [confirmedPharmacy, postItems, replaceItemsFromServer, user]);

    if (isLoading) return (<CartSkeleton/>);

    const allSelectionKeys = cart?.sets.flatMap((cartSet) =>
        cartSet.goods.map((_product, productIndex) =>
            `${cartSet.id === null ? "outside" : `set:${cartSet.id}`}:${productIndex}`
        )) ?? [];

    const selectedCount = allSelectionKeys.filter((key) => selectedItems[key]).length;

    const allSelected = allSelectionKeys.length > 0 && selectedCount === allSelectionKeys.length;

    const partiallySelected = selectedCount > 0 && selectedCount < allSelectionKeys.length;

    const handleSelectAll = () => {
        if (allSelected)
            clearSelection();
        else
            selectAll();
    };

    const handleClear = () => {
        postItems([]);
        toast.custom((toast) => (
            <UndoClearToast
                toastId={toast.id}
                duration={5000}
                onUndo={() => postItems(items)}
                onConfirm={() => clear()}
            />
        ), { duration: Infinity });
    };

    if (items.length === 0 || !cart) {
        return (
            <Container className=" w-full flex flex-col pr-6 md:gap-10 gap-6 2xl:px-20 xl:px-10">
                <div className='w-full pb-[67px]  flex flex-col items-center justify-center '>
                    <Image src={NoCart} alt='icon'/>
                    <div className='flex flex-col h-fit gap-[7px] items-center'>
                        <p className='font-medium text-[20px] lg:w-fit w-full max-w-[376px] leading-[100%] lg:mt-0  text-center text-primary-blue'>Ваша корзина <span className='font-bold'>пуста</span></p>
                        <p className='font-medium  text-[20px] lg:w-fit w-full px-6 min-w-[376px] leading-[100%] lg:mt-0  text-center text-primary-blue'>Воспользуйтесь поиском или каталогом</p>
                    </div>
                    <button onClick={() => setOpenCatalog(true)} className="h-[62px] lg:gap-4 lg:mt-10 mt-[34px]  gap-2 max-w-[337px] w-full font-bold flex justify-center items-center text-white-500 rounded-[16px] bg-primary-blue">
                        Перейти в каталог
                    </button>
                </div>
            </Container>
        );
    }

    return (
        <Container className="w-full flex flex-col pr-6 md:gap-10 gap-6 2xl:px-20 xl:px-10">
            <div className=" w-full h-fit flex items-center justify-between">
                <h3 className=" xl:text-[40px] text-[32px] leading-[100%] font-bold">Корзина</h3>
                <button
                    type="button"
                    onClick={handleClear}
                    disabled={false}
                    className={"w-fit h-fit text-[18px] font-medium leading-[120%] text-black-100/40 disabled:opacity-50 disabled:cursor-not-allowed md:hidden"}
                > Очистить корзину</button>
            </div>
            <div key={cartRevision} className=" w-full flex xl:flex-row flex-col gap-6">
                <div className=" w-full flex flex-col gap-6">
                    <div className=" w-full h-fit bg-white-500 rounded-2xl flex flex-col gap-4 py-5 px-6">
                        <div className=" w-full h-fit flex items-center justify-between">
                            <div
                                data-disabled={false}
                                className=" w-fit flex items-center gap-[10px] data-[disabled=true]:pointer-events-none data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-50 select-none"
                            >
                                <Checkbox
                                    id="check-all"
                                    checked={ allSelected ? true : partiallySelected ? "indeterminate" : false }
                                    onCheckedChange={ handleSelectAll }
                                    // checked={selectedIds.length === items.length}
                                    // onCheckedChange={(v) => v ? selectAll() : clearSelection()}
                                    variant={"rounded"}
                                />
                                <label
                                    htmlFor="check-all"
                                    className=" text-[18px] leading-[120%] text-primary-black-gray cursor-pointer"
                                >
                                    Выбрать все
                                    {/*Выбрать все ({selectedIds.length || 0} из {items.length || 0})*/}
                                </label>
                            </div>
                            <div className="flex gap-8">
                                <button
                                    type="button"
                                    onClick={handleClear}
                                    disabled={false}
                                    className={"w-fit h-fit text-[18px] font-medium leading-[120%] text-black-100/40 disabled:opacity-50 disabled:cursor-not-allowed md:inline-block hidden"}
                                > Очистить корзину</button>
                            </div>
                        </div>

                        <Separator />

                        {cart?.sets.map((set, index) => (
                            <div key={set.id ?? `outside-${index}`} className="flex flex-col gap-3">
                                <CartSetCard set={set} />
                                <Separator />
                            </div>
                        ))}
                    </div>

                    <ChoosePharmacy/>
                    {/*<GiftProducts/>*/}
                </div>
                <CartOrder/>
            </div>
            {/*<BuyingTogetherProducts/>*/}
        </Container>
    );
}