import { api } from "@/configs/axios";
import { useCityStore } from "@/features/navbar/stores/useCityStore";
import { ProductProps } from "@/types/product.types";
import { QUERY_KEYS } from "@/types/query-keys.enum";
import { useQuery } from "@tanstack/react-query";
import { useFetchGoodDaysIdsQuery } from "./useFetchGoodDaysIdsQuery";

export const useFetchProductsQuery = () => {
  const { data: products, status } = useFetchGoodDaysIdsQuery();
  const { confirmedCity } = useCityStore();

  const enabled = Boolean(
    products &&
      confirmedCity?.id &&
      status === "success"
  );

  return useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS, products, confirmedCity?.id],
    queryFn: async () => {
      try {
        const response = await api.post<{
          data: ProductProps[];
          meta: {
            total: number
          };
        }>(`/products`, {
          goods: products,
          city: confirmedCity?.id,
        });

        return response.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    enabled,
  });
};
