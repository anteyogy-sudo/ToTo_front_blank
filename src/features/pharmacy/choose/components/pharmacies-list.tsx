"use client";

import { ListItems } from "@/components/ListItems";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import React, { forwardRef, Fragment, useImperativeHandle, useRef } from "react";
import { PharmacyStockProps } from "@/types/pharmacy.types";
import { PharmaciesLoadingList } from "./pharmacies-loading-list";
import { PharmacyCard } from "./pharmacy-card";

interface Props {
    className?: string;
    pharmacies: PharmacyStockProps[] | undefined;
    status: "error" | "success" | "pending";
    onSelectPharmacy: (pharmacy: PharmacyStockProps) => void;
    bestPricePharmacyId?: number;
}

export type PharmaciesListHandle = {
    scrollToPharmacy: (pharmacyId: number) => void;
};

export const PharmaciesList = forwardRef<PharmaciesListHandle, Props>(function PharmaciesList(
    { className, pharmacies, status, onSelectPharmacy, bestPricePharmacyId },
    ref
) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef<Record<number, HTMLDivElement | null>>({});

    useImperativeHandle(
        ref,
        () => ({
            scrollToPharmacy: (pharmacyId: number) => {
                const element = itemRefs.current[pharmacyId];
                if (!element) return;

                element.scrollIntoView({
                    behavior: "smooth",
                    block: "nearest",
                    inline: "nearest",
                });
            },
        }),
        []
    );

    if (status === "pending") {
        return <PharmaciesLoadingList className={className} />;
    }

    if (status === "error") {
        return <p className="font-medium text-primary-red">Аптек не найдено</p>;
    }

    if (!pharmacies?.length) {
        return <p className="flex w-full justify-center text-center text-nowrap font-medium p-3 text-primary-red">Аптек по фильтрам не найдено</p>;
    }

    return (
        <div ref={scrollContainerRef}
            className={cn("w-full max-h-full lg:w-[360px] lg:p-1 p-6 pt-0 flex flex-col gap-4 overflow-y-scroll custom-scroll", className)}>
                <ListItems
                    items={pharmacies}
                    render={(pharmacy) => (
                        <Fragment key={pharmacy.id}>
                            <div ref={(el) => { itemRefs.current[pharmacy.id] = el; }}>
                                <PharmacyCard
                                    pharmacy={pharmacy}
                                    onSelectPharmacy={onSelectPharmacy}
                                    isBestPrice={pharmacy.id === bestPricePharmacyId}
                                />
                            </div>
                            <Separator className="lg:hidden last:hidden" />
                        </Fragment>
                    )}
                />
        </div>
    );
});
