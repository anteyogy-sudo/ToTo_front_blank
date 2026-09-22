import { api } from "@/configs/axios";
import { QUERY_KEYS } from "@/types/query-keys.enum";
import { useQuery } from "@tanstack/react-query";
import { useCityStore } from "@/features/navbar/stores/useCityStore";
import {ProductsDaysProps} from "@/types/product.types";

export const useFetchGoodDaysIdsQuery = () => {
    const { confirmedCity } = useCityStore();
    return useQuery({
        // Уникальный queryKey, включающий город и ids, чтобы избежать конфликтов с другими хуками
        queryKey: [QUERY_KEYS.POPULAR, confirmedCity?.id, "ids"],
        queryFn: async () => {
            try {
                const response = await api.get<ProductsDaysProps>("products/popular", {
                    params: { city: confirmedCity?.id },
                });
                return response.data;
            } catch (error) {
                console.error(error);
                throw error;
            }
        },
        // Не выполнять запрос пока город не выбран
        enabled: !!confirmedCity?.id,
    });
};
