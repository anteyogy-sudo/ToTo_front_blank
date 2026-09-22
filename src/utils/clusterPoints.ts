type Cluster<T> = {
    latitude: number;
    longitude: number;
    items: T[];
};

function getPointCoordinates(point: unknown): { lat: number; lng: number } | null {
    const p = point as Record<string, unknown>;

    if (p.location && typeof p.location === "object") {
        const loc = p.location as { latitude?: number; longitude?: number };
        if (Number.isFinite(loc.latitude) && Number.isFinite(loc.longitude)) {
            return { lat: loc.latitude as number, lng: loc.longitude as number };
        }
    }

    if (p.pharmacy && typeof p.pharmacy === "object") {
        const pharmacy = p.pharmacy as Record<string, unknown>;
        if (pharmacy.location && typeof pharmacy.location === "object") {
            const loc = pharmacy.location as { latitude?: number; longitude?: number };
            if (Number.isFinite(loc.latitude) && Number.isFinite(loc.longitude)) {
                return { lat: loc.latitude as number, lng: loc.longitude as number };
            }
        }
        if (Number.isFinite(pharmacy.latitude) && Number.isFinite(pharmacy.longitude)) {
            return { lat: pharmacy.latitude as number, lng: pharmacy.longitude as number };
        }
    }

    if (Number.isFinite(p.latitude) && Number.isFinite(p.longitude)) {
        return { lat: p.latitude as number, lng: p.longitude as number };
    }

    return null;
}

export function clusterPoints<T>(points: T[], threshold: number): Cluster<T>[] {
    const clusters: Cluster<T>[] = [];

    for (const point of points) {
        const coords = getPointCoordinates(point);
        if (!coords) continue;

        const { lat, lng } = coords;
        let added = false;

        for (const cluster of clusters) {
            const distance = Math.sqrt(
                Math.pow(lat - cluster.latitude, 2) + Math.pow(lng - cluster.longitude, 2)
            );

            if (distance < threshold) {
                cluster.items.push(point);
                cluster.latitude =
                    (cluster.latitude * (cluster.items.length - 1) + lat) / cluster.items.length;
                cluster.longitude =
                    (cluster.longitude * (cluster.items.length - 1) + lng) / cluster.items.length;
                added = true;
                break;
            }
        }

        if (!added) {
            clusters.push({ latitude: lat, longitude: lng, items: [point] });
        }
    }

    return clusters;
}

export function clusterPointsPharmacyAddresses<T extends { location?: { latitude?: number; longitude?: number } }>(
    points: T[],
    threshold: number
): Cluster<T>[] {
    return clusterPoints(points, threshold);
}
