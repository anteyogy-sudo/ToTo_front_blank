import { ListItems } from "@/components/ListItems";
import { cn } from "@/lib/utils";
import {Check, Plus, X} from "lucide-react";
import { useMemo } from "react";
import { useSelectedGoodsForStocks } from "../hooks/useSelectedGoodsForStocks";
import {
    getPharmacyProductAvailability,
} from "../utils/pharmacy-stock.utils";
import { PharmacyStockProps } from "@/types/pharmacy.types";

interface Props {
    pharmacy: PharmacyStockProps;
    showDetails?: boolean;
}

export const DisplayProductAvailability = ({
    pharmacy,
    showDetails = true,
}: Props) => {
    const { selectedIds, getRequestedAmount } = useSelectedGoodsForStocks();

    // const selectedCount = selectedIds.length;
    // const availableCount = useMemo(
    //     () => getPharmacyAvailableCount(pharmacy),
    //     [pharmacy]
    // );

    const pharmacyProductsResult = useMemo(() => {
        if (!showDetails) {
            return [];
        }

        return getPharmacyProductAvailability(pharmacy, selectedIds, getRequestedAmount);
    }, [pharmacy, selectedIds, getRequestedAmount, showDetails]);

    return (
        <div className="w-fit flex flex-col gap-3">
            {/*<span*/}
            {/*    className={cn(*/}
            {/*        "font-medium leading-[120%] text-primary-blue",*/}
            {/*        availableCount < selectedCount && "text-primary-yellow",*/}
            {/*        availableCount === 0 && "text-primary-red"*/}
            {/*    )}*/}
            {/*>*/}
            {/*    ({availableCount} из {selectedCount} позиций)*/}
            {/*</span>*/}
            {!!pharmacyProductsResult.length && (
                <div className="w-full flex flex-col gap-2 border-[2px] border-blue-lightGrayBlue rounded-[12px] p-2 max-h-[160px] overflow-y-scroll">
                    <ListItems
                        items={pharmacyProductsResult}
                        render={(item) => (
                            <div
                                key={item.id}
                                className={cn(
                                    "w-full flex items-center gap-2.5 justify-between text-primary-blue",
                                    !item.isAvailable && "text-primary-yellow",
                                    item.availableQuantity === 0 && "text-gray-500"
                                )}
                            >
                                <div className="w-full flex items-center gap-2 justify-between">
                                    {item.isAvailable ? (
                                        <Check size={20} />
                                    ) : item.availableQuantity === 0 ? (
                                        <X size={20} />
                                    ) : (
                                        <Plus size={20} />
                                    )}
                                    <p
                                        className={cn(
                                            "font-medium w-full flex items-center gap-2 leading-[120%]",
                                            item.availableQuantity === 0 && "text-gray-500"
                                        )}
                                    >
                                        {item.name}
                                    </p>
                                </div>
                                <p className={cn(
                                    "whitespace-nowrap text-sm font-medium leading-[120%]",
                                    item.availableQuantity === 0 && "text-destructive text-wrap text-center"
                                )}>
                                    { item.isAvailable ? (
                                        `(${item.selectedQuantity} из ${item.selectedQuantity})`
                                    ) : item.availableQuantity !== 0 ? (
                                        `(${item.availableQuantity} из ${item.selectedQuantity})`
                                    ) : (
                                        'Нет в наличии'
                                    )}
                                </p>
                            </div>
                        )}
                    />
                </div>
            )}
        </div>
    );
};
