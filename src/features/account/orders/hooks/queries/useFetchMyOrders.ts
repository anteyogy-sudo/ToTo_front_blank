import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { OrdersQueryProps } from '@/types/order.types';
import { api } from "@/configs/axios";
import { useUserStore } from "@/stores/useUserStore";

export const useFetchMyOrders = (page: number = 1) => {
    const { token } = useUserStore.getState();
    return useQuery<OrdersQueryProps>({
        queryKey: ['orders', page],
        queryFn: async () => {
            const { data } = await api.get(`/orders?page=${page}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return data;
        },
        enabled: Boolean(token),
        placeholderData: keepPreviousData,
    });
};