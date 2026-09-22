import { api } from "@/configs/axios";
import { CatalogProps } from "@/types/catalog.types";
import { QUERY_KEYS } from "@/types/query-keys.enum";
import { useQuery } from "@tanstack/react-query";

interface Props {
  enabled: boolean;
}

export const useFetchCatalogsQuery = ({ enabled }: Props) => {
  return useQuery({
    queryKey: [QUERY_KEYS.CATALOG],
    queryFn: async () => {
      try {
        const response = await api.get<{ data: CatalogProps[] }>(
          "/catalogs"
        );
        return response.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
      enabled,
      staleTime: 2 * 60 * 1000, // 2 минуты
      refetchOnWindowFocus: false,
  });
};
