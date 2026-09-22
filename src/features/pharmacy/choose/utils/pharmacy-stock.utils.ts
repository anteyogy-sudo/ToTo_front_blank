import { CartProductProps } from "@/types/cart.types";
import { PharmacyStockProps } from "@/types/pharmacy.types";

export function flattenPharmacyGoods(pharmacy: PharmacyStockProps): CartProductProps[] {
    return pharmacy.sets.flatMap((set) => set.goods);
}

/** Сколько позиций из корзины полностью закрыты остатком в аптеке */
export function getPharmacyAvailableCount(pharmacy: PharmacyStockProps): number {
    const outOfStockIds = new Set(pharmacy.outOfStocks.map((item) => item.id));
    return flattenPharmacyGoods(pharmacy).filter((good) => !outOfStockIds.has(good.id)).length;
}

export function isPharmacyFullyInStock(pharmacy: PharmacyStockProps): boolean {
    return pharmacy.outOfStocks.length === 0;
}

export interface PharmacyProductAvailabilityLine {
    id: number;
    name: string;
    isAvailable: boolean;
    selectedQuantity: number;
    availableQuantity: number;
}

export function getPharmacyProductAvailability(
    pharmacy: PharmacyStockProps,
    selectedIds: number[],
    getRequestedAmount: (id: number) => number
): PharmacyProductAvailabilityLine[] {
    const goods = flattenPharmacyGoods(pharmacy);
    const outOfStockIds = new Set(pharmacy.outOfStocks.map((item) => item.id));

    return selectedIds.map((id) => {
        const good = goods.find((g) => g.id === id);
        const outOfStock = pharmacy.outOfStocks.find((o) => o.id === id);
        const requested = getRequestedAmount(id);
        const isAvailable = !outOfStockIds.has(id) && !!good && good.amount >= requested;

        return {
            id,
            name: good?.name ?? outOfStock?.name ?? "—",
            isAvailable,
            selectedQuantity: requested,
            availableQuantity: good?.amount ?? 0,
        };
    });
}
