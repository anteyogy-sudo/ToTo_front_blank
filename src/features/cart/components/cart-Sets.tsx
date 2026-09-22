"use client";
import React from "react";
import { WarningSVG } from "@/icons/WarningIcon";
import { CartSetProps } from "@/types/cart.types";
import {CartProductCard} from "@/features/cart/components/cart-ProductCard";
import {getCartSelectionKey, useCartStore} from "@/stores/useCartStore";
import {Checkbox} from "@/components/ui/checkbox";

// ToDo: Check this icons and separator
// import {Separator} from "@/components/ui/separator";
// import {CrossIcon} from "@/icons/cross";
// import {ArrowSpinIcon} from "@/icons/arrow-spin";

interface Props {
    set: CartSetProps;
}

export const CartSetCard: React.FC<Props> = ({set}) => {
    const selectedItems = useCartStore(state => state.selectedItems);
    const setSelection = useCartStore(state => state.setSelection);

    const selectionKeys = set.goods.map( (_product, productIndex) => getCartSelectionKey( set.id, productIndex ) );

    const selectedCount = selectionKeys.filter( (key) => selectedItems[key] ).length;

    const allSelected = selectionKeys.length > 0 && selectedCount === selectionKeys.length;

    const partiallySelected = selectedCount > 0 && selectedCount < selectionKeys.length;

    if (set.id === null) {
        return (
            <div className=" w-full h-fit flex flex-col bg-white-500 rounded-2xl gap-[10px] place-items-center px-5 py-3 border border-blue-lightGrayBlue">
                {set.goods.map((item, index) => (
                    <CartProductCard
                        key={`outside-${item.id}-${index}`}
                        product={item}
                        setId={set.id}
                        productIndex={index}
                    />
                ))}
            </div>
        );
    }

    const handleSetSelection = () => { setSelection( selectionKeys, !allSelected ); };

    return (
        <>
            <div className="text-primary-blue font-weight-bold text-[20px] leading-[120%] font-bold flex flex-row gap-2" >
                <WarningSVG/>
                <Checkbox
                    checked={ allSelected ? true : partiallySelected ? "indeterminate" : false }
                    onCheckedChange={ handleSetSelection }
                    variant="square"
                    aria-label={`Выбрать комплект ${set.name ?? set.id}`}
                />
                {
                    set.name ? (
                        <span>{set.name}</span>
                    ) : (
                        <span>Комплект - {set.total.amount} товаров</span>
                    )
                }

            </div>
            <div className=" w-full h-fit bg-blue-lightGrayBlue2 rounded-2xl flex flex-col gap-6 p-6 border border-blue-lightGrayBlue">
                <div className=" w-full flex md:items-center md:justify-between md:gap-[8px] relative flex-col ">
                    {set.goods.map((item, index) => (
                        <CartProductCard
                            key={`${set.id}-${item.id}-${index}`}
                            product={item}
                            setId={set.id}
                            productIndex={index}

                        />
                    ))}
                </div>
            </div>
        </>
    );
};