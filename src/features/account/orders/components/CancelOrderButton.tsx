"use client";

import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useUserStore } from "@/stores/useUserStore";
import { useRouter } from "next/navigation";
import React, {useMemo, useState} from "react";
import {toast} from "sonner";
import {api} from "@/configs/axios";

interface Props {
    id: number;
    statusCode?: number;
}

export const CancelOrderButton = ({id, statusCode}: Props) => {
    const { user, token } = useUserStore();

    const router = useRouter();

    const disabled = useMemo(() => {
        return (
            !(!statusCode || statusCode === 200 || statusCode === 201 || statusCode === 213 || statusCode === 100 || statusCode === 0)
        );
    }, [statusCode]);

    const [loading, setLoading] = useState(false);

    const handlePlaceAnOrder = async () => {
        try {
            if (!user || !token) return;

            setLoading(true);
            await api.delete(`/orders/${id}`,
                {headers: {Authorization: `Bearer ${token}`}}
            )
            router.replace(`/account/orders`);
        } catch (e) {
            console.error(e);
            toast.error("Не удалось отменить заказ, попробуйте позднее");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Button
            onClick={handlePlaceAnOrder}
            disabled={loading || disabled}
            className="h-full disabled:bg-gray-700 disabled:text-blue-light-grayfont-bold
            font-bold lg:text-[18px] text-[16px] px-1 flex justify-center items-center text-white-500 w-full min-w-[180px] rounded-[16px] bg-destructive"
        >
            {loading && <LoadingSpinner className={"text-blue-light-grayfont-bold"}/>}
            Отменить заказ
        </Button>
    );
};
