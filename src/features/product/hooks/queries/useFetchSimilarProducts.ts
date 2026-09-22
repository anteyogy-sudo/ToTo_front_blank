import { api } from "@/configs/axios";
import { useCityStore } from "@/features/navbar/stores/useCityStore";
import { QUERY_KEYS } from "@/types/query-keys.enum";
import { useQuery } from "@tanstack/react-query";
import { ProductProps } from "@/types/product.types";

export const useFetchSimilarProducts = (similarProducts: number[]) => {
    const { confirmedCity } = useCityStore();


    return useQuery({
        queryKey: [QUERY_KEYS.SIMILAR_PRODUCTS],
        queryFn: async () => {
            try {
                const response = await api.post<{ goods: ProductProps[]; total: number; total_min_price: number }>(
                    `/products`,
                    {
                        ids: similarProducts,
                        city_id: confirmedCity?.id,
                    }
                );
                return response.data;
            } catch (error) {
                console.error(error);
                throw error;
            }
        },
        enabled: similarProducts.length > 0 && !!confirmedCity?.id,
    });
};
