import * as React from "react";
import * as ReactDOM from "react-dom";
import { ReactifiedModule, Reactify } from "@yandex/ymaps3-types/reactify";

export type YmapsApi = ReactifiedModule<typeof ymaps3> & {
    useDefault: Reactify["useDefault"];
};

export type YMapInstance = {
    update: (params: {
        location?: {
            center?: [number, number];
            zoom?: number;
            duration?: number;
        };
    }) => void;
};

export type MapLocation = {
    center: [number, number];
    zoom: number;
};

let ymapsApiPromise: Promise<YmapsApi> | null = null;

export const loadYmaps = (): Promise<YmapsApi> => {
    if (!ymapsApiPromise) {
        ymapsApiPromise = (async () => {
            await ymaps3.ready;

            const ymaps3React = await ymaps3.import("@yandex/ymaps3-reactify");
            const reactify = ymaps3React.reactify.bindTo(React, ReactDOM);
            const reactifiedModule = reactify.module(ymaps3);

            return Object.assign(reactifiedModule, {
                useDefault: reactify.useDefault,
            }) as YmapsApi;
        })();
    }

    return ymapsApiPromise;
};
