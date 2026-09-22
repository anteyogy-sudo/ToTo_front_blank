import { api } from "@/configs/axios";
import { useCityStore } from "@/features/navbar/stores/useCityStore";
import { QUERY_KEYS } from "@/types/query-keys.enum";
import { useQuery } from "@tanstack/react-query";
import { ProductProps } from "@/types/product.types";

export const useFetchProductQuery = (id: string | null) => {
    const { confirmedCity } = useCityStore();
    return useQuery({
        // Включаем confirmedCity.id в queryKey, чтобы кэш зависел от города
        queryKey: [QUERY_KEYS.PRODUCT, id, confirmedCity?.id],
        queryFn: async () => {
            try {
                const response = await api.get<{ data: ProductProps }>(`/products/${id}`, {
                    params: { city: confirmedCity?.id },
                });
                return response.data;
            } catch (error) {
                console.error(error);
                throw error;
            }
        },
        // Выполнять запрос только если есть id и выбран город
        enabled: !!id && !!confirmedCity?.id,
    });
};
