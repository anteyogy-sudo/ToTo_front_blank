"use client";

import { DEFAULT_COORDS } from "@/constants/global.constants";
import { PHARMACY_MAP_OVERVIEW_ZOOM } from "@/features/map/constants";
import { YandexMapRoot } from "@/features/map/components/YandexMapRoot";
import { PharmacyMapMarkersLayer } from "@/features/map/components/PharmacyMapMarkersLayer";
import { getPharmacyCoordinates } from "@/features/map/utils/getPharmacyCoordinates";
import { usePharmacyStore } from "@/stores/usePharmacyStore";
import { useCartStore } from "@/stores/useCartStore";
import { PharmacyStockProps } from "@/types/pharmacy.types";

interface Props {
    pharmacies: PharmacyStockProps[];
    onSelectPharmacy: (pharmacy: PharmacyStockProps) => void;
}

export const PharmaciesMap = ({ pharmacies, onSelectPharmacy }: Props) => {
    const { selectedCartCount } = useCartStore();
    const { selectedPharmacy } = usePharmacyStore();
    const cartTotalAmount = selectedCartCount ?? 0;

    const initialCenter =
        getPharmacyCoordinates(pharmacies[0]) ??
        getPharmacyCoordinates(selectedPharmacy) ??
        DEFAULT_COORDS;

    return (
        <YandexMapRoot initialCenter={initialCenter} initialZoom={PHARMACY_MAP_OVERVIEW_ZOOM} className="w-full h-full">
            <PharmacyMapMarkersLayer
                items={pharmacies}
                getItemId={(pharmacy) => pharmacy.id}
                selectedId={selectedPharmacy?.id ?? 0}
                onSelect={() => undefined}
                variant="cart"
                cartProps={{
                    pharmacies,
                    cartTotalAmount,
                    bestPricePharmacyId: pharmacies[0]?.id,
                    onSelectPharmacy,
                }}
            />
        </YandexMapRoot>
    );
};
