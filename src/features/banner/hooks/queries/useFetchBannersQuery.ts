import { api } from "@/configs/axios";
import { BannerProps } from "@/types/banner.types";
import { QUERY_KEYS } from "@/types/query-keys.enum";
import { useQuery } from "@tanstack/react-query";

export const useFetchBannersQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.BANNERS],
    queryFn: async () => {
      try {
        const response = await api.get<{ data: BannerProps[] }>("/banners");
        return response.data.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  });
};
