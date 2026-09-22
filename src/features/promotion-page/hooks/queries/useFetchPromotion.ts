import { api } from "@/configs/axios";
import { QUERY_KEYS } from "@/types/query-keys.enum";
import { useQuery } from "@tanstack/react-query";
import { PromotionProps } from "@/types/promotion.types";
import { ProductProps } from "@/types/product.types";
import { useCityStore } from "@/features/navbar/stores/useCityStore";

export const useFetchPromotion = (id: string) => {
    const { confirmedCity } = useCityStore();

    return useQuery({
        queryKey: [QUERY_KEYS.PROMOTION, id, confirmedCity?.id],
        queryFn: async () => {
            try {
                // Информацию об акции
                const promotionResponse = await api.get<{ data: PromotionProps }>(`/promotions/${id}?city=${confirmedCity?.id}`);
                const promotion = promotionResponse.data.data;

                // Товары
                if (!promotion.products || promotion.products.length === 0) {
                    return { ...promotion, goods: [] };
                }

                const productsResponse = await api.post<{ data: ProductProps[] }>(
                    `/products`,
                    {
                        goods: promotion.products,
                        city: confirmedCity?.id,
                    }
                );

                return {
                    ...promotion,
                    goods: productsResponse.data.data,
                };
            } catch (error) {
                console.error("Ошибка загрузки акции или товаров:", error);
                throw error;
            }
        },
        enabled: !!id && !!confirmedCity?.id,
    });
};