"use client";

import { createContext, useContext } from "react";
import { MapEventUpdateHandler } from "@yandex/ymaps3-types";
import { MapLocation } from "@/lib/ymaps";

export type YandexMapContextValue = {
    /** Замороженная начальная позиция для YMap (reactify.useDefault) */
    initialMapLocation: MapLocation;
    zoom: number;
    panTo: (center: [number, number], zoom?: number) => void;
    registerMapInstance: (instance: unknown) => void;
    handleMapUpdate: MapEventUpdateHandler;
};

const YandexMapContext = createContext<YandexMapContextValue | null>(null);

export const YandexMapProvider = YandexMapContext.Provider;

export const useYandexMap = (): YandexMapContextValue => {
    const context = useContext(YandexMapContext);

    if (!context) {
        throw new Error("useYandexMap must be used within YandexMapProvider");
    }

    return context;
};

export const useYandexMapOptional = (): YandexMapContextValue | null => useContext(YandexMapContext);
