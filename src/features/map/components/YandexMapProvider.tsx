"use client";

import { ReactNode, useCallback, useMemo, useRef, useState } from "react";
import { MapEventUpdateHandler } from "@yandex/ymaps3-types";
import { MapLocation, YMapInstance } from "@/lib/ymaps";
import { YandexMapProvider as MapContextProvider } from "@/features/map/context/YandexMapContext";
import { sanitizeMapCenter } from "@/features/map/utils/sanitizeMapCenter";
import { parseMapCenter } from "@/features/map/utils/parseMapCenter";

interface Props {
    initialCenter: [number, number];
    initialZoom?: number;
    children: ReactNode;
    onLocationChange?: (location: MapLocation) => void;
}

type PendingPan = { center: [number, number]; zoom: number };

export const YandexMapProvider = ({
    initialCenter,
    initialZoom = 17,
    children,
    onLocationChange,
}: Props) => {
    const mapInstanceRef = useRef<YMapInstance | null>(null);
    const pendingPanRef = useRef<PendingPan | null>(null);
    const [zoom, setZoom] = useState(initialZoom);

    /** Начальная позиция — только для первого mount YMap (через useDefault) */
    const [initialMapLocation] = useState<MapLocation>(() => ({
        center: sanitizeMapCenter(initialCenter),
        zoom: initialZoom,
    }));

    const applyPan = useCallback(
        (center: [number, number], zoomLevel: number) => {
            const lng = Number(center[0]);
            const lat = Number(center[1]);

            if (!Number.isFinite(lng) || !Number.isFinite(lat) || !Number.isFinite(zoomLevel)) {
                return;
            }

            mapInstanceRef.current?.update({
                location: {
                    center: [lng, lat],
                    zoom: zoomLevel,
                    duration: 500,
                },
            });

            setZoom(zoomLevel);
            onLocationChange?.({ center: [lng, lat], zoom: zoomLevel });
        },
        [onLocationChange]
    );

    const flushPendingPan = useCallback(() => {
        if (!pendingPanRef.current || !mapInstanceRef.current) return;

        const { center, zoom: zoomLevel } = pendingPanRef.current;
        pendingPanRef.current = null;
        applyPan(center, zoomLevel);
    }, [applyPan]);

    const registerMapInstance = useCallback(
        (instance: unknown) => {
            if (!instance) return;

            const next = instance as YMapInstance;
            if (mapInstanceRef.current === next) return;

            mapInstanceRef.current = next;
            flushPendingPan();
        },
        [flushPendingPan]
    );

    const handleMapUpdate = useCallback<MapEventUpdateHandler>((event) => {
        if (!event.location) return;

        const newZoom = event.location.zoom;
        if (!Number.isFinite(newZoom)) return;

        setZoom((prev) => (Math.abs(prev - newZoom) > 0.001 ? newZoom : prev));
    }, []);

    const panTo = useCallback(
        (center: [number, number], zoomLevel = 17) => {
            const parsed = parseMapCenter(center);
            if (!parsed || !Number.isFinite(zoomLevel)) return;

            pendingPanRef.current = { center: parsed, zoom: zoomLevel };

            if (mapInstanceRef.current) {
                pendingPanRef.current = null;
                applyPan(parsed, zoomLevel);
            }
        },
        [applyPan]
    );

    const contextValue = useMemo(
        () => ({
            initialMapLocation,
            zoom,
            panTo,
            registerMapInstance,
            handleMapUpdate,
        }),
        [initialMapLocation, zoom, panTo, registerMapInstance, handleMapUpdate]
    );

    return <MapContextProvider value={contextValue}>{children}</MapContextProvider>;
};
