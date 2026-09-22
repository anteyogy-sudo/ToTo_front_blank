import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { OrderProps, OrdersQueryProps } from "@/types/order.types";
import {api} from "@/configs/axios";
import {useUserStore} from "@/stores/useUserStore";

interface OrdersState {
    orders: OrderProps[];
    isLoading: boolean;
    error: string | null;
    currentPage: number;
    lastPage: number | null;
    fetchOrders: (page?: number, perPage?: number) => Promise<void>;
    clearOrders: () => void;
}

export const useOrdersStore = create<OrdersState>()(
    devtools((set) => ({
        orders: [],
        isLoading: false,
        error: null,
        currentPage: 1,
        lastPage: null,

        fetchOrders: async (page = 1, perPage = 10) => {
            const { token } = useUserStore.getState();
            if (!token) {
                set({ error: "Пользователь не авторизован" });
                return;
            }

            set({ isLoading: true, error: null });

            try {
                const res = await api.get<OrdersQueryProps>(
                    `/orders?page=${page}&per_page=${perPage}`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );

                const { data, meta } = res.data;

                set({
                    orders: data,
                    currentPage: meta.current_page,
                    lastPage: meta.last_page,
                    isLoading: false,
                });
            } catch (e: any) {
                set({
                    isLoading: false,
                    error: e?.response?.data?.message || "Ошибка загрузки заказов",
                });
            }
        },

        clearOrders: () => set({ orders: [], currentPage: 1, lastPage: null }),
    }))
);
