import { api } from "@/configs/axios";
import { useUserStore } from "@/stores/useUserStore";
import { QUERY_KEYS } from "@/types/query-keys.enum";
import { bearerToken } from "@/utils/bearer-token";
import { useQuery } from "@tanstack/react-query";
import {BonusesProps} from "@/types/bonuses.types";

export const useFetchBonusesQuery = () => {
  const { token } = useUserStore();

  return useQuery<BonusesProps>({
    queryKey: [QUERY_KEYS.BONUSES],
    queryFn: async () => {
      try {
        if (!token) {
          throw new Error("Token is missing");
        }
        const response = await api.get("/user/bonus", { headers: { Authorization: bearerToken(token) } });
        return response.data.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    enabled: !!token,
  });
};
