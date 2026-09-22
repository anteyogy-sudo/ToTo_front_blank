import { api } from "@/configs/axios";
import { QUERY_KEYS } from "@/types/query-keys.enum";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useLoginStore } from "../../stores/useLoginStore";

export const useSendPhoneNumberMutation = () => {
  const { setSmsError } = useLoginStore();

  return useMutation({
    mutationKey: [QUERY_KEYS.AUTH],
    mutationFn: async (phone: string) => {
      try {
        const response = await api.post("/user/login", { phone });
        setSmsError(null);
        return response.data;
      } catch (error) {
        console.error(error);
        if (isAxiosError(error) && error.status === 400) {
          setSmsError("Не удалось отправить СМС");
        }
        throw error;
      }
    },
  });
};
