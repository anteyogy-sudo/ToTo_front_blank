import { api } from "@/configs/axios";
import { useCityStore } from "@/features/navbar/stores/useCityStore";
import { QUERY_KEYS } from "@/types/query-keys.enum";
import { useQuery } from "@tanstack/react-query";
import { PharmacyProps} from "@/types/pharmacy.types";

export const useFetchPharmacyAddresses = () => {
  const { confirmedCity } = useCityStore();
  return useQuery({
    queryKey: [QUERY_KEYS.STORES, confirmedCity?.id],
    queryFn: async () => {
      try {
        const response = await api.get<{data: PharmacyProps[]}>("/stores", {
          params: {
            city: confirmedCity?.id,
          },
        });
        return response.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    enabled: !!confirmedCity?.id,
  });
};
