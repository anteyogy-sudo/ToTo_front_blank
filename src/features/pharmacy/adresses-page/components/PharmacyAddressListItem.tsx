import React, {useRef} from 'react';
import {MoveRight} from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import {useIsomorphicLayoutEffect} from "@/hooks/useIsomorphicLayoutEffect";
import {PharmacyProps} from "@/types/pharmacy.types";
import { usePanToPharmacy } from "@/features/map/hooks/usePanToPharmacy";
import { PHARMACY_MAP_SELECT_ZOOM } from "@/features/map/constants";
import {PharmacyInfo} from "@/features/pharmacy/PharmacyInfo";
import {cn} from "@/lib/utils";

interface PharmacyListItemProps {
    item: PharmacyProps;
    selectedPharmacy: number;
    setSelectedPharmacy: Dispatch<SetStateAction<number>>;
    scrollContainerRef: React.RefObject<HTMLDivElement | null>;
}

const PharmacyAddressListItem = ({ item, selectedPharmacy, setSelectedPharmacy, scrollContainerRef }: PharmacyListItemProps) => {
    const panToPharmacy = usePanToPharmacy();
    const itemRef = useRef<HTMLDivElement | null>(null);

    useIsomorphicLayoutEffect(() => {
        if (
            selectedPharmacy === item.id &&
            itemRef.current &&
            scrollContainerRef.current
        ) {
            itemRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'nearest',
            });
        }
    }, [selectedPharmacy]);

    const onMarkerClick = () => {
        panToPharmacy(item, PHARMACY_MAP_SELECT_ZOOM);
        setSelectedPharmacy(item.id);
    };

    return (
        <>
            <div ref={itemRef}
                onClick={onMarkerClick}
                className={cn("flex group bg-white-500 rounded-[16px] cursor-pointer lg:p-6 p-4 flex-col lg:gap-6 gap-4",
                    selectedPharmacy === item?.id && ' border-2 border-primary-blue/80',
                )}
            >
                <div className='flex items-center justify-between gap-2'>
                    <p className='font-bold text-black-100 lg:text-[24px] text-[18px] lg:leading-[100%] leading-[120%] '>
                        {item.address}
                    </p>
                    <div className={`flex rounded-[8px] justify-center items-center min-w-[32px] h-[32px] ${selectedPharmacy === item?.id ? 'bg-white-500' : 'bg-blue-lightBlue'} `}>
                        <MoveRight size={20} className='text-primary-blue ' />
                    </div>
                </div>

                <div className="flex flex-col text-[15px] lg:text-[17px] font-medium leading-[120%] text-black-100 whitespace-pre-line">
                    <PharmacyInfo phone={item?.phone} schedule={item?.schedule} inscriptions={true} />
                </div>

            </div>

            <div className='w-[90%] mx-auto lg:hidden block border-b-2 border-blue-light-gray'></div>
        </>
    );
};

export default PharmacyAddressListItem;