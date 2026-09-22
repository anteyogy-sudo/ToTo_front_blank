import { api } from "@/configs/axios";
import { QUERY_KEYS } from "@/types/query-keys.enum";
import { useQuery } from "@tanstack/react-query";

interface Props {
  category_id: number;
}

export const useFetchCompositionsQuery = ({ category_id }: Props) => {
  return useQuery({
    queryKey: [QUERY_KEYS.COMPOSITIONS],
    queryFn: async () => {
      try {
        const response = await api.get<{ data: string[] }>("/compositions", { params: { category_id } });
        return response.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
      staleTime: 5 * 60 * 1000, // 5 минут
      refetchOnWindowFocus: false, // Отключаем перезапрос при фокусе
  });
};
