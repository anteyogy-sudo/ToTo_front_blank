import { api } from "@/configs/axios";
import { useUserStore } from "@/stores/useUserStore";
import { QUERY_KEYS } from "@/types/query-keys.enum";
import { useMutation } from "@tanstack/react-query";

export const useUpdateUserFullnameMutation = () => {
  const { setUser, setStatus } = useUserStore();

  return useMutation({
    mutationKey: [QUERY_KEYS.AUTH],
    mutationFn: async ({
      first_name,
      last_name,
      token,
    }: {
      first_name: string;
      last_name: string;
      token: string | null;
    }) => {
      try {
        const response = await api.put(
          "/user",
          { first_name, last_name },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setUser(response.data);
        setStatus("success");
        return response.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  });
};
