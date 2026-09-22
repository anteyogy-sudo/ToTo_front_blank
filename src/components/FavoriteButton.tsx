"use client";

import { useFavoritesStore } from "@/features/favorites/stores/useFavoritesStore";
import { OutlinedHeart } from "@/icons/outlined-heart";
import { RedHeart } from "@/icons/red-heart";
import { ProductProps } from "@/types/product.types";
import { useMemo } from "react";

interface Props {
    productId: ProductProps["id"];
    position?: string
    className?: string
    withLabel?: boolean
}

export const FavoriteButton = ({ productId, position = "right", withLabel = false, className }: Props) => {
    const { favorites, onToggleFavorite } = useFavoritesStore();

    const isFavorite = useMemo(() => {
        return favorites.some((fav) => fav === productId);
    }, [favorites, productId]);

    return (
        <button
            onClick={() => onToggleFavorite(productId)}
            className={`flex items-center justify-center min-w-[32px] min-h-[32px] select-none ${className}`}
        >
            {isFavorite ? <RedHeart /> : <OutlinedHeart />}

            {
                withLabel && <span className='text-primary-blue leading-[110%] text-[14px] font-normal ml-1'>В избранное</span>
            }
        </button>
    );
};