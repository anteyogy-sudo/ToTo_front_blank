import { api } from "@/configs/axios";

export interface FaqItem {
    id: number;
    title: string;
    content: string;
}

export interface FaqResponse {
    data: FaqItem[];
}

export const fetchFaq = async (): Promise<FaqItem[]> => {
    try {
        const response = await api.get<FaqResponse>('/faq');
        return response.data.data;
    } catch (error) {
        console.error('Ошибка при загрузке FAQ:', error);
        return [];
    }
};