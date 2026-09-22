import { api } from "@/configs/axios";
import { QUERY_KEYS } from "@/types/query-keys.enum";
import { useQuery } from "@tanstack/react-query";

interface Props {
  category_id: number;
}

export const useFetchProducersQuery = ({ category_id }: Props) => {
  return useQuery({
    queryKey: [QUERY_KEYS.PRODUCERS, category_id],
    queryFn: async () => {
      try {
        const response = await api.get<{ data: string[] }>("/producers", { params: { category_id  } });
        return response.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
      staleTime: 2 * 60 * 1000, // 2 минуты
      refetchOnWindowFocus: false,
  });
};
