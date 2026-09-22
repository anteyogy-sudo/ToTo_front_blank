"use client";

// import { Checkbox } from "@/components/ui/checkbox";
// import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
// import { Slider } from "@/components/ui/slider";
// import { ArrowSVG } from "@/icons/arrow";
import { BlueOutlinedBonus } from "@/icons/blue-outlined-bonus";
import {getCartSelectionKey, useCartStore} from "@/stores/useCartStore";
import { PlaceAnOrderButton } from "./PlaceAnOrderButton";
import {ChoosePharmacyButton} from "@/features/pharmacy/choose/components/choose-pharmacy-button";
//import {ChoosePharmacy} from "@/features/cart/older_cart/components/choose-pharmacy";
import {useMemo} from "react";
import {LoadingSpinner} from "@/components/ui/loading-spinner";
import {CartProps} from "@/types/cart.types";

interface SelectedCartTotals {
    positions: number;
    amount: number;
    price: number;
    fullPrice: number;
    bonus: number;
    discount: number;
}

const calculateSelectedCartTotals = (cart: CartProps | null, selectedItems: Record< string, boolean >): SelectedCartTotals => {
    if (!cart) {
        return { positions: 0, amount: 0, price: 0, fullPrice: 0, bonus: 0, discount: 0, };
    }
    return cart.sets.reduce((result, cartSet) => {

        /** * -------------------------------- * КОМПЛЕКТ * -------------------------------- */
        if (cartSet.id !== null) {
            const setKeys = cartSet.goods.map(
                (_product, productIndex) =>
                    getCartSelectionKey(
                        cartSet.id,
                        productIndex
                    )
            );

            const isSetSelected =
                setKeys.length > 0 &&
                setKeys.every(
                    (key) => selectedItems[key]
                );

            if (!isSetSelected) {
                return result;
            }

            result.positions += 1;
            result.amount += Number(cartSet.total?.amount) || 0;
            result.price += Number(cartSet.total?.price) || 0;
            result.fullPrice += Number(cartSet.total?.fullPrice) || 0;
            result.bonus += Number(cartSet.total?.bonus) || 0;
            result.discount += Number(cartSet.total?.discount) || 0;

            return result;
        }

        /** * -------------------------------- * ВНЕ КОМПЛЕКТА * -------------------------------- **/
        cartSet.goods.forEach((product, productIndex) => {
            const key = getCartSelectionKey(null, productIndex);
            const isSelected = selectedItems[key];
            if (!isSelected) { return; }
            const amount = Number( product.amount ?? product.required ?? 0 ) || 0;
            const pricePerItem = Number(product.price) || 0;
            const price = pricePerItem * amount;
            const fullPricePerItem = Number( product.discount?.fullPrice ?? product.price ) || 0;
            const totalFullPrice = fullPricePerItem * amount;
            const bonusPerItem = Number(product.bonus) || 0;
            const bonus = bonusPerItem * amount;

            result.positions += 1;
            result.amount += amount;
            result.price += price;
            result.fullPrice += totalFullPrice;
            result.bonus += bonus;
            result.discount += totalFullPrice - price;
        });

        return result;
    }, {
        positions: 0, amount: 0, price: 0, fullPrice: 0, bonus: 0, discount: 0,
    });
};

export const CartOrder = () => {
    const cart= useCartStore(state => state.cart);
    const selectedItems = useCartStore(state => state.selectedItems);

    const totals = useMemo(() => calculateSelectedCartTotals(cart, selectedItems), [cart, selectedItems]);

    // useEffect(() => {
    //     fetchSelectedCart();
    // }, [selectedIds.length, fetchSelectedCart, confirmedPharmacy]);

    return (
        <div className="sticky top-44 w-full 2xl:min-w-[400px] 2xl:max-w-[400px] xl:min-w-[376px] xl:max-w-[376px] h-fit rounded-2xl bg-white-500 p-6 shadow-sm flex flex-col gap-6">
            <p className=" font-bold text-[20px] leading-[120%]">Ваш заказ</p>
            {/*<div className=" w-full flex flex-col gap-2">*/}
            {/*  <label*/}
            {/*    htmlFor="promocode"*/}
            {/*    className=" w-fit text-sm font-medium leading-[110%] text-black-100/40"*/}
            {/*  >*/}
            {/*    Промокод*/}
            {/*  </label>*/}
            {/*  <div className=" h-[62px] w-full rounded-2xl flex items-center justify-between gap-2.5 px-4 bg-primary-light-white">*/}
            {/*    <Input*/}
            {/*      id="promocode"*/}
            {/*      className=" h-full w-full border-none focus-visible:ring-0 p-0 placeholder:text-black-100/20 text-[18px]"*/}
            {/*      placeholder="Сначала выберите аптеку"*/}
            {/*    />*/}
            {/*    <button className=" min-w-10 h-10 aspect-square rounded-[8px] flex items-center justify-center bg-[#12121208] text-black-100/40">*/}
            {/*      <ArrowSVG />*/}
            {/*    </button>*/}
            {/*  </div>*/}
            {/*</div>*/}

            <div className=" w-full flex flex-col gap-4">
                <div className=" w-full flex items-center justify-between">
                    <p className=" md:text-[18px] leading-[120%] text-primary-black-gray">
                        Выбрано позиций
                    </p>
                    <span className=" md:text-[18px] leading-[120%] font-bold">
                        {totals.positions}
                    </span>
                </div>
                <div className=" w-full flex items-center justify-between">
                    <p className=" md:text-[18px] leading-[120%] text-primary-black-gray">
                        Выбрано товаров
                    </p>
                    <span className=" md:text-[18px] leading-[120%] font-bold">
                        {totals.amount}
                    </span>
                </div>
                <div className=" w-full flex items-center justify-between">
                    <p className=" md:text-[18px] leading-[120%] text-primary-black-gray">
                        В наличии
                    </p>
                    <span className=" md:text-[18px] leading-[120%] font-bold">
                        {cart?.total?.available ?? 0}
                    </span>
                </div>
                <div className=" w-full flex items-center justify-between">
                    <p className=" md:text-[18px] leading-[120%] text-primary-black-gray">
                        Общая стоимость
                    </p>
                    <span className=" md:text-[18px] leading-[120%] font-bold">
                        {totals.fullPrice} ₽
                    </span>
                </div>
                <div className=" w-full flex items-center justify-between">
                    <p className=" md:text-[18px] leading-[120%] text-primary-blue">
                        Скидка
                    </p>
                    <span className=" md:text-[18px] leading-[120%] font-bold text-primary-blue">
                        {totals.discount} ₽
                    </span>
                </div>
                <div className=" w-full flex items-center justify-between">
                    <p className=" md:text-[18px] leading-[120%] text-primary-black-gray">
                        Бонусов за покупку
                    </p>
                    <div className=" w-fit flex items-center gap-1">
                        <BlueOutlinedBonus />
                        <span className=" md:text-[18px] leading-[120%] font-bold">
                            {totals.bonus}
                        </span>
                    </div>
                </div>
                {/*<div className=" w-full flex flex-col gap-2">*/}
                {/*  <div className=" w-full flex items-center gap-2">*/}
                {/*    <Checkbox id="bonus" />*/}
                {/*    <label*/}
                {/*      htmlFor="bonus"*/}
                {/*      className=" md:text-[18px] leading-[120%] text-primary-black-gray cursor-pointer select-none"*/}
                {/*    >*/}
                {/*      Списать бонусы (394)*/}
                {/*    </label>*/}
                {/*  </div>*/}

                {/*  <div className=" w-full h-4 flex items-center">*/}
                {/*    <Slider className=" h-[2px] bg-primary-gray" />*/}
                {/*  </div>*/}
                {/*</div>*/}
            </div>

            <Separator />

            <div className=" w-full flex items-center justify-between">
                <p className=" md:text-[24px] text-[20px] font-bold leading-[100%]">
                    Итого
                </p>
                <span className=" md:text-[24px] text-[20px] font-bold leading-[100%]">
                    {totals.price} ₽
                </span>
            </div>

            {/*<ChoosePharmacyButton />*/}
            {/*<PlaceAnOrderButton />*/}

            {/*{ isUpdatingCart ? (*/}
            {/*    <div className="text-primary-blue font-weight-bold font-bold flex flex-row gap-[1px] items-center justify-center" >*/}
            {/*        <p className="text-[19px] w-fit max-w-[225px] text-center leading-[120%] ">*/}
            {/*            <LoadingSpinner size={32} />*/}
            {/*        </p>*/}
            {/*    </div>*/}
            {/*) : <></>}*/}
        </div>
    );
};
