"use client";

import Image from "next/image";
import { useCartStore } from "@/stores/useCartStore";
import { ProductProps } from "@/types/product.types";
import { cn } from "@/lib/utils";

import CartButton from "@/assets/icons/cartbutton/CartButton.svg";
import ActCartButton from "@/assets/icons/cartbutton/ActCartButton.svg";

interface Props {
    id: ProductProps["id"];
    className?: string;
}

// ToDo: Посмотреть и поправить, если что не так и куда этот файл можно деть
export const SearchCartButton = ({ id, className }: Props) => {
    const items = useCartStore(state => state.items);
    const add = useCartStore(state => state.add);
    const remove = useCartStore(state => state.remove);

    const amount = items.find((item) => item.id === id)?.amount ?? 0;
    const isActive = amount > 0;

    const handleClick = () => {
        if (isActive) {
            remove(id);
        } else {
            add(id, 1);
        }
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            aria-label={isActive ? "Удалить из корзины" : "Добавить в корзину"}
            className={cn(
                "inline-flex h-10 w-full items-center justify-center",
                className
            )}
        >
            <Image
                src={isActive ? ActCartButton : CartButton}
                alt={isActive ? "В корзине" : "В корзину"}
                width={128}
                height={40}
                className="h-full w-full object-contain"
            />
        </button>
    );
};