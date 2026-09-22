"use client";

import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog";
import { usePharmacyStore } from "@/stores/usePharmacyStore";
import {cn} from "@/lib/utils";
import {PharmacyInfo} from "@/features/pharmacy/PharmacyInfo";
import {DisplayProductAvailability} from "@/features/pharmacy/choose/components/display-product-availability";
import {Button} from "@/components/ui/button";
import React, {useMemo} from "react";
import {X} from "lucide-react";
import {PharmacyStockProps} from "@/types/pharmacy.types";
import {useCartStore} from "@/stores/useCartStore";

interface Props {
    pharmacies: PharmacyStockProps[] | undefined;
    bestPricePharmacyId?: number;
}

export const ChooseOnePharmacyDialog = ({ pharmacies }: Props) => {
    const {
        confirmedPharmacy,
        selectedPharmacy,
        setConfirmedPharmacy,
        isOpenChooseOnePharmacyDialog,
        setOpenChoosePharmacyDialog,
        setOpenChooseOnePharmacyDialog,
    } = usePharmacyStore();

    const { selectedCartCount } = useCartStore();

    const handleClose = () => {
        setOpenChooseOnePharmacyDialog(false);
    };

    const onOpenChange = (open: boolean) => {
        if (!open) {
            handleClose();
            return;
        }
        setOpenChooseOnePharmacyDialog(true);
    };

    const onConfirmPharmacy = (pharmacy: PharmacyStockProps) => {
        setConfirmedPharmacy(pharmacy);
        setOpenChooseOnePharmacyDialog(false);
        setOpenChoosePharmacyDialog(false);
    };

    const selectedPharmacyStock = useMemo(
        () => pharmacies?.find((p) => p.id === selectedPharmacy?.id),
        [pharmacies, selectedPharmacy?.id]
    );

    if (isOpenChooseOnePharmacyDialog) {
        return (
            <Dialog open={isOpenChooseOnePharmacyDialog} onOpenChange={onOpenChange}>
                <DialogContent
                    showX={false}
                    className={`h-fit overflow-hidden max-w-[90%] 2xs:max-w-[367px] bg-white-500 rounded-[16px] w-full`}
                >
                    {selectedPharmacyStock && (
                        <div className="w-full rounded-[16px] relative flex flex-col gap-3">
                            <button
                                className="absolute right-[0px] top-[0px]"
                                onClick={() => {
                                    setOpenChooseOnePharmacyDialog(false);
                                }}
                            >
                                <X color="#8E9AAB"/>
                            </button>

                            <p className="font-bold max-w-[280px] w-full bg-white-500 flex flex-col text-[24px] leading-[100%] text-black-100 gap-1">
                                <span>Аптека вивАнтей</span>
                                <span>{selectedPharmacyStock.address}</span>
                            </p>


                            <div
                                className="flex flex-col max-w-[180px] w-full text-[14px] xl:text-[16px] font-medium leading-[100%] text-black-100">
                                <PharmacyInfo phone={selectedPharmacyStock?.phone}
                                              schedule={selectedPharmacyStock?.schedule} inscriptions={true}/>
                            </div>


                            <p className={cn(
                                "font-medium leading-[120%] text-primary-blue",
                                selectedPharmacyStock.total.amount < selectedCartCount && "text-primary-yellow",
                                selectedPharmacyStock.total.amount === 0 && "text-primary-red"
                            )}>
                                В наличии {selectedPharmacyStock.total.amount} из {selectedCartCount} товаров
                                <span className="text-gray-dark"> на
                                            <span className="font-bold text-black-500 text-[18px]">
                                                {" "} {selectedPharmacyStock.total.price} ₽
                                            </span>
                                        </span>
                            </p>

                            <DisplayProductAvailability
                                pharmacy={selectedPharmacyStock}
                                showDetails
                            />

                            {confirmedPharmacy?.id === selectedPharmacyStock.id ? (
                                <p className="text-xl font-bold text-primary-blue">
                                    Аптека уже выбрана
                                </p>
                            ) : (
                                <Button
                                    onClick={() => onConfirmPharmacy(selectedPharmacyStock)}
                                    className="w-full h-[44px] rounded-2xl text-[18px] font-bold leading-[120%]"
                                >
                                    Выбрать эту аптеку
                                </Button>
                            )}
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        );
    }
};
