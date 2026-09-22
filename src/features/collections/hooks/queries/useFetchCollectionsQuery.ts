import { api } from "@/configs/axios";
import { CollectionsProps } from "@/types/collections.types";
import { QUERY_KEYS } from "@/types/query-keys.enum";
import { useQuery } from "@tanstack/react-query";

export const useFetchCollectionsQuery = () => {

    return useQuery({
        queryKey: [QUERY_KEYS.COLLECTIONS],
        queryFn: async () => {
            try {
                const response = await api.get<{ data: CollectionsProps[] }>("/collections");
                return response.data.data;
            } catch (error) {
                console.error(error);
                throw error;
            }
        },
        staleTime: 2 * 60 * 1000, // 2 минуты
        refetchOnWindowFocus: false,
    });
};
