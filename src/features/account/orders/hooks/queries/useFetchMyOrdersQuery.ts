import { api } from "@/configs/axios";
import {usePathname, useSearchParams} from "next/navigation"; // For Next.js 13+ App Router

import { useUserStore } from "@/stores/useUserStore";
import { QUERY_KEYS } from "@/types/query-keys.enum";
import { bearerToken } from "@/utils/bearer-token";
import { useQuery } from "@tanstack/react-query";
import { OrderProps } from "@/types/order.types";
import { wait } from "@/utils/wait";

export const useFetchMyOrdersQuery = () => {
  const { token } = useUserStore();
  const pathname = usePathname();
  const isSuccessPage = pathname === "/successful-order";
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  return useQuery({
    queryKey: [QUERY_KEYS.ORDERS, token, isSuccessPage ? "success" : "default", page],
    queryFn: async () => {
      try {
        if (!token) return null;
        await wait();
        const response = await api.get<{ data: OrderProps[], meta: {last_page : number} }>("/orders", {
          headers: { Authorization: bearerToken(token) },
          params: {page}
        });
        return response.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  });
};
