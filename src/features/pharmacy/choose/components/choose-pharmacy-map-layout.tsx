"use client";

import React, { useCallback, useRef } from "react";
import { DEFAULT_COORDS } from "@/constants/global.constants";
import { YandexMapProvider } from "@/features/map/components/YandexMapRoot";
import { YandexMapCanvas } from "@/features/map/components/YandexMapCanvas";
import { PharmacyMapMarkersLayer } from "@/features/map/components/PharmacyMapMarkersLayer";
import { getPharmacyCoordinates } from "@/features/map/utils/getPharmacyCoordinates";
import { PHARMACY_MAP_OVERVIEW_ZOOM, PHARMACY_MAP_SELECT_ZOOM } from "@/features/map/constants";
import { useYandexMap } from "@/features/map/context/YandexMapContext";
import { usePharmacyStore } from "@/stores/usePharmacyStore";
import { useCartStore } from "@/stores/useCartStore";
import { PharmacyStockProps } from "@/types/pharmacy.types";
import { PharmaciesList, PharmaciesListHandle } from "./pharmacies-list";
import Image from "next/image";
import greenZap from "@/assets/resources/greenZap.svg"

interface Props {
    pharmacies: PharmacyStockProps[];
    status: "error" | "success" | "pending";
    bestPricePharmacyId?: number;
}

const CartMapLayoutInner = ({ pharmacies, status, bestPricePharmacyId }: Props) => {
    const { panTo } = useYandexMap();
    const listRef = useRef<PharmaciesListHandle>(null);
    const { selectedCartCount } = useCartStore();
    const { selectedPharmacy, setSelectedPharmacy } = usePharmacyStore();
    const bestPricePharmacy = pharmacies.find((pharmacy) => pharmacy.id === bestPricePharmacyId);
    const cartTotalAmount = selectedCartCount ?? 0;

    const scrollListToPharmacy = useCallback((pharmacyId: number) => {
        requestAnimationFrame(() => {
            listRef.current?.scrollToPharmacy(pharmacyId);
        });
    }, []);

    const onSelectPharmacy = useCallback(
        (pharmacy: PharmacyStockProps, options?: { scrollList?: boolean }) => {
            const coords = getPharmacyCoordinates(pharmacy);
            if (coords) {
                panTo(coords, PHARMACY_MAP_SELECT_ZOOM);
            }

            setSelectedPharmacy(pharmacy);

            if (options?.scrollList !== false) {
                scrollListToPharmacy(pharmacy.id);
            }
        },
        [panTo, scrollListToPharmacy, setSelectedPharmacy]
    );

    const onSelectFromMarker = useCallback(
        (pharmacy: PharmacyStockProps) => {
            onSelectPharmacy(pharmacy, { scrollList: true });
        },
        [onSelectPharmacy]
    );

    const onSelectFromList = useCallback(
        (pharmacy: PharmacyStockProps) => {
            onSelectPharmacy(pharmacy, { scrollList: false });
        },
        [onSelectPharmacy]
    );

    // const selectedPharmacyStock = useMemo(() => {
    //     if (!selectedPharmacy) return null;
    //     return pharmacies.find((item) => item.id === selectedPharmacy.id) ?? null;
    // }, [pharmacies, selectedPharmacy]);

    return (
        <div className="h-full w-full overflow-hidden flex lg:gap-x-[8px] bg-white-500 rounded-[16px] lg:p-2 border-[1px] ">
            <div className="max-lg:hidden flex h-full rounded-[16px] bg-[#F7F7F7] p-1">
                <PharmaciesList
                    ref={listRef}
                    pharmacies={pharmacies}
                    status={status}
                    onSelectPharmacy={onSelectFromList}
                    bestPricePharmacyId={bestPricePharmacyId}
                />
            </div>

            <div className="w-full h-full overflow-hidden flex">
                <div className="w-full lg:p-1 relative flex">
                    <YandexMapCanvas className="flex w-full h-full lg:p-1 bg-primary-light-white border rounded-[16px]">
                        <PharmacyMapMarkersLayer
                            items={pharmacies}
                            getItemId={(pharmacy) => pharmacy.id}
                            selectedId={selectedPharmacy?.id ?? 0}
                            onSelect={() => undefined}
                            variant="cart"
                            cartProps={{
                                pharmacies,
                                cartTotalAmount,
                                bestPricePharmacyId: bestPricePharmacyId,
                                onSelectPharmacy: onSelectFromMarker,
                            }}
                        />
                    </YandexMapCanvas>

                    {bestPricePharmacy && (
                        <button
                            type="button"
                            onClick={() => onSelectPharmacy(bestPricePharmacy)}
                            className="absolute bottom-4 left-1/2 z-100000 -translate-x-1/2 rounded-[66px] border-2 border-green-500 bg-white-500 lg:px-7 lg:py-2 lg:text-[18px] px-5 py-2 text-sm font-bold leading-[120%] text-green-500 shadow-sm transition-colors hover:bg-green-50"
                        >
                            <div className="flex flex-row justify-center items-center gap-2">
                                <Image src={greenZap} alt="Zap"/>
                                Лучшая цена {bestPricePharmacy.total.price} ₽
                            </div>
                        </button>
                    )}
                </div>

                {/*<div className="w-full h-full lg:hidden">*/}
                {/*    { selectedPharmacyStock && (*/}
                {/*        <div className="w-full h-fit p-6">*/}
                {/*            <PharmacyCard*/}
                {/*                onSelectPharmacy={onSelectFromList}*/}
                {/*                pharmacy={selectedPharmacyStock}*/}
                {/*                disabled*/}
                {/*            />*/}
                {/*        </div>*/}
                {/*    )}*/}
                {/*</div>*/}
            </div>
        </div>
    );
};

export const ChoosePharmacyMapLayout = ({ pharmacies, status, bestPricePharmacyId }: Props) => {
    const selectedPharmacy = usePharmacyStore((s) => s.selectedPharmacy);
    const initialCenter =
        getPharmacyCoordinates(pharmacies[0]) ??
        getPharmacyCoordinates(selectedPharmacy) ??
        DEFAULT_COORDS;

    return (
        <YandexMapProvider initialCenter={initialCenter} initialZoom={PHARMACY_MAP_OVERVIEW_ZOOM}>
            <CartMapLayoutInner
                pharmacies={pharmacies}
                status={status}
                bestPricePharmacyId={bestPricePharmacyId}
            />
        </YandexMapProvider>
    );
};
