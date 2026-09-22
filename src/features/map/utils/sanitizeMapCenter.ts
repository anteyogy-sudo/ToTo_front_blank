import { DEFAULT_COORDS } from "@/constants/global.constants";
import { parseMapCenter } from "@/features/map/utils/parseMapCenter";

/** Только для начальной позиции карты (с fallback на Москву) */
export const sanitizeMapCenter = (center: [number, number] | undefined | null): [number, number] => {
    return parseMapCenter(center) ?? DEFAULT_COORDS;
};
