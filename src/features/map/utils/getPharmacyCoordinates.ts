import { toCoords } from "@/utils/toCoords";
import { parseMapCenter } from "@/features/map/utils/parseMapCenter";

type LocationLike = {
    longitude?: unknown;
    latitude?: unknown;
    lng?: unknown;
    lat?: unknown;
};

type PharmacyLike = {
    location?: LocationLike;
    longitude?: unknown;
    latitude?: unknown;
    pharmacy?: {
        location?: LocationLike;
        longitude?: unknown;
        latitude?: unknown;
    };
};

export const getPharmacyCoordinates = (item: PharmacyLike | null | undefined): [number, number] | null => {
    if (!item) return null;

    if (item.pharmacy) {
        const nested = getPharmacyCoordinates(item.pharmacy);
        if (nested) return nested;
    }

    if (item.location) {
        return parseMapCenter(
            toCoords(
                item.location.longitude ?? item.location.lng,
                item.location.latitude ?? item.location.lat
            )
        );
    }

    return parseMapCenter(toCoords(item.longitude, item.latitude));
};
