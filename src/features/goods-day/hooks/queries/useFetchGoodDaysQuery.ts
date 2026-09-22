import { api } from "@/configs/axios";
import { useCityStore } from "@/features/navbar/stores/useCityStore";
import { ProductProps } from "@/types/product.types";
import { QUERY_KEYS } from "@/types/query-keys.enum";
import { useQuery } from "@tanstack/react-query";

export const useFetchGoodDaysIdsQuery = () => {
  const { confirmedCity } = useCityStore();

  return useQuery({
    queryKey: [QUERY_KEYS.GOODS_DAY, confirmedCity?.id],
    enabled: !!confirmedCity?.id,
    queryFn: async () => {
      try {
        const response = await api.get<{ data: number[] }>("/products/popular");
        const secondResponse = await api.get<{ data: number[] }>(
          "/products/popular?page=2"
        );

        const ids = [...response.data.data, ...secondResponse.data.data];

        const productResponse = await api.post<{
          goods: ProductProps[];
          total: number;
          total_min_price: number;
        }>(`/products`, {
          ids: ids,
          city: confirmedCity?.id,
        });

        return productResponse.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  });
};
