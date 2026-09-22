import { api } from "@/configs/axios";
import { CityProps } from "@/types/city.types";
import { QUERY_KEYS } from "@/types/query-keys.enum";
import { useQuery } from "@tanstack/react-query";

export const useFetchCitiesQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.CITIES],
    queryFn: async () => {
      try {
        const response = await api.get<{ data: CityProps[] }>("/cities?per_page=999");
        return response.data;
      } catch (error) {
        console.error("Cities response error: ", error);
        throw error;
      }
    },
      staleTime: 5 * 60 * 1000, // 5 минут
      refetchOnWindowFocus: false, // Отключаем перезапрос при фокусе
  });

};
