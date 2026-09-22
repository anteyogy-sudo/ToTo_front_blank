import { api } from "@/configs/axios";
import { QUERY_KEYS } from "@/types/query-keys.enum";
import { useQuery } from "@tanstack/react-query";

export const useFetchProductDescriptionQuery = (id : string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.PRODUCT_DESCRIPTION],
        queryFn: async () => {
            try {
                const response = await api.get<any>(`/products/${id}/description`);
                return response.data;
            } catch (error) {
                console.error(error);
                throw error;
            }
        },
        enabled: !!id ,

    });
};
