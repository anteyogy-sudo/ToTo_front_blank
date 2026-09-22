import { api } from "@/configs/axios";
import { useMutation } from "@tanstack/react-query";

export interface SendFeedbackData {
    first_name: string;
    last_name: string;
    email?: string | null;
    phone: string;
    subject: string;
    message: string;
}

export const useSendFeedbackMutation = () => {
    return useMutation({
        mutationFn: async (data: SendFeedbackData) => {
            try {
                const response = await api.post('/send', data);
                return response.data;
            } catch (error: any) {
                console.error('Error message:', error.message);
                throw error;
            }
        },
    });
};