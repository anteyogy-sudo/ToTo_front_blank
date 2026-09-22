import { api } from "@/configs/axios";
import { BannerProps } from "@/types/banner.types";
import { QUERY_KEYS } from "@/types/query-keys.enum";
import { useQuery } from "@tanstack/react-query";
import {useCityStore} from "@/features/navbar/stores/useCityStore";

export const useFetchBannersByIdQuery = (id: number) => {
    const { confirmedCity } = useCityStore();

    return useQuery({
        queryKey: [QUERY_KEYS.BANNER, id, confirmedCity?.id],
        queryFn: async () => {
            try {
                const response = await api.get("/banners/" + id);

                const bannerData = response.data.data;

                if (!bannerData.products?.length && !bannerData.promotion?.products?.length) {
                    return { ...bannerData, products: [] };
                }

                const products_merged = [...(bannerData.promotion?.products ?? []), ...(bannerData.products ?? [])];
                const products_banner = [...new Set(products_merged)];

                // Получаем товары
                const productsResponse = await api.post('/products', {
                    goods: products_banner,
                    city: confirmedCity.id,
                    page: 1
                });

                const products = productsResponse.data.data;

                console.log();

                return {
                    ...bannerData,
                    products: products
                };


            } catch (error) {
                console.error(error);
                throw error;
            }
        },
    });
};
