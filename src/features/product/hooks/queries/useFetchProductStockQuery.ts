import { api } from "@/configs/axios";
import { useCityStore } from "@/features/navbar/stores/useCityStore";
import { QUERY_KEYS } from "@/types/query-keys.enum";
import { useQuery } from "@tanstack/react-query";
// import { StockProps } from "@/types/stock.types";
// import {ProductProps} from "@/types/product.types";
// import {ProductStock} from "@/types/cart.types";

export const useFetchProductStockQuery = (id: string | null) => {
  const { confirmedCity } = useCityStore();
  return useQuery({
    queryKey: [QUERY_KEYS.PRODUCTSTOCK, id, confirmedCity?.id],
    queryFn: async () => {
      try {
        const response = await api.post('/cart/stocks', {
          city: confirmedCity?.id,
          goods: [{
            id: id,
            amount: 1
          }],
        });
        return response.data.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    // ToDo: Search and delete !!confirmedCity
    enabled: !!id && !!confirmedCity?.id,
  });
};
