import { api } from "@/configs/axios";
import { QUERY_KEYS } from "@/types/query-keys.enum";
import { useQuery } from "@tanstack/react-query";
import { useCityStore } from "@/features/navbar/stores/useCityStore";
import { ProductProps } from "@/types/product.types";

export const useFetchPopularProductsQuery = () => {
    const { confirmedCity } = useCityStore();

    return useQuery({
        // Добавили confirmedCity.id в queryKey для корректного кэширования по городу
        queryKey: [QUERY_KEYS.POPULAR, confirmedCity?.id],
        queryFn: async () => {
            try {
                // Используем params, для корректных параметров
                const response = await api.get<{ data: ProductProps[] }>("products/popular", {
                    params: { city: confirmedCity?.id },
                });
                return response.data
            } catch (error) {
                console.error(error);
                throw error;
            }
        },
        // Запрос будет выполняться только если город выбран
        enabled: !!confirmedCity?.id,
        staleTime: 5 * 60 * 1000, // 5 минут
        refetchOnWindowFocus: false, // Отключаем перезапрос при фокусе
    });
};