import { api } from "@/configs/axios";
import { QUERY_KEYS } from "@/types/query-keys.enum";
import { useQuery } from "@tanstack/react-query";


export const useFetchPharmacyById = (id? : number) => {

  return useQuery({
    queryKey: [QUERY_KEYS.PHARMACYBYID],
    enabled: !!id,
    queryFn: async () => {
      try {
        const response = await api.get<any>(
          `/stores/${id}`
        );
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
