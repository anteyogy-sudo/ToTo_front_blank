import { api } from "@/configs/axios";
import { QUERY_KEYS } from "@/types/query-keys.enum";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useLoginStore } from "../../stores/useLoginStore";

export const useConfirmCodeMutation = () => {
  const { setConfirmCodeError } = useLoginStore();

  return useMutation({
    mutationKey: [QUERY_KEYS.AUTH],
    mutationFn: async ({ phone, code }: { phone: string; code: string }) => {
      try {
        const response = await api.post<{ token: string }>(
          "/user/verify",
          { phone, code }
        );
        setConfirmCodeError(null);
        return response.data;
      } catch (error) {
        console.error(error);
        if (isAxiosError(error) && error.status === 403) {
          setConfirmCodeError("Неверный код");
        }
        throw error;
      }
    },
  });
};
