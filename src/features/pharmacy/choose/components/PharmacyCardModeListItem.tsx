import React, { useMemo } from "react";
import Image from "next/image";
import AnteyLogo from "@/assets/resources/product/PharmacyAnteyLogo.svg";
import { cn } from "@/lib/utils";
import { PrimaryBlueArrow } from "@/icons/primary-blue-arrow";
import { PharmacyStockProps } from "@/types/pharmacy.types";
import { usePharmacyStore } from "@/stores/usePharmacyStore";
import { useCartStore } from "@/stores/useCartStore";
import greenZap from "@/assets/resources/greenZap.svg";
import {PharmacyInfo} from "../../PharmacyInfo";

interface Props {
    pharmacy: PharmacyStockProps;
    isBestPrice?: boolean;
    disabled?: boolean;
    onSelectPharmacy: (pharmacy: PharmacyStockProps) => void;
}

const PharmacyCardModeListItem = ({
    pharmacy,
    isBestPrice = false,
    disabled = false,
    onSelectPharmacy,
}: Props) => {
    const { confirmedPharmacy, selectedPharmacy } = usePharmacyStore();
    const { selectedCartCount } = useCartStore();

    const alreadySelected = useMemo(() => {
        if (!confirmedPharmacy) return false;
        return confirmedPharmacy.id === pharmacy.id;
    }, [confirmedPharmacy, pharmacy.id]);

    const handleSelect = () => {
        if (!disabled) {
            onSelectPharmacy(pharmacy);
        }
    };

    return (
        <div onClick={handleSelect}
            className={cn(
                "w-full bg-white-500 flex items-center group justify-between py-6 pl-[30px] pr-[18px] rounded-[16px]",
                isBestPrice && "border-2 border-green-500 hover:bg-green-500/5",
                {
                    "bg-blue-lightBlue": selectedPharmacy?.id === pharmacy.id && !isBestPrice,
                    "bg-green-500/10": selectedPharmacy?.id === pharmacy.id && isBestPrice,
                    "bg-blue-lightBlue border-2 border-blue-medium/50": alreadySelected,
                    "hover:bg-blue-lightBlue/50":
                        selectedPharmacy?.id !== pharmacy.id && !alreadySelected && !isBestPrice,
                }
            )}
        >
            <p className="max-w-[230px] xl:max-w-[250px] w-full font-bold flex flex-col text-black-100 lg:text-[21px] text-[18px] lg:leading-[100%] leading-[120%] ">
                <span className="flex gap-1">
                    Аптека вивАнтей <Image src={AnteyLogo} alt="logo" />
                </span>
                <span>{pharmacy.address} </span>
            </p>

            <div className="flex flex-col max-w-[180px] w-full text-[14px] xl:text-[16px] font-medium leading-[100%] text-black-100">
                <PharmacyInfo phone={pharmacy?.phone} schedule={pharmacy?.schedule} />
            </div>

            <div className="flex max-w-[250px] w-fit flex-col gap-2">
                    <span className={cn(
                            "flex flex-row items-center font-medium leading-[120%] text-balance text-primary-blue text-center text-[13px] xl:text-[15px]",
                            pharmacy.total.amount < selectedCartCount && "text-primary-yellow",
                            isBestPrice && "text-green-500"
                        )}
                    >
                        { pharmacy?.total?.amount === selectedCartCount ? (
                            "Все в наличии"
                        ) : (
                            "В наличии " + pharmacy.total.amount + " из " + selectedCartCount
                        )}
                    </span>

                <p className={cn("flex xl:hidden w-full font-bold leading-[100%] text-[16px] justify-center text-center",
                    isBestPrice && "text-green-500",
                )}>
                    {pharmacy.total.price} ₽
                </p>
            </div>

            <p className={cn("hidden xl:flex w-fit font-bold leading-[100%] text-[20px]",
                isBestPrice && "text-green-500",
            )}>
                {pharmacy.total.price} ₽
            </p>

            { isBestPrice ? (
                // <Zap className="text-green-500" />
                <Image src={greenZap} alt="Zap"/>
            ):(
                <button
                    className={cn(
                        " min-w-8 h-8 rounded-[8px] group-hover:bg-white-500 bg-blue-lightBlue flex items-center justify-center",
                        pharmacy.id === selectedPharmacy?.id && "bg-white-500"
                    )}
                >
                    <PrimaryBlueArrow />
                </button>
            )}
        </div>
    );
};

export default PharmacyCardModeListItem;
