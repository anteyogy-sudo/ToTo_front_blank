import { create } from "zustand";
import {persist} from "zustand/middleware";
import {useUserStore} from "@/stores/useUserStore";
import {api} from "@/configs/axios";

interface Props {
  favorites: number[];
  onToggleFavorite: (id: number) => Promise<void>;
  mergeFavorites: () => void;
  setFavorites: (favorites: number[]) => void;
  fetchFavorites: () => void;
  isLoading: boolean;
}

export const useFavoritesStore = create<Props>()(
    persist(
        (set, get) => ({
            favorites: [],
            isLoading: true,
            setFavorites: (favorites) => set({ favorites }),

            onToggleFavorite: async (id) => {
                const favorites = get().favorites;
                const isFavorite = favorites.includes(id);
                const { token } = useUserStore.getState();

                const updated = isFavorite
                    ? favorites.filter((favId) => favId !== id)
                    : [...favorites, id];

                set({ favorites: updated });
                console.log("FAVORITE UPDATED: ",updated);

                if (token) {
                    try {
                        if (isFavorite) {
                            await api.delete("/favorites/"+id, {
                                headers: { Authorization: `Bearer ${token}` }
                            });
                        } else {
                            await api.put("/favorites", { goods: updated }, {
                                headers: { Authorization: `Bearer ${token}` }
                            });
                        }
                    } catch (error) {
                        console.error("Ошибка синхронизации favorites: ", error);
                    }
                }
            },

            fetchFavorites: async () => {
                const { token } = useUserStore.getState();
                if (!token) {
                    set({ isLoading: false });
                    return;
                }
                try {
                    set({ isLoading: true });
                    const { data } = await api.get(`/favorites`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });

                    const fetched: number[] = data?.data ?? [];

                    set({ favorites: fetched });
                } catch (err) {
                    console.error("Ошибка синхронизации Favorites:", err);
                } finally {
                    set({ isLoading: false });
                }
            },

            mergeFavorites: async () => {
                const { token } = useUserStore.getState();
                if (!token) {
                    set({ isLoading: false });
                    return;
                }

                try {
                    const { data } = await api.get(`/favorites`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });

                    const serverFavorites: number[] = data?.data ?? [];

                    const merged = Array.from(
                        new Set([...get().favorites, ...serverFavorites])
                    );
                    console.log("FAVORITES: merged = ", merged);

                    set({ favorites: merged });

                    await api.put("/favorites", { goods: merged }, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                } catch (err) {
                    console.error("Ошибка при совмещении Favorites:", err);
                } finally {
                    set({ isLoading: false });
                }
            },
        }),
        {
            name: "favorites-storage",
            partialize: (state) => ({
                favorites: state.favorites,
            }),
        }
    )
);
