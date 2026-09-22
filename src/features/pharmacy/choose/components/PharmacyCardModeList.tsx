import React, { useMemo } from "react";
import { PharmacyStockProps } from "@/types/pharmacy.types";
import PharmacyCardModeListItem from "@/features/pharmacy/choose/components/PharmacyCardModeListItem";
import { DisplayProductAvailability } from "@/features/pharmacy/choose/components/display-product-availability";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { usePharmacyStore } from "@/stores/usePharmacyStore";
import {cn} from "@/lib/utils";
import {useCartStore} from "@/stores/useCartStore";
import Image from "next/image";
import CatWithGlass from "@/assets/resources/CatWithGlass.png"
import {PharmacyInfo} from "@/features/pharmacy/PharmacyInfo";
import NoMap from "@/assets/resources/NoMap.png";

interface Props {
    pharmacies: PharmacyStockProps[] | undefined;
    onSelectPharmacy: (pharmacy: PharmacyStockProps) => void;
    bestPricePharmacyId?: number;
}

const PharmacyCardModeList = ({ pharmacies, onSelectPharmacy, bestPricePharmacyId }: Props) => {
    const {
        confirmedPharmacy,
        selectedPharmacy,
        setConfirmedPharmacy,
        setOpenChoosePharmacyDialog,
    } = usePharmacyStore();

    const { reset: resetPharmacy } = usePharmacyStore.getState();

    const { selectedCartCount } = useCartStore();

    const selectedPharmacyStock = useMemo(
        () => pharmacies?.find((p) => p.id === selectedPharmacy?.id),
        [pharmacies, selectedPharmacy?.id]
    );

    if (!pharmacies?.length) {
        return (
            <div className="flex flex-col h-full w-full justify-center items-center  ">
                <Image src={NoMap} alt="No items for map"/>
                <span className="font-medium text-primary-blue">Аптек <b>не найдено</b></span>
            </div>
        );
    }

    const onConfirmPharmacy = (pharmacy: PharmacyStockProps) => {
        setConfirmedPharmacy(pharmacy);
        setOpenChoosePharmacyDialog(false);
    };

    return (
        <div className="lg:flex hidden h-full overflow-hidden">
            <div className="max-w-[815px] h-full flex flex-col gap-[6px] w-full overflow-y-auto pr-[4px] custom-scroll">
                {pharmacies.map((pharmacy) => (
                    <PharmacyCardModeListItem
                        key={pharmacy.id}
                        isBestPrice={pharmacy.id === bestPricePharmacyId}
                        pharmacy={pharmacy}
                        onSelectPharmacy={onSelectPharmacy}
                    />
                ))}
            </div>

            <div className="max-w-[367px] bg-white-500 rounded-[16px] ml-[4px] w-full">
                {selectedPharmacyStock ? (
                    <div className="w-full rounded-[16px] relative flex flex-col gap-3 p-6">
                        <button
                            className="absolute right-[29px] top-[29px]"
                            onClick={() => {
                                resetPharmacy()
                            }}
                        >
                            <X color="#8E9AAB" />
                        </button>

                        <p className="font-bold max-w-[280px] w-full bg-white-500 flex flex-col text-[24px] leading-[100%] text-black-100 gap-1">
                            <span>Аптека вивАнтей</span>
                            <span>{selectedPharmacyStock.address}</span>
                        </p>


                        <div className="flex flex-col max-w-[180px] w-full text-[14px] xl:text-[16px] font-medium leading-[100%] text-black-100">
                            <PharmacyInfo phone={selectedPharmacyStock?.phone} schedule={selectedPharmacyStock?.schedule} inscriptions={true}/>
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
                ) : (
                    <div className="w-full rounded-[16px] relative flex flex-col justify-center items-center gap-3 p-6">
                        <Image src={CatWithGlass} alt={"Cat image"}/>
                        <span className="text-center font-bold text-[22px] leading-[144%]">Выберите аптеку слева, чтобы увидеть наличие товара</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PharmacyCardModeList;
