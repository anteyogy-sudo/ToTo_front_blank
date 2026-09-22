import {Button} from "@/components/ui/button";
// import { PrimaryBlueArrow } from "@/icons/primary-blue-arrow";
import {cn} from "@/lib/utils";
import {PharmacyStockProps} from "@/types/pharmacy.types";
import {usePharmacyStore} from "@/stores/usePharmacyStore";
import React, {useMemo} from "react";
import Image from "next/image";
import AnteyLogo from "@/assets/resources/product/PharmacyAnteyLogo.svg";
import {useCartStore} from "@/stores/useCartStore";
import greenZap from "@/assets/resources/greenZap.svg"
import {DisplayProductAvailability} from "@/features/pharmacy/choose/components/display-product-availability";
import {PharmacyInfo} from "@/features/pharmacy/PharmacyInfo";

interface Props {
    pharmacy: PharmacyStockProps;
    disabled?: boolean;
    onSelectPharmacy: (pharmacy: PharmacyStockProps) => void;
    isBestPrice?: boolean;
}

export const PharmacyCard = ({
                                 pharmacy,
                                 disabled = false,
                                 onSelectPharmacy,
                                 isBestPrice = false,
                             }: Props) => {
    const {
        confirmedPharmacy,
        selectedPharmacy,
        setConfirmedPharmacy,
        setOpenChoosePharmacyDialog,
    } = usePharmacyStore();
    const {selectedCartCount} = useCartStore();

    const alreadySelected = useMemo(() => {
        if (!confirmedPharmacy) return false;
        return confirmedPharmacy.id === pharmacy.id;
    }, [confirmedPharmacy, pharmacy.id]);

    const handleSelect = () => {
        if (!disabled) {
            onSelectPharmacy(pharmacy);
        }
    };

    const onConfirmPharmacy = () => {
        if (alreadySelected) return;
        setConfirmedPharmacy(pharmacy);
        setOpenChoosePharmacyDialog(false);
    };

    return (
        <div onClick={handleSelect}
             className={cn("w-full h-fit flex flex-col gap-3 lg:px-6 lg:py-3 p-4 cursor-pointer rounded-2xl transition-all duration-300 bg-white-500",
                 isBestPrice && "border-2 border-green-500",
                 isBestPrice && selectedPharmacy?.id !== pharmacy.id && "hover:bg-green-500/10",
                 {
                     "bg-white-500 border-2 border-gray-300/70": selectedPharmacy?.id === pharmacy.id && !isBestPrice,
                     "bg-blue-lightBlue border-2 border-primary-blue/70": alreadySelected,
                     "hover:bg-white-500/90": selectedPharmacy?.id !== pharmacy.id && !alreadySelected && !isBestPrice,
                 },
             )}
        >
            <div className=" w-full h-fit flex items-center justify-between gap-4">
                <p className="flex flex-col font-bold xl:text-[22px] text-[18px] leading-[100%]">
                    <span className="flex gap-1">
                        Аптека вивАнтей <Image src={AnteyLogo} alt="logo"/>
                    </span>
                    <span> {pharmacy.address}</span>
                </p>
                {isBestPrice && (
                    // <Zap className="text-green-500" />
                    <Image src={greenZap} alt="Zap"/>
                )}
                {/*<button className={cn(*/}
                {/*        " min-w-8 h-8 rounded-[8px] group-hover:bg-white-500 bg-blue-lightBlue lg:flex hidden items-center justify-center",*/}
                {/*        pharmacy.id === selectedPharmacy?.id && "bg-white-500"*/}
                {/*)}>*/}
                {/*    <PrimaryBlueArrow />*/}
                {/*</button>*/}
            </div>

            <div className="flex flex-col max-w-[180px] w-full text-[14px] xl:text-[16px] font-medium leading-[100%] text-black-100">
                <PharmacyInfo phone={pharmacy?.phone} schedule={pharmacy?.schedule} />
            </div>

            <p className={cn(
                "font-medium leading-[120%] text-primary-blue",
                pharmacy.total.amount < selectedCartCount && "text-primary-yellow",
                pharmacy.total.amount === 0 && "text-primary-red",
                isBestPrice && "text-green-500",
            )}
            >
                {pharmacy?.total?.amount === selectedCartCount ? (
                    "Все в наличии"
                ) : pharmacy?.total?.amount === 0 ? (
                    "Нет в наличии"
                ) : (
                    "В наличии " + pharmacy.total.amount + " из " + selectedCartCount + " товаров"
                )}
            </p>

            {pharmacy.total.price !== 0 && (
                <p className={cn("w-fit font-bold leading-[100%] text-[22px]",
                    isBestPrice && "text-green-500",
                )}>
                    {pharmacy.total.price} ₽
                </p>
            )}

            {selectedPharmacy?.id === pharmacy.id && (
                <DisplayProductAvailability pharmacy={pharmacy} showDetails={true}/>
            )}

            {alreadySelected ? (
                <p className=" text-xl font-bold text-primary-blue">Аптека уже выбрана</p>
            ) : selectedPharmacy?.id === pharmacy.id ? (
                <Button
                    onClick={onConfirmPharmacy}
                    className={cn("w-full h-[44px] rounded-2xl text-[18px] font-bold leading-[120%]",
                        isBestPrice && "bg-green-500",
                    )}
                >
                    Выбрать эту аптеку
                </Button>
            ) : null}
        </div>
    );
};
