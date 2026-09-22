import { api } from "@/configs/axios";
import { useUserStore } from "@/stores/useUserStore";
import { QUERY_KEYS } from "@/types/query-keys.enum";
import { UserProps } from "@/types/user.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProfileSchema } from "../../schemas/profile.schema";

export const useUpdateProfileMutation = () => {
  const { token } = useUserStore();
  const qc = useQueryClient();

  return useMutation({
    mutationKey: [QUERY_KEYS.USER, token],
    mutationFn: async (values: ProfileSchema) => {
      try {
        if (!token) {
          throw new Error("Token is missing");
        }
        const response = await api.put<UserProps>("/user", values, {
          headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [QUERY_KEYS.USER, token] });
    },
  });
};
