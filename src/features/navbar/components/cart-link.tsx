'use client';

import Link from "next/link";
import { CartCountBadge } from "./cart-count-badge";
import { useCartStore } from "@/stores/useCartStore";
import CartIcon from "@/features/navbar/components/cart-icon";
import { cn } from "@/lib/utils";

type Props = {
    onNavigate?: () => void;
};

export const CartLink = ({ onNavigate }: Props) => {
    const items = useCartStore(state => state.items);

    const count = items.reduce((sum, i) => sum + i.amount, 0) || 0;

    return (
        <Link
            href="/cart"
            onClick={onNavigate}
            className="w-fit flex flex-col items-center text-center justify-between relative h-[50px] hover:opacity-80 text-primary-gray hover:text-primary-blue transition-colors duration-300"
        >
            <div className={cn("w-[54px] h-[35px] flex items-center justify-center", count > 0 && "bg-primary-blue rounded-[12px]")}>
                <CartIcon cart={!!count} />
            </div>
            <span className="select-none text-sm font-medium">Корзина</span>
            <CartCountBadge total_count={count} />
        </Link>
    );
};