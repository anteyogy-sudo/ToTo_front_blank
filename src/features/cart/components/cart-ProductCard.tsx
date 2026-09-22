'use client'
import { Checkbox } from "@/components/ui/checkbox";
import {getCartSelectionKey, useCartStore} from "@/stores/useCartStore";
import { TrashSVG } from "@/icons/trash";
import { CartProductProps } from "@/types/cart.types";
import { Minus, Plus } from "lucide-react";
import Link from "next/link";
// import {CartUndoButton} from "@/features/cart/components/cart-UndoButton";
import ImageWithFallback from "@/utils/ImageWithFallBack";
import {cn} from "@/lib/utils";
import {useWindowDimension} from "@/hooks/useWindowDimension";
import {Separator} from "@/components/ui/separator";
import {useState} from "react";
import {usePharmacyStore} from "@/stores/usePharmacyStore";

interface Props {
    product: CartProductProps;
    setId: number | null;
    productIndex: number;
}

export const CartProductCard = ({ product, setId, productIndex }: Props) => {
    const changeAmount = useCartStore(state => state.changeAmount);
    const remove = useCartStore(state => state.remove);
    const toggleItemSelection = useCartStore(state => state.toggleItemSelection);
    const selectedItems = useCartStore(state => state.selectedItems);
    const confirmedPharmacy = usePharmacyStore(state => state.confirmedPharmacy);

    const { width } = useWindowDimension();
    const isMobile = width < 768;

    const selectionKey = getCartSelectionKey( setId, productIndex );
    const isSelected = selectedItems[selectionKey] ?? true;


    // const pendingDelete = useCartStore(s => s.pendingDeletes[product.id]);
    const [currentAmount, setCurrentAmount] = useState(product.required ?? 0);

    const currentPrice = product.price * currentAmount;
    const currentFullPrice = (product.discount?.fullPrice ?? 0) * currentAmount;
    const currentDiscount = (product.discount?.amount ?? 0) * currentAmount;

    const discountString = !product.discount ? null : (!product.discount?.isRelative && !product.discount?.isBonus) ? ("-"+currentDiscount+" ₽") : (product.discount?.isRelative ? ("-"+currentDiscount+"%") : (product.discount?.isBonus ? ("+"+currentDiscount+" Б") : null));


    const handleRemove = () => {
        // markPendingDelete(product.id);
    };

    // const isRemoved = !!pendingDelete;
    //
    // if (!currentItem && !pendingDelete) return null

    const handleSelect = () => {
        toggleItemSelection(selectionKey);
    };

    const handleIncrement = () => {
        changeAmount(product.id, +1);
        setCurrentAmount((current) => current + 1);
    };

    const handleDecrement = () => {
        if (currentAmount >= 1) {
            changeAmount(product.id, -1);
            setCurrentAmount((current) => current - 1);
        }
    };

    return isMobile ? (
        <>
            <div className="w-full h-fit flex flex-col gap-[10px]">
                {/*<div className={cn("w-full h-full flex flex-row gap-4 shrink", isRemoved && 'grayscale opacity-60')}>*/}
                <div className="w-full h-full flex flex-row gap-4 shrink">
                    <Link href={`/product/${product.id}`} className="flex w-[60px] h-16 relative">
                        <ImageWithFallback src={product?.images?.[0]}
                                           alt={product?.name}
                                           title={product?.name}
                                           fill
                                           sizes="60px"
                                           className="object-contain object-center"
                        />
                    </Link>
                    <Link href={`/product/${product.id}`}
                          className="flex-1 w-full items-center leading-[120%]"
                    > {product.name} </Link>
                    {/*<Checkbox checked={checked} onCheckedChange={() => toggleSelect(product.id)}/>*/}
                </div>
                {/*{ !isRemoved ? (*/}
                    <div className="w-full flex items-center justify-between">
                            <div className="w-fit flex items-center gap-2">
                                <button type="button"
                                        onClick={handleDecrement}
                                        // disabled={isRemoved}
                                        className="flex px-1 items-center justify-center rounded-full bg-primary-light-white disabled:text-black-100/10 text-primary-gray">
                                    <Minus className="w-4" />
                                </button>
                                <span className="w-full flex items-center justify-center font-medium leading-[120%] whitespace-nowrap">
                                    {currentAmount} шт
                                </span>
                                <button type="button"
                                        onClick={() => changeAmount(product.id, +1)}
                                        // disabled={isRemoved}
                                        className="flex px-1 items-center justify-center rounded-[100%] bg-primary-light-white text-primary-gray">
                                    <Plus className="w-4"/>
                                </button>
                            </div>
                            <div className="w-fit flex flex-row gap-[10px] items-center justify-between flex-wrap">
                                {!!product.discount && (
                                    <div className="flex flex-row gap-[7px]">
                                        <span className="text-[18px] leading-[120%] line-through text-[#64676A] text-nowrap">
                                            {currentFullPrice}
                                        </span>
                                        <div className="flex rounded-[99px] text-[14px] leading-[120%] bg-[#077AE4] text-white-100 px-[12px] py-[4px] text-nowrap">
                                            {discountString}
                                        </div>
                                    </div>
                                )}
                                <span className="flex text-[18px] font-bold leading-[120%] items-center justify-center text-nowrap">
                                    {!confirmedPharmacy && "от"} {currentPrice} ₽
                                </span>

                                <button type="button"
                                        onClick={handleRemove}
                                        className="flex h-fit w-fit text-primary-gray">
                                    <TrashSVG />
                                </button>
                            </div>
                    </div>
                {/*) : (*/}
                {/*    <CartUndoButton product={product} />*/}
                {/*)}*/}
            </div>
            <Separator className="last:hidden" />
        </>
    ) : (
        <>
            <div className="flex justify-between w-full items-center">
                <div className="grid grid-cols-[auto_1fr_150px_135px_35px] w-full items-center gap-[10px]">
                    {/*<div className={cn("flex flex-row items-center gap-4", isRemoved && 'grayscale opacity-60')}>*/}
                    <div className="flex flex-row items-center gap-4">
                        {
                            !setId && (
                                <Checkbox
                                    checked={isSelected} onCheckedChange={() => handleSelect()}
                                    className="inline-block"
                                />
                            )
                        }
                        <Link href={`/product/${product.id}`} className="w-[94px] h-16 relative">
                            <ImageWithFallback src={product.images?.[0]}
                                               title={product.name}
                                               alt={product.name}
                                               fill
                                               sizes="94px"
                                               className="object-contain object-center"
                            />
                        </Link>
                    </div>

                    <Link href={`/product/${product.id}`}
                          className={cn("min-w-0 items-center text-[18px] leading-[120%] line-clamp-3",
                              // isRemoved && 'grayscale opacity-60 col-start-2 col-end-4'
                          )}
                    > {product.name} </Link>

                    {/*{ !isRemoved ? (*/}
                        <>
                            <div className="flex flex-col items-center w-[150px] justify-around">
                                <div className="flex items-center w-[150px] justify-between">
                                    <button type="button"
                                            onClick={handleDecrement}
                                            // disabled={isRemoved}
                                            className="flex py-[7px] items-center justify-center rounded-[8px] bg-primary-light-white disabled:text-black-100/10 text-primary-gray">
                                        <Minus className="w-10" />
                                    </button>
                                    <div className="px-[3px] w-[65px] flex items-center justify-center font-medium leading-[120%] gap-[3px]">
                                        <span className="max-w-[45px] w-fit text-center truncate">
                                            {currentAmount}
                                        </span>
                                        <span className="flex">{" шт"}</span>
                                    </div>
                                    <button type="button"
                                            onClick={handleIncrement}
                                            // disabled={isRemoved}
                                            className="flex py-[7px] items-center justify-center rounded-[8px] bg-primary-light-white disabled:text-black-100/10 text-primary-gray">
                                        <Plus className="w-10"/>
                                    </button>
                                </div>
                                <span className="flex items-center w-[150px] justify-center text-center">
                                    В наличии {product.available} шт
                                </span>
                            </div>

                            <div className="flex flex-col items-center justify-center whitespace-nowrap">
                                {product.discount && (
                                    <div className="flex flex-row gap-[7px]">
                                        <span className="text-[20px] leading-[120%] line-through text-[#64676A] text-nowrap">
                                            {currentFullPrice}
                                        </span>
                                        <div className="flex rounded-[99px] text-[14px] leading-[120%] bg-[#077AE4] text-white-100 px-[12px] py-[4px] text-nowrap">
                                            {discountString}
                                        </div>
                                    </div>
                                )}
                                <span className="flex text-[20px] font-bold leading-[120%] items-center justify-center text-nowrap">
                                    {!confirmedPharmacy && "от"} {currentPrice} ₽
                                </span>
                            </div>

                            <div className="flex justify-end">
                                <button type="button" onClick={handleRemove} className="flex h-fit w-fit text-primary-gray">
                                    <TrashSVG />
                                </button>
                            </div>
                        </>
                    {/*) : (*/}
                    {/*    <div className="col-start-4 col-end-6 justify-end">*/}
                    {/*        <CartUndoButton product={product} />*/}
                    {/*    </div>*/}
                    {/*)}*/}
                </div>
            </div>
            <Separator className="last:hidden" />
        </>
    );
};
