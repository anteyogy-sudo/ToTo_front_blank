import { api } from "@/configs/axios";
import { QUERY_KEYS } from "@/types/query-keys.enum";
import { useQuery } from "@tanstack/react-query";

export type FilterPrice = {
    id: "price";
    label: string;
    type: "range";
    data: {
        min: number;
        max: number;
    };
};

export type FilterList = {
    id: "producers" | "compositions";
    label: string;
    type: "list";
    data: Array<{
        id: number;
        label: string;
    }>;
};

export type Filter = FilterPrice | FilterList;

interface UseProductFiltersProps {
    cityId: number;
    categoryId: number;
    groupId?: number | null;
    query?: string | null;
}

export const useProductFiltersQuery = ({ cityId, categoryId, groupId, query }: UseProductFiltersProps) => {
    return useQuery({
        queryKey: [QUERY_KEYS.FILTERS, cityId, categoryId, groupId, query],
        queryFn: async () => {
            const params: Record<string, any> = {
                city: cityId,
            };

            if (categoryId && categoryId !== 0) {
                params.category_id = categoryId;
            }
            if (groupId && groupId !== 0) {
                params.group_id = groupId;
            }
            if (query) {
                params.query = query;
            }
            const response = await api.get<Filter[]>('/products/filters', { params });
            return response.data;
        },
        // Разрешаем запрос при categoryId = 0 (страница поиска)
        enabled: !!cityId && (!!categoryId || categoryId === 0),
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
    });
};