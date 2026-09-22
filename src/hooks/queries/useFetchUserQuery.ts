import { api } from "@/configs/axios";
import { QUERY_KEYS } from "@/types/query-keys.enum";
import { UserProps } from "@/types/user.types";
import { getAccessToken } from "@/utils/access-token";
import { useQuery } from "@tanstack/react-query";

export const useFetchUserQuery = () => {
  const token = getAccessToken();

  return useQuery({
    queryKey: [QUERY_KEYS.USER, token],
    queryFn: async () => {
      try {
        if (!token) {
          throw new Error("Token is missing");
        }
        const response = await api.get<UserProps>("/user", {
          headers: { Authorization: `Bearer ${token}` },
        });

        return response.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    enabled: !!token,
  });
};
