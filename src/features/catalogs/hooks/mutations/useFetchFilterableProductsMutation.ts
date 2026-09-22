import { api } from "@/configs/axios";
import { useCityStore } from "@/features/navbar/stores/useCityStore";
import { ProductProps } from "@/types/product.types";
import { QUERY_KEYS } from "@/types/query-keys.enum";
import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

type ProductsResponse = {
    data: ProductProps[];
    meta: {
        total: number;
        last_page: number;
        current_page: number;
        per_page: number;
    };
};

export const useFetchFilterableProductsMutation = (category_id: number) => {
    // Получаем параметры из URL
    const searchParams = useSearchParams();
    const { confirmedCity } = useCityStore();

    // Запрашиваем данные
    const paramsString = searchParams.toString();

    // Возвращаем мутацию для поиска товаров
    return useMutation({
        // Ключ для кэширования запроса
        mutationKey: [QUERY_KEYS.PRODUCTS, paramsString, confirmedCity?.id],

        mutationFn: async (): Promise<ProductsResponse> => {
            // Проверяем выбран ли город
            if (!confirmedCity?.id) {
                console.warn("Город не выбран");
                return {
                    data: [],
                    meta: { total: 0, last_page: 0, current_page: 1, per_page: 12 },
                };
            }

            // Объект для хранения параметров запроса
            const currentParams = new URLSearchParams(searchParams.toString());
            const params = new URLSearchParams();

            // Город обязателен
            params.set("city", String(confirmedCity.id));

            // Для получения фильтров в поиске
            const query = currentParams.get("query");
            if (query) {
                params.set("query", query);
            }

            // Каталог обязателен
            if (category_id && Number(category_id) !== 0) {
                params.set("category_id", String(category_id));
            }

            // Группа обязательна, если не равна 0
            const groupId = currentParams.get("group_id");
            if (groupId && groupId !== "0") {
                params.set("group_id", String(Number(groupId)));
            }

            // Пагинация
            const page = currentParams.get("page") ?? "1";
            params.set("page", String(Number(page) || 1));

            const perPage = currentParams.get("per_page");
            if (perPage) {
                params.set("per_page", String(Number(perPage)));
            }

            // Сортировка
            const sort = currentParams.get("sort");
            if (sort) {
                switch (sort) {
                    case "by_ascending_price":
                        params.set("order_by", "price");
                        params.set("order_direction", "asc");
                        break;
                    case "by_descending_price":
                        params.set("order_by", "price");
                        params.set("order_direction", "desc");
                        break;
                    case "az":
                        params.set("order_by", "name");
                        params.set("order_direction", "asc");
                        break;
                    case "za":
                        params.set("order_by", "name");
                        params.set("order_direction", "desc");
                        break;
                    case "popular":
                        params.set("order_by", "popularity");
                        params.set("order_direction", "desc");
                        break;
                }
            }

            // Новые фильтры
            // list filterId[] = selectedOptionId (список)
            // bool filterId = true/false (для фильтров где нужно да/нет)
                // range filterId_min/filterId_max (цена)
            currentParams.forEach((value, key) => {
                // Эти параметры из URL
                if (key === "query") return;
                if (key === "group_id") return;
                if (key === "category_id") return;
                if (key === "page") return;
                if (key === "per_page") return;
                if (key === "sort") return;
                if (key === "city") return;

                params.append(key, value);
            });

            try {
                // Отправляем запрос с собранными параметрами
                const response = await api.get<ProductsResponse>("/products", {
                    params,
                });

                // Возвращаем данные ответа
                return response.data;
            } catch {
                return {
                    data: [],
                    meta: {
                        total: 0,
                        last_page: 0,
                        current_page: 1,
                        per_page: 12,
                    },
                };
            }
        },
    });
};