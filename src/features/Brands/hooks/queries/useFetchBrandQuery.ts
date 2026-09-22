import { api } from "@/configs/axios";
import { QUERY_KEYS } from "@/types/query-keys.enum";
import { useQuery } from "@tanstack/react-query";
import {BrandProps, BrandResponseProps} from "@/types/brands.types";
import { useCityStore } from "@/features/navbar/stores/useCityStore";

export const useFetchBrandQuery = (id: number) => { // Изменили имя на useFetchBrandQuery
    const { confirmedCity } = useCityStore();

    return useQuery({
        queryKey: [QUERY_KEYS.BRAND, id, confirmedCity?.id],
        queryFn: async () => {
            try {
                // Получаем информацию о бренде
                const brandResponse = await api.get(`/brands/${id}`);
                const brandData = brandResponse.data.data;

                console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA: ",brandData);

                if (!brandData.goods?.length || !confirmedCity?.id) {
                    return { ...brandData, products: [] };
                }

                // Получаем товары
                const productsResponse = await api.post('/products', {
                    goods: brandData.goods,
                    city: confirmedCity.id,
                    page: 1
                });

                const products = productsResponse.data.data;

                return {
                    ...brandData,
                    products: products
                };

            } catch (error) {
                console.error('Error fetching brand data:', error);
                throw error;
            }
        },
        enabled: !!confirmedCity?.id
    });
};