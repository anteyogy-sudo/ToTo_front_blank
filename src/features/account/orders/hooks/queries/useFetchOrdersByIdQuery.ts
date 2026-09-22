import { api } from "@/configs/axios";

import { useUserStore } from "@/stores/useUserStore";
import { QUERY_KEYS } from "@/types/query-keys.enum";
import { bearerToken } from "@/utils/bearer-token";
import { useQuery } from "@tanstack/react-query";
import { OrderProps } from "@/types/order.types";

export const useFetchMyOrdersQuery = (id : number) => {
  const { token } = useUserStore();
  return useQuery({
    queryKey: [QUERY_KEYS.ORDER, id],
    enabled: !!token && !!id,
    queryFn: async () => {
      try {
        if (!token) return null;
        const response = await api.get<{ data: OrderProps }>(`/orders/${id}`, {
          headers: { Authorization: bearerToken(token) }
        });
        return response.data.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  });
};
