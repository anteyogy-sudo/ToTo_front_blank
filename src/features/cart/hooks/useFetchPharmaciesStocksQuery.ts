import { api } from "@/configs/axios";
import { QUERY_KEYS } from "@/types/query-keys.enum";
import { useQuery } from "@tanstack/react-query";
import { useCityStore } from "@/features/navbar/stores/useCityStore";
import { PharmacyStockProps, PharmacyStocksResponse } from "@/types/pharmacy.types";
import { useMemo } from "react";
import { useSelectedGoodsForStocks } from "../../pharmacy/choose/hooks/useSelectedGoodsForStocks";

export const useFetchPharmaciesStocksQuery = () => {
    const { goods } = useSelectedGoodsForStocks();
    const { confirmedCity } = useCityStore();

    const enabled = useMemo(
        () => !!goods.length && !!confirmedCity?.id,
        [goods.length, confirmedCity?.id]
    );

    return useQuery({
        enabled,
        queryKey: [QUERY_KEYS.STOCKS, goods, confirmedCity?.id],
        queryFn: async () => {
            const response = await api.post<PharmacyStocksResponse>("/cart/stocks", {
                goods,
                city: confirmedCity?.id,
            });
            return response.data.data;
        },
    });
};

export type { PharmacyStockProps };
