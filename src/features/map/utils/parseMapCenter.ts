/** Диапазоны для территории РФ (приблизительно) */
const isRussiaLng = (value: number) => value >= 19 && value <= 169;
const isRussiaLat = (value: number) => value >= 41 && value <= 82;

/** Частая ошибка API: широта и долгота перепутаны местами */
const normalizeLngLat = (a: number, b: number): [number, number] => {
    if (isRussiaLng(a) && isRussiaLat(b)) {
        return [a, b];
    }

    if (isRussiaLng(b) && isRussiaLat(a)) {
        return [b, a];
    }

    return [a, b];
};

/** Проверяет и нормализует [долгота, широта] для API Яндекс.Карт */
export const parseMapCenter = (center: [number, number] | null | undefined): [number, number] | null => {
    if (!center) return null;

    const x = Number(center[0]);
    const y = Number(center[1]);

    if (!Number.isFinite(x) || !Number.isFinite(y)) return null;
    if (Math.abs(y) > 90 || Math.abs(x) > 180) return null;

    const [lng, lat] = normalizeLngLat(x, y);

    if (!Number.isFinite(lng) || !Number.isFinite(lat)) return null;

    return [lng, lat];
};
