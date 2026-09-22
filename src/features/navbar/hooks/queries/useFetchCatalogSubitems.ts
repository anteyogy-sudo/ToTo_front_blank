import { api } from "@/configs/axios";
import { CatalogProps } from "@/types/catalog.types";
import { QUERY_KEYS } from "@/types/query-keys.enum";
import { useQuery } from "@tanstack/react-query";

export const useFetchCatalogSubitems = (id: CatalogProps["id"] | null) => {
  return useQuery({
    queryKey: [QUERY_KEYS.CATALOG, id],
    queryFn: async () => {
      try {
        const response = await api.get<{ data: CatalogProps }>(`/catalogs/${id}`);
        return response.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    enabled: !!id,
      staleTime: 2 * 60 * 1000, // 2 минуты
      refetchOnWindowFocus: false,
  });
};
