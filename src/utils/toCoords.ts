export const toCoords = (lng: unknown, lat: unknown): [number, number] | null => {
    const x = Number(lng);
    const y = Number(lat);

    if (!Number.isFinite(x) || !Number.isFinite(y)) return null;

    return [x, y];
};