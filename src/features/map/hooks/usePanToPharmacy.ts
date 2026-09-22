"use client";

import { useCallback } from "react";
import { useYandexMapOptional } from "@/features/map/context/YandexMapContext";
import { getPharmacyCoordinates } from "@/features/map/utils/getPharmacyCoordinates";
import { PHARMACY_MAP_SELECT_ZOOM } from "@/features/map/constants";

export const usePanToPharmacy = () => {
    const map = useYandexMapOptional();

    return useCallback(
        (item: Parameters<typeof getPharmacyCoordinates>[0], zoom = PHARMACY_MAP_SELECT_ZOOM) => {
            const coords = getPharmacyCoordinates(item);
            if (!coords) return;
            map?.panTo(coords, zoom);
        },
        [map]
    );
};
