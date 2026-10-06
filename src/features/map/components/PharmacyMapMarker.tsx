"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import MapPharmacyIcon from "@/assets/icons/MapPharmacyIcon.svg";
import indicatorDarkBlueMedium from "@/assets/resources/map/indicator-dark-blue-medium.svg";
import IconGeo from "@/assets/resources/map/IconGeo.svg";
import Indicator from "@/icons/Indicator";
import { PharmacyStockProps } from "@/types/pharmacy.types";

interface BaseProps {
    isSelected: boolean;
    zoom: number;
    label?: string;
    onClick: () => void;
}

interface DefaultMarkerProps extends BaseProps {
    variant?: "default";
}

interface CartMarkerProps extends BaseProps {
    variant: "cart";
    pharmacy: PharmacyStockProps;
    cartTotalAmount: number;
    isBestPrice?: boolean;
}

type Props = DefaultMarkerProps | CartMarkerProps;

export const PharmacyMapMarker = (props: Props) => {
    const { isSelected, zoom, onClick } = props;
    const compactView = zoom <= 17;

    if (props.variant === "cart") {
        const { pharmacy, cartTotalAmount, isBestPrice = false } = props;

        if (!cartTotalAmount) return null;

        const availableAmount = pharmacy.total.amount;
        const isFullyAvailable = availableAmount >= cartTotalAmount;

        const markerClassName = cn(
            "lg:px-[14px] text-[16px] lg:py-[9px] px-[8px] py-[5px] rounded-[66px] cursor-pointer flex justify-center items-center translate-x-[-35%] translate-y-[-110%]",
            isBestPrice
                ? isFullyAvailable
                    ? "bg-green-500 text-white-500"
                    : "border-green-500 text-green-500 bg-white-500 border"
                : isFullyAvailable
                  ? "bg-primary-blue text-white-500"
                  : "border-primary-yellow text-primary-yellow bg-white-500 border"
        );

        const indicatorVariant = isBestPrice ? "bestPrice" : "default";

        return (
            <div onClick={onClick} className="relative h-0" tabIndex={0}>
                <div className={markerClassName}>
                    <p className="whitespace-nowrap text-sm font-medium leading-[120%]">
                        {`${availableAmount} из ${cartTotalAmount}`}
                    </p>
                    <div className="lg:w-[15px] w-[15px] lg:[top:calc(100%-1px)] aspect-square absolute left-1/2 -translate-x-1/2 top-full">
                        <Indicator
                            available={isFullyAvailable}
                            variant={indicatorVariant}
                        />
                    </div>
                </div>
            </div>
        );
    }

    if (isSelected && props.label) {
        return (
            <div onClick={onClick} className="relative h-0" tabIndex={0}>
                <div className="text-nowrap w-fit relative cursor-pointer translate-x-[-9.3%] translate-y-[-112%] px-3 py-2 min-h-[36px] bg-primary-blue rounded-[99px] text-white-500 flex items-center gap-[4px] lg:text-[14px] text-[12px] leading-[110%] font-medium">
                    <div className="min-w-[20px]">
                        <Image width={20} height={20} src={IconGeo} alt="geo" />
                    </div>
                    {props.label}
                    <div
                        className="w-[15px] aspect-square absolute left-[22px] -translate-x-1/2 top-full"
                        style={{ top: "calc(100% - 8px)" }}
                    >
                        <Image
                            src={indicatorDarkBlueMedium}
                            alt="indicator"
                            fill
                            className="w-full h-full object-contain"
                        />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div onClick={onClick} className="relative h-0" tabIndex={0}>
            {compactView ? (
                <div className="lg:w-[36px] w-[34px] lg:h-[42px] h-[38px] cursor-pointer flex justify-center items-center translate-x-[-50%] translate-y-[-110%]">
                    <Image
                        src={MapPharmacyIcon}
                        alt="Аптека"
                        className="lg:w-[36px] w-[34px] lg:h-[42px] h-[38px]"
                    />
                </div>
            ) : (
                <div className="lg:w-[62px] w-[38px] lg:h-[39px] h-[20px] cursor-pointer flex justify-center items-center translate-x-[-35%] translate-y-[-110%]">
                    <Image
                        src={MapPharmacyIcon}
                        alt="Аптека"
                        className="lg:w-[46px] w-[34px] lg:h-[52px] h-[38px]"
                    />
                </div>
            )}
        </div>
    );
};
