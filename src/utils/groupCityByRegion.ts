import { CityProps } from "@/types/city.types";

export type GroupedCity = {
    regionId: number;
    regionName: string;
    cities: CityProps[];
};

export const FALLBACK_REGION_ID = -1;
export const FALLBACK_REGION_NAME = "Без региона";

export function groupCitiesByRegion(cities: CityProps[]): GroupedCity[] {
    const map = new Map<number, GroupedCity>();

    cities.forEach((city) => {
        const regionId = city.region?.id ?? FALLBACK_REGION_ID;
        const regionName = city.region?.name ?? FALLBACK_REGION_NAME;

        if (!map.has(regionId)) {
            map.set(regionId, {
                regionId,
                regionName,
                cities: [],
            });
        }

        map.get(regionId)!.cities.push(city);
    });

    return Array.from(map.values());
}
