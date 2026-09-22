"use client";

import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useUserStore } from "@/stores/useUserStore";
import { useRouter } from "next/navigation";
import React, {useState} from "react";
import {toast} from "sonner";
import {OrderProductProps} from "@/types/order.types";
import {useCartStore} from "@/stores/useCartStore";

interface Props {
    products: OrderProductProps[] | undefined;
}

export const RepeatOrderButton = ({products}: Props) => {
    const user = useUserStore(state => state.user);
    const add = useCartStore(state => state.add);

    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const handlePlaceAnOrder = async () => {
        try {
            if (!user || !products) return;
            setLoading(true);

            products.forEach((product) => {add(product.id, product.amount)});

            await new Promise(() => setTimeout(()=> {router.replace(`/cart`);},2000));
        } catch (e) {
            console.error(e);
            toast.error("Не удалось повторить заказ, попробуйте позднее");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Button
            onClick={handlePlaceAnOrder}
            disabled={loading}
            className="h-full disabled:bg-gray-700 disabled:text-blue-light-grayfont-bold
            font-bold lg:text-[18px] text-[16px] px-1 flex justify-center items-center text-white-500 w-full min-w-[180px] rounded-[16px] bg-primary-blue"
        >
            {loading && <LoadingSpinner className={"text-white"}/>}
            Повторить заказ
        </Button>
    );
};