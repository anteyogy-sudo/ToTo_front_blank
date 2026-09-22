import { api } from "@/configs/axios";
import { BrandProps } from "@/types/brands.types";
import { QUERY_KEYS } from "@/types/query-keys.enum";
import { useQuery } from "@tanstack/react-query";

export const useFetchBrandsQuery = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.BRANDS],
        queryFn: async () => {
            try {
                const response = await api.get<{ data: BrandProps[] }>("/brands");
                return response.data.data;
            } catch (error) {
                console.error(error);
                throw error;
            }
        },
    });
};