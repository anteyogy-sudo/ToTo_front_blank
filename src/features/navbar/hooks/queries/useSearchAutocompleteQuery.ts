import { api } from "@/configs/axios";
import { useQuery } from "@tanstack/react-query";
import { useCityStore } from "@/features/navbar/stores/useCityStore";

interface SearchDiscount {
    id: number;
    amount: number;
    isRelative: boolean;
    fullPrice: number;
    isBonus?: boolean;
}

interface SearchSuggestion {
    id: number;
    name: string;
    price: number;
    image?: string;
    available_at: number;
    discount?: SearchDiscount;
    isRecipe?: boolean;
    bonus?: number;
}

interface SearchAutocompleteResponse {
    products: SearchSuggestion[];
    suggestions: string[];
}

interface SearchProduct {
    id: number;
    name: string;
    images: string[];
    meta: {
        country: string;
        producer: string;
    };
    isRecipe: boolean;
    availableAt: number;
    price: number;
    discount?: SearchDiscount;
    bonus?: number;
}

interface SearchResponse {
    data: {
        products: SearchProduct[];
        suggestions: string[];
        labels: string[];
        correction: string | null;
    };
}

export const useSearchAutocompleteQuery = (query: string, enabled: boolean) => {
    const { confirmedCity } = useCityStore();

    return useQuery({
        queryKey: ["search-autocomplete", query, confirmedCity?.id],
        queryFn: async ({ signal }): Promise<SearchAutocompleteResponse> => {
            if (!query.trim() || !confirmedCity?.id) {
                return { products: [], suggestions: [] };
            }

            try {
                const response = await api.get<SearchResponse>("/search", {
                    params: {
                        query: query.trim(),
                        city: confirmedCity.id,
                    },
                    signal, // Передаем signal для отмены запроса
                });

                const searchData = response.data.data;

                const products = (searchData.products || []).map(product => {
                    // Получаем цену в product.price
                    const price = product.price || 0;

                    // Получаем URL изображения
                    const image = product.images?.[0];

                    // Получаем availability
                    const available_at = product.availableAt || 0;

                    return {
                        id: product.id,
                        name: product.name,
                        price,
                        image,
                        available_at,
                        discount: product.discount,
                        isRecipe: product.isRecipe,
                        bonus: product.bonus,
                    };
                });

                return {
                    products: products,
                    suggestions: searchData.suggestions || [],
                };
            } catch (error: any) {
                // Игнорируем ошибки отмены запроса
                if (error.name === "CanceledError" || error.name === "AbortError") {
                    return { products: [], suggestions: [] };
                }

                return { products: [], suggestions: [] };
            }
        },
        enabled: enabled && query.trim().length > 0 && !!confirmedCity?.id,
        staleTime: 1000 * 60 * 5,
        retry: 1,
        gcTime: 0, // Убираем кэширование для поисковых запросов
    });
};