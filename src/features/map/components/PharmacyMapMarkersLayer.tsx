"use client";

import React, {ReactNode} from "react";
import { ListItems } from "@/components/ListItems";
import { clusterPoints } from "@/utils/clusterPoints";
import { getPharmacyCoordinates } from "@/features/map/utils/getPharmacyCoordinates";
import { useConnectYmaps } from "@/features/map/hooks/useConnectYmaps";
import { useYandexMap } from "@/features/map/context/YandexMapContext";
import { PharmacyMapMarker } from "@/features/map/components/PharmacyMapMarker";
import { PHARMACY_MAP_SELECT_ZOOM } from "@/features/map/constants";
import { PharmacyStockProps } from "@/types/pharmacy.types";
import { YMapMarkerProps } from "@yandex/ymaps3-types";
import {usePharmacyStore} from "@/stores/usePharmacyStore";

type MarkerVariant = "default" | "cart";

interface BaseProps<T> {
    items: T[];
    getItemId: (item: T) => number;
    getItemLabel?: (item: T) => string;
    selectedId: number;
    onSelect: (id: number) => void;
    variant?: MarkerVariant;
    cartProps?: {
        pharmacies: PharmacyStockProps[];
        cartTotalAmount: number;
        bestPricePharmacyId?: number;
        onSelectPharmacy: (pharmacy: PharmacyStockProps) => void;
    };
}

export const PharmacyMapMarkersLayer = <T,>({
    items,
    getItemId,
    getItemLabel,
    selectedId,
    onSelect,
    variant = "default",
    cartProps,
}: BaseProps<T>) => {
    const { setOpenChooseOnePharmacyDialog } = usePharmacyStore();
    const { reactifiedApi } = useConnectYmaps();
    const { zoom, panTo } = useYandexMap();

    if (!reactifiedApi) return null;

    const { YMapMarker } = reactifiedApi;

    type YMapMarkerFixedProps = YMapMarkerProps & {
        children?: ReactNode;
    };
    const YmapMarker = YMapMarker as React.ComponentType<YMapMarkerFixedProps>;

    const clusterThreshold = zoom < 12 ? 0.1 : zoom >= 12 && zoom < 14 ? 0.01 : 0.0001;
    const clustered = clusterPoints(items, clusterThreshold);

    const panToItem = (item: T) => {
        const coords = getPharmacyCoordinates(item as Parameters<typeof getPharmacyCoordinates>[0]);
        if (coords) {
            panTo(coords, PHARMACY_MAP_SELECT_ZOOM);
        }
    };

    return (
        <>
            <ListItems
                items={clustered}
                render={(cluster, index) => {
                    const { items: clusterItems } = cluster;
                    const item = clusterItems[0];
                    const coords = getPharmacyCoordinates(item as Parameters<typeof getPharmacyCoordinates>[0]);

                    if (!coords) return null;

                    const [lng, lat] = coords;
                    const clusterKey = `${lng}-${lat}-${clusterItems.length}-${index}`;

                    return (
                        <YmapMarker
                            key={clusterKey}
                            coordinates={[lng, lat]}
                            zIndex={getItemId(item) === selectedId ? 100 : 10}
                        >
                            {clusterItems.length === 1 ? (
                                (() => {
                                    const itemId = getItemId(item);

                                    if (variant === "cart" && cartProps) {
                                        const pharmacy = cartProps.pharmacies.find((p) => p.id === itemId);
                                        if (!pharmacy) return null;

                                        return (
                                            <PharmacyMapMarker
                                                variant="cart"
                                                pharmacy={pharmacy}
                                                cartTotalAmount={cartProps.cartTotalAmount}
                                                isBestPrice={cartProps.bestPricePharmacyId === itemId}
                                                isSelected={selectedId === itemId}
                                                zoom={zoom}
                                                onClick={() => {cartProps.onSelectPharmacy(pharmacy);
                                                    setOpenChooseOnePharmacyDialog(true);}}
                                            />
                                        );
                                    }

                                    return (
                                        <PharmacyMapMarker
                                            isSelected={selectedId === itemId}
                                            zoom={zoom}
                                            label={getItemLabel?.(item)}
                                            onClick={() => {
                                                panToItem(item);
                                                onSelect(itemId);
                                                setOpenChooseOnePharmacyDialog(true);
                                            }}
                                        />
                                    );
                                })()
                            ) : (
                                <div
                                    onClick={() => panTo(coords, PHARMACY_MAP_SELECT_ZOOM)}
                                    className="relative w-[43px] h-[43px] lg:text-[16px] bg-primary-blue rounded-[50%] text-[12px] leading-[120%] cursor-pointer flex justify-center items-center translate-x-[-50%] translate-y-[-110%]"
                                    tabIndex={0}
                                >
                                    <p className="z-10 font-medium text-[21px] text-white-500 leading-[120%]">
                                        {clusterItems.length}
                                    </p>
                                </div>
                            )}
                        </YmapMarker>
                    );
                }}
            />
        </>
    );
};
