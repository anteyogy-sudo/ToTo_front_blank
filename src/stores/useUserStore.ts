import { UserProps } from "@/types/user.types";
import { removeAccessToken } from "@/utils/access-token";
import { create } from "zustand";
import {useFavoritesStore} from "@/features/favorites/stores/useFavoritesStore";
import {useCartStore} from "@/stores/useCartStore";
import {persist} from "zustand/middleware";

type Status = "success" | "pending" | "error";

interface Props {
  hydrated: boolean;
  setHydrated: (value: boolean) => void;
  token: string | null;
  user: UserProps | null;
  status: Status;
  setStatus: (status: Status) => void;
  setToken: (token: string | null) => void;
  setUser: (user: UserProps | null) => void;
  logoutFn: () => void;
}

export const useUserStore = create<Props>()(
    persist(
        (set) => ({
            hydrated: false,
            user: null,
            token: null,
            status: "pending",

            setHydrated: (value) =>
                set(() => ({
                    hydrated: value,
                })),

            setStatus: (status) =>
                set(() => ({
                    status
                })),

            setToken: (token) => {
                set(() => ({
                    token
                }));
            },

            setUser: (user) => {
                set(() => ({
                    user: user,
                    status: "success"
                }))
            },

            logoutFn: () => {
                removeAccessToken();
                useFavoritesStore.getState().setFavorites([]);
                localStorage.removeItem("favourites-storage");
                useCartStore.setState({ cart: null, items: [] });
                localStorage.removeItem("cart");
                return set(() => ({
                    user: null,
                    token: null,
                    status: "success"
                }));
            },
        }),
        {
            name: "user-storage",
            onRehydrateStorage: () => (state) => {
                if (state) {
                    state?.setHydrated(true);
                    state.setStatus("success");
                }
            },
            partialize: (state) => ({
                token: state.token,
                user: state.user,
            }),
        }
    )
);
