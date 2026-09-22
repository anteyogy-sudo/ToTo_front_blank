import { api } from "@/configs/axios";
import { QUERY_KEYS } from "@/types/query-keys.enum";
import { useQuery } from "@tanstack/react-query";
import { useFavoritesStore } from "../../stores/useFavoritesStore";
import { useCityStore } from "@/features/navbar/stores/useCityStore";
import { ProductProps } from "@/types/product.types";
import { useMemo } from "react";

export const useFetchFavoritesQuery = () => {
  const { confirmedCity } = useCityStore();
  const { favorites } = useFavoritesStore();

  const enabled = useMemo(() => {
    return !!favorites.length && !!confirmedCity?.id;
  }, [favorites, confirmedCity?.id]);

  return useQuery({
    enabled,
    queryKey: [QUERY_KEYS.FAVORITES, confirmedCity?.id],
    queryFn: async () => {
      try {
        const response = await api.post<{
          data: ProductProps[];
        }>(`/products`, {
          goods: favorites,
          city: confirmedCity?.id,
        });
        return response.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  });
};
