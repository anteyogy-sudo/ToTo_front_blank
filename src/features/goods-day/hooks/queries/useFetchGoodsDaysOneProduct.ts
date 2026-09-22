import { api } from "@/configs/axios";
import { useCityStore } from "@/features/navbar/stores/useCityStore";
import { ProductProps } from "@/types/product.types";
import { QUERY_KEYS } from "@/types/query-keys.enum";
import { useQuery } from "@tanstack/react-query";

export const useFetchGoodsDaysOneProduct = () => {
    const { confirmedCity } = useCityStore();
    return useQuery({
        // Уникальный queryKey включающий город и "one"
        queryKey: [QUERY_KEYS.POPULAR, confirmedCity?.id, "one"],
        queryFn: async () => {
            try {
                const response = await api.get<{ data: ProductProps[] }>("products/popular", {
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



// export const useFetchGoodsDaysOneProduct = () => {
//   const { confirmedCity } = useCityStore();
//
//   return useQuery({
//     queryKey: [QUERY_KEYS.BANNER_PRODUCT_CUSTOM, confirmedCity?.id],
//     enabled: !!confirmedCity?.id,
//     queryFn: async () => {
//       try {
//         const response = await api.get<{ good : number }>("/products/popular");
//
//         const ids = response.data.good ? [response.data.good] : []
//
//         const productResponse = await api.get<{
//           goods: ProductProps[];
//           total: number;
//           price: number;
//         }>(`/products`, {
//           ids: ids,
//           city_id: confirmedCity?.id,
//         });
//
//         return productResponse.data;
//       } catch (error) {
//         console.error(error);
//         throw error;
//       }
//     },
//   });
// };
