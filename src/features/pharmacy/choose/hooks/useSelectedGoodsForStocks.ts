import { useMemo } from "react";
import { getCartSelectionKey, useCartStore } from "@/stores/useCartStore";

export function useSelectedGoodsForStocks() {
    const cart = useCartStore((state) => state.cart);
    const selectedItems = useCartStore((state) => state.selectedItems);
    const items = useCartStore((state) => state.items);

    // Восстанавливает прежний плоский selectedIds (уникальные id) из новой
    // модели выбора cart.sets[].goods[] + selectedItems[key]
    const selectedIds = useMemo(() => {
        if (!cart) return [];

        const ids: number[] = [];
        const seen = new Set<number>();

        cart.sets.forEach((cartSet) => {
            cartSet.goods.forEach((product, productIndex) => {
                if (!selectedItems[getCartSelectionKey(cartSet.id, productIndex)]) return;
                if (seen.has(product.id)) return;
                seen.add(product.id);
                ids.push(product.id);
            });
        });

        return ids;
    }, [cart, selectedItems]);

    // amount берётся из items (запрошенное пользователем количество), как раньше
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
