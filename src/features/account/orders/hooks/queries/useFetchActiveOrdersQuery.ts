import { api } from "@/configs/axios";
import { useUserStore } from "@/stores/useUserStore";
import { QUERY_KEYS } from "@/types/query-keys.enum";
import { bearerToken } from "@/utils/bearer-token";
import { useQuery } from "@tanstack/react-query";
import { OrderProps } from "@/types/order.types";
import { wait } from "@/utils/wait";

export const UseFetchActiveOrdersQuery = () => {
    const { token } = useUserStore();

    return useQuery({
        queryKey: [QUERY_KEYS.ACTIVE_ORDERS, token],
        queryFn: async () => {
            try {
                if (!token) return null;
                await wait();
                const response = await api.get<{ data: OrderProps[] }>("/orders/active", {
                    headers: { Authorization: bearerToken(token) },
                });
                return response.data;
            } catch (error) {
                console.error(error);
                throw error;
            }
        },
    });
};
