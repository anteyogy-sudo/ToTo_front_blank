import { api } from "@/configs/axios";
import { useCityStore } from "@/features/navbar/stores/useCityStore";
import { QUERY_KEYS } from "@/types/query-keys.enum";
import { useQuery } from "@tanstack/react-query";
import { ProductProps } from "@/types/product.types";
import { useSearchParams } from "next/navigation";

export const useFetchDiscountedProducts = () => {
  const { confirmedCity } = useCityStore();
  const searchParams = useSearchParams();
  const page = searchParams.get("page");

  return useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS, confirmedCity?.id, page],
    queryFn: async () => {
      try {
        const url = page ? `/product?page=${page}` : "/product";

        const response = await api.post<{
          data: ProductProps[];
          meta: { total: number; last_page: number; per_page: number };
        }>(url, {
          city_id: confirmedCity?.id,
          from_promo: true,
        });
        return response.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    enabled: !!confirmedCity?.id,
  });
};
