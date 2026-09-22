import { useQuery } from '@tanstack/react-query';
import { OrderProps } from '@/types/order.types';
import { api } from "@/configs/axios";
import {useUserStore} from "@/stores/useUserStore";

export const useFetchActiveOrders = () => {
    const { token } = useUserStore.getState();

    return useQuery<{ data: OrderProps[] }>({
        queryKey: ['orders-active'],
        queryFn: async () => {
            const { data } = await api.get('/orders/active', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return data;
        },
        staleTime: 1000 * 60 * 2,
        enabled: Boolean(token),
    });
};