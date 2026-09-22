"use client";

import { ReactNode } from "react"
import { YandexMapProvider } from "@/features/map/components/YandexMapProvider";
import { YandexMapCanvas } from "@/features/map/components/YandexMapCanvas";
import { MapLocation } from "@/lib/ymaps";

interface Props {
    initialCenter: [number, number];
    initialZoom?: number;
    className?: string;
    children?: ReactNode;
    onLocationChange?: (location: MapLocation) => void;
}

/** Map provider + canvas with marker layers as children of YMap */
export const YandexMapRoot = ({
    initialCenter,
    initialZoom = 17,
    className,
    children,
    onLocationChange,
}: Props) => {
    return (
        <YandexMapProvider
            initialCenter={initialCenter}
            initialZoom={initialZoom}
            onLocationChange={onLocationChange}
        >
            <YandexMapCanvas className={className}>{children}</YandexMapCanvas>
        </YandexMapProvider>
    );
};

/** Provider only — use when map canvas and list share one controller */
export { YandexMapProvider } from "@/features/map/components/YandexMapProvider";
