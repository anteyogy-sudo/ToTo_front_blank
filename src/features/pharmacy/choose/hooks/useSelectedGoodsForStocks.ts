import { useMemo } from "react";
import { useCartStore } from "@/stores/useCartStore";

export function useSelectedGoodsForStocks() {
    const selectedIds = useCartStore(state => state.selectedIds);
    const items = useCartStore(state => state.items);


    const goods = useMemo(
        () =>
            selectedIds.map((id) => ({
                id,
                amount: items.find((item) => item.id === id)?.amount ?? 1,
            })),
        [selectedIds, items]
    );

    const getRequestedAmount = (id: number) =>
        items.find((item) => item.id === id)?.amount ?? 1;

    return { selectedIds, goods, getRequestedAmount };
}
