import { api } from "@/configs/axios";
import { QUERY_KEYS } from "@/types/query-keys.enum";
import { useQuery } from "@tanstack/react-query";
import { PromotionProps } from "@/types/promotion.types";
import { useCityStore } from "@/features/navbar/stores/useCityStore";

export const useFetchStocks = () => {
    const { confirmedCity } = useCityStore();

    return useQuery({
        queryKey: [QUERY_KEYS.STOCKS, confirmedCity?.id],
        enabled: !!confirmedCity?.id,
        queryFn: async () => {
            try {
                const response = await api.get<{ data: PromotionProps[] }>("/promotions", { params: { city: confirmedCity?.id } });
                return response.data.data;
            } catch (error) {
                console.error(error);
                throw error;
            }
        },
    });
};
