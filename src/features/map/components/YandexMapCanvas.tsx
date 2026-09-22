"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { MapLocation, YmapsApi } from "@/lib/ymaps";
import { MapEventUpdateHandler } from "@yandex/ymaps3-types";
import { useConnectYmaps } from "@/features/map/hooks/useConnectYmaps";
import { useYandexMap } from "@/features/map/context/YandexMapContext";

interface Props {
    className?: string;
    children?: ReactNode;
}

interface LoadedProps {
    className?: string;
    children?: ReactNode;
    reactifiedApi: YmapsApi;
    initialMapLocation: MapLocation;
    registerMapInstance: (instance: unknown) => void;
    handleMapUpdate: MapEventUpdateHandler;
}

const YandexMapCanvasView = ({
    className,
    children,
    reactifiedApi,
    initialMapLocation,
    registerMapInstance,
    handleMapUpdate,
}: LoadedProps) => {
    const { YMap, YMapDefaultFeaturesLayer, YMapDefaultSchemeLayer, YMapListener, useDefault } =
        reactifiedApi;

    const location = useDefault(initialMapLocation);

    return (
        <YMap
            ref={instance => {
                registerMapInstance(instance);
            }}
            location={location}
            mode="vector"
            distribution={false}
            className={cn("w-full h-full", className)}
        >
            <YMapListener onUpdate={handleMapUpdate} />
            <YMapDefaultSchemeLayer />
            <YMapDefaultFeaturesLayer />
            {children}
        </YMap>
    );
};

export const YandexMapCanvas = ({ className, children }: Props) => {
    const { reactifiedApi } = useConnectYmaps();
    const { initialMapLocation, registerMapInstance, handleMapUpdate } = useYandexMap();

    if (!reactifiedApi) {
        return <div className={cn("w-full h-full bg-loading-skeleton animate-pulse", className)} />;
    }

    return (
        <YandexMapCanvasView
            className={className}
            reactifiedApi={reactifiedApi}
            initialMapLocation={initialMapLocation}
            registerMapInstance={registerMapInstance}
            handleMapUpdate={handleMapUpdate}
        >
            {children}
        </YandexMapCanvasView>
    );
};
