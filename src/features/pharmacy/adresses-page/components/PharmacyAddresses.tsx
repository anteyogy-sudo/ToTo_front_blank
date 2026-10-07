"use client";

import React, { useMemo, useRef, useState } from "react";
import { useFetchPharmacyAddresses } from "@/features/pharmacy/adresses-page/hooks/useFetchPharmacyAddresses";
import Image from "next/image";
import search from "@/assets/icons/search.svg";
import PharmacyAddressListItem from "@/features/pharmacy/adresses-page/components/PharmacyAddressListItem";
import {DEFAULT_COORDS, PHONE_MAIN} from "@/constants/global.constants";
import { YandexMapRoot, YandexMapProvider } from "@/features/map/components/YandexMapRoot";
import { YandexMapCanvas } from "@/features/map/components/YandexMapCanvas";
import { PharmacyMapMarkersLayer } from "@/features/map/components/PharmacyMapMarkersLayer";
import { getPharmacyCoordinates } from "@/features/map/utils/getPharmacyCoordinates";
import { PHARMACY_MAP_OVERVIEW_ZOOM } from "@/features/map/constants";
import { PharmacyProps } from "@/types/pharmacy.types"
import {PharmacyInfo} from "@/features/pharmacy/PharmacyInfo";
import CatWithGlass from "@/assets/resources/CatWithGlass.png";

const PharmacyAddressesMap = ({
    pharmacies,
    selectedPharmacy,
    setSelectedPharmacy,
    className,
}: {
    pharmacies: PharmacyProps[];
    selectedPharmacy: number;
    setSelectedPharmacy: React.Dispatch<React.SetStateAction<number>>;
    className?: string;
}) => {
    const initialCenter = useMemo(() => {
        return getPharmacyCoordinates(pharmacies[0]) ?? DEFAULT_COORDS;
    }, [pharmacies]);

    return (
        <YandexMapRoot initialCenter={initialCenter} initialZoom={PHARMACY_MAP_OVERVIEW_ZOOM} className={className}>
            <PharmacyMapMarkersLayer
                items={pharmacies}
                getItemId={(item) => item.id}
                getItemLabel={(item) => item.address}
                selectedId={selectedPharmacy}
                onSelect={setSelectedPharmacy}
            />
        </YandexMapRoot>
    );
};

const PharmacyAddressesDesktop = ({
    pharmacies,
    selectedPharmacy,
    setSelectedPharmacy,
    searchText,
    setSearchText,
    scrollContainerRef,
}: {
    pharmacies: PharmacyProps[];
    selectedPharmacy: number;
    setSelectedPharmacy: React.Dispatch<React.SetStateAction<number>>;
    searchText: string;
    setSearchText: (value: string) => void;
    scrollContainerRef: React.RefObject<HTMLDivElement | null>;
}) => (
    <YandexMapProvider
        initialCenter={getPharmacyCoordinates(pharmacies[0]) ?? DEFAULT_COORDS}
        initialZoom={PHARMACY_MAP_OVERVIEW_ZOOM}
    >
        <div className="w-full lg:grid hidden grid-cols-[37%_63%] h-fit gap-4 rounded-[16px]">
            <div className="flex flex-col gap-6 bg-white-500 h-full lg:p-6 p-4 overflow-hidden rounded-[16px]">
                <p className="font-bold text-black-100 text-[40px] leading-[100%]">Адреса магазинов</p>
                <div className="w-full text-primary-gray flex bg-primary-light-white h-[48px] rounded-[16px] px-6 py-4 items-center gap-2">
                    <Image src={search} alt="search icon" width={24} height={24} priority />
                    <input
                        placeholder="Введите адрес магазина"
                        type="text"
                        value={searchText}
                        className="w-full outline-none bg-transparent text-black-100"
                        onChange={(e) => {
                            setSearchText(e.target.value);
                            setSelectedPharmacy(0);
                        }}
                    />
                </div>
                <div className="flex bg-primary-light-white rounded-[16px] max-h-[500px] overflow-hidden pl-1 p-2">
                    <div ref={scrollContainerRef}
                        className="flex w-full flex-col gap-y-4 overflow-y-auto custom-scroll px-2 bg-primary-light-white"
                    >
                        {pharmacies.map((item) => (
                            <PharmacyAddressListItem
                                key={item.id}
                                item={item}
                                scrollContainerRef={scrollContainerRef}
                                selectedPharmacy={selectedPharmacy}
                                setSelectedPharmacy={setSelectedPharmacy}
                            />
                        ))}
                        {!pharmacies.length && (
                            <div className="flex flex-col justify-center items-center h-full gap-2">
                                <p className="font-medium text-primary-red text-center text-balance">Аптек по указанному адресу не найдено.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-between rounded-[16px] h-[689px] bg-white-500 lg:p-6 p-4 overflow-hidden">

                    {!!pharmacies.length ? (
                        <YandexMapCanvas>
                            <PharmacyMapMarkersLayer
                                items={pharmacies}
                                getItemId={(item) => item.id}
                                getItemLabel={(item) => item.address}
                                selectedId={selectedPharmacy}
                                onSelect={setSelectedPharmacy}
                            />
                        </YandexMapCanvas>
                    ) : (
                        <div className="flex flex-col justify-center items-center h-full gap-2  pb-2">
                            <Image src={CatWithGlass} alt={"Cat image"}/>
                            <p className="font-medium text-primary-red">Аптек по указанному адресу не найдено.</p>
                        </div>
                    )}

                <div className="flex flex-col justify-center gap-2 rounded-[16px] h-[110px] bg-white-500 lg:p-6 py-4">
                    <p className="font-medium text-black-700 text-[18px] leading-[120%]">
                        Единый телефон справочной службы
                    </p>
                    <a href={"tel:"+PHONE_MAIN} className="font-bold text-[32px] leading-[100%] text-black-100 hover:underline whitespace-pre-line">{PHONE_MAIN}</a>
                </div>
            </div>
        </div>
    </YandexMapProvider>
);

const PharmacyAddresses = () => {
    const { data: stores, status } = useFetchPharmacyAddresses();
    const [selectedMapVersion, setSelectedMapVersion] = useState(1);
    const [selectedPharmacy, setSelectedPharmacy] = useState<number>(0);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [searchText, setSearchText] = useState<string>("");

    const filteredData = stores?.data?.filter((val) => {
        if (searchText?.length) {
            return val.address?.toLowerCase().includes(searchText.toLowerCase());
        }
        return true;
    });

    const pharmacies = filteredData ?? [];

    const selectedPharmacyItem = pharmacies.find((item) => item.id === selectedPharmacy);

    return (
        <>
            {status === "error" ? (
                // ToDo: Error message for PharmacyAddresses component */}
                <>ERROR</>
            ) : status === "pending" ? (
                <>
                    <div className="w-full lg:grid hidden grid-cols-[37%_63%] h-[823px] overflow-hidden gap-4">
                        <div className="w-full h-full rounded-[16px] bg-loading-skeleton animate-pulse" />
                        <div className="w-full h-full rounded-[16px] bg-loading-skeleton animate-pulse" />
                    </div>
                    <div className="w-full lg:hidden flex flex-col h-[823px] overflow-hidden gap-4">
                        <div className="w-full h-full rounded-[16px] bg-loading-skeleton animate-pulse" />
                        <div className="w-full h-full rounded-[16px] bg-loading-skeleton animate-pulse" />
                    </div>
                </>
            ) : (
                <>
                    <p className="lg:hidden block font-bold text-black-100 text-[32px] leading-[100%]">
                        Адреса магазинов
                    </p>
                    <div className="lg:hidden grid rounded-[16px] bg-white-500 grid-cols-2 p-1 gap-1 w-full">
                        <button
                            onClick={() => setSelectedMapVersion(1)}
                            className={`h-[44px] rounded-[16px] font-medium text-[14px] leading-[110%] ${
                                selectedMapVersion === 1
                                    ? "bg-primary-blue text-white-500"
                                    : "bg-white-500 text-black-500"
                            }`}
                        >
                            Список
                        </button>
                        <button
                            onClick={() => setSelectedMapVersion(2)}
                            className={`h-[44px] rounded-[16px] font-medium text-[14px] leading-[110%] ${
                                selectedMapVersion === 2
                                    ? "bg-primary-blue text-white-500"
                                    : "bg-white-500 text-black-500"
                            }`}
                        >
                            Карта
                        </button>
                    </div>

                    <div className="lg:hidden w-full text-primary-gray flex bg-white-500 h-[48px] rounded-[16px] px-6 py-4 items-center gap-2">
                        <Image src={search} alt="search icon" width={24} height={24} priority />
                        <input
                            placeholder="Введите адрес аптеки"
                            type="text"
                            value={searchText}
                            className="w-full outline-none bg-transparent text-black-100"
                            onChange={(e) => {
                                setSearchText(e.target.value);
                                setSelectedPharmacy(0);
                            }}
                        />
                    </div>

                    {selectedMapVersion === 1 && (
                        <div className="w-full lg:hidden flex flex-col gap-4 bg-white-500 rounded-[16px] p-2 overflow-y-auto max-h-[450px]">
                            {pharmacies.map((item) => (
                                <PharmacyAddressListItem
                                    key={item.id}
                                    item={item}
                                    scrollContainerRef={scrollContainerRef}
                                    selectedPharmacy={selectedPharmacy}
                                    setSelectedPharmacy={setSelectedPharmacy}
                                />
                            ))}
                            {!pharmacies.length && (
                                <div className="flex flex-col justify-center items-center h-full gap-2">
                                    <Image src={CatWithGlass} alt={"Cat image"}/>
                                    <p className="font-medium text-primary-red text-balance text-center">Аптек по указанному адресу не найдено.</p>
                                </div>
                            )}
                        </div>
                    )}

                    <PharmacyAddressesDesktop
                        pharmacies={pharmacies}
                        selectedPharmacy={selectedPharmacy}
                        setSelectedPharmacy={setSelectedPharmacy}
                        searchText={searchText}
                        setSearchText={setSearchText}
                        scrollContainerRef={scrollContainerRef}
                    />
                </>
            )}

            {/* Mobile screen - Map mode */}
            {status === "success" && selectedMapVersion === 2 && (
                <div className="flex flex-col lg:hidden w-full px-4">
                    <div className="w-full flex bg-white-500 rounded-[16px]">
                        {!!pharmacies.length ? (
                            <div className="w-full h-[301px] flex">
                                <PharmacyAddressesMap
                                    pharmacies={pharmacies}
                                    selectedPharmacy={selectedPharmacy}
                                    setSelectedPharmacy={setSelectedPharmacy}
                                    className="h-[301px]"
                                />
                            </div>
                        ) : (
                            <div className="flex flex-col justify-center items-center h-full w-full gap-2 mx-auto py-2">
                                <Image src={CatWithGlass} alt={"Cat image"}/>
                                <p className="font-medium text-primary-red text-center text-balance leading-[120%]">Аптек по указанному адресу не найдено.</p>
                            </div>
                        )}
                    </div>
                    {!!selectedPharmacyItem && (
                        <div className="w-full flex py-3">
                            <div className="w-full group cursor-pointer lg:border-none lg:p-6 p-4 flex flex-col lg:gap-6 gap-4 bg-white-500 rounded-[16px] ">
                                <div className="flex items-center justify-between gap-2">
                                    <p className="font-bold text-black-100 lg:text-[24px] text-[18px] lg:leading-[100%] leading-[120%]">
                                        {selectedPharmacyItem.address}
                                    </p>
                                </div>
                                <div className="flex flex-col gap-[6px] text-primary-gray leading-[120%] text-[16px]">
                                    <PharmacyInfo schedule={selectedPharmacyItem.schedule} phone={selectedPharmacyItem.phone} />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default PharmacyAddresses;
