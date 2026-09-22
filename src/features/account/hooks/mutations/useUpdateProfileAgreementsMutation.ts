import { api } from "@/configs/axios";
import { useUserStore } from "@/stores/useUserStore";
import { QUERY_KEYS } from "@/types/query-keys.enum";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProfileSchema } from "../../schemas/profile.schema";
import { UserProps } from "@/types/user.types";
import { bearerToken } from "@/utils/bearer-token";

export const useUpdateProfileAgreementsMutation = () => {
  const { token } = useUserStore();
  const qc = useQueryClient();

  return useMutation({
    mutationKey: [QUERY_KEYS.USER, token],
    mutationFn: async (agreements: {
      email_agreement: ProfileSchema["email_agreement"];
      sms_agreement: ProfileSchema["sms_agreement"];
      push_agreement: ProfileSchema["push_agreement"];
    }) => {
      try {
        if (!token) throw new Error("Token is missing");

        const response = await api.patch<UserProps>("/user/agreements", agreements, {
          headers: { Authorization: bearerToken(token) },
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
