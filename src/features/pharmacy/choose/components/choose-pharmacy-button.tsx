"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { CrossIcon } from "@/icons/cross";
import { ChoosePharmacyContent } from "./choose-pharmacy-content";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { usePharmacyStore } from "@/stores/usePharmacyStore";
import { useSelectedGoodsForStocks } from "../hooks/useSelectedGoodsForStocks";
import { useMapStore } from "@/stores/useMapStore";

export const ChoosePharmacyButton = () => {
    const {
        confirmedPharmacy,
        setSelectedPharmacy,
        isOpenChoosePharmacyDialog,
        setOpenChoosePharmacyDialog,
    } = usePharmacyStore();
    const { selectedIds } = useSelectedGoodsForStocks();
    const resetLocation = useMapStore((s) => s.resetLocation);

    const [selectedMode, setSelectedMode] = useState<"list" | "map">("map");

    const handleClose = () => {
        setSelectedPharmacy(null);
        resetLocation();
        setOpenChoosePharmacyDialog(false);
    };

    const onOpenChange = (open: boolean) => {
        if (!open) {
            handleClose();
            return;
        }
        setOpenChoosePharmacyDialog(true);
    };

    return (
        <Dialog open={isOpenChoosePharmacyDialog} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>
                <Button
                    disabled={!selectedIds.length}
                    className={cn(
                        " md:h-12 h-[62px] w-fit md:w-full rounded-[16px] px-6 font-bold text-[18px] leading-[120%]",
                        !!confirmedPharmacy &&
                            " px-10 bg-blue-lightBlue text-primary-blue shadow-none font-medium"
                    )}
                >
                    {confirmedPharmacy ? "Выбрать другую аптеку" : "Выбрать аптеку"}
                </Button>
            </DialogTrigger>

            <DialogContent
                showX={false}
                className={`max-h-full h-full max-w-1280 lg:p-10 bg-surface p-0 lg:gap-[10px] gap-6 rounded-2xl overflow-hidden`}
            >
                <DialogHeader className=" flex-row justify-between lg:p-0 p-6 pb-0">
                    <DialogTitle className=" lg:text-[40px] text-[24px] font-bold leading-[100%]">
                        Выбрать аптеку
                    </DialogTitle>
                    <DialogDescription className=" hidden">
                        Choose a pharmacy description
                    </DialogDescription>
                    <button type="button" onClick={handleClose}>
                        <CrossIcon strokeWidth={2} />
                    </button>
                </DialogHeader>

                {isOpenChoosePharmacyDialog && (
                    <ChoosePharmacyContent
                        setSelectedMode={setSelectedMode}
                        selectedMode={selectedMode}
                    />
                )}
            </DialogContent>
        </Dialog>
    );
};
