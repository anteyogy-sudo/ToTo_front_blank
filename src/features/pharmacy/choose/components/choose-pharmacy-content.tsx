"use client";

import { Button } from "@/components/ui/button";
import React, { Dispatch, SetStateAction, useCallback, useState } from "react";
import { useFetchPharmaciesStocksQuery } from "../../../cart/hooks/useFetchPharmaciesStocksQuery";
import { PharmacyStockProps } from "@/types/pharmacy.types";
import { PharmaciesList } from "./pharmacies-list";
import { ChoosePharmacyMapLayout } from "./choose-pharmacy-map-layout";
import Image from "next/image";
import search from "@/assets/icons/search.svg";
import { Checkbox } from "@/components/ui/checkbox";
import PharmacyCardModeList from "@/features/pharmacy/choose/components/PharmacyCardModeList";
import { usePharmacyStore } from "@/stores/usePharmacyStore";
import { isPharmacyFullyInStock } from "../utils/pharmacy-stock.utils";
import CatWithGlass from "@/assets/resources/CatWithGlass.png";
import NoMap from "@/assets/resources/NoSearch.svg";
import {ChooseOnePharmacyDialog} from "@/features/pharmacy/choose/components/ChooseOnePharmacyDialog";

interface Props {
    selectedMode: "list" | "map";
    setSelectedMode: Dispatch<SetStateAction<"list" | "map">>;
}

export const ChoosePharmacyContent = ({ selectedMode, setSelectedMode }: Props) => {
    const { data, status } = useFetchPharmaciesStocksQuery();
    const { setSelectedPharmacy } = usePharmacyStore();
    const [filterPharmacy, setFilterPharmacy] = useState({ allDay: false, haveStock: false });
    const [searchText, setSearchText] = useState<string>("");

    const bestPricePharmacyId = data?.[0]?.id;

    const filteredData =
        data?.filter((pharmacy) => {
            const matchesSearch = searchText.length
                ? pharmacy.address.toLowerCase().includes(searchText.toLowerCase())
                : true;

            const matchesFullTime = filterPharmacy.allDay ? pharmacy.fullTime : true;

            const matchesStock = filterPharmacy.haveStock ? isPharmacyFullyInStock(pharmacy) : true;

            return matchesSearch && matchesFullTime && matchesStock;
        }) ?? [];

    const onSelectPharmacy = useCallback(
        (pharmacy: PharmacyStockProps) => {
            if (
                Number.isFinite(pharmacy.location.longitude) &&
                Number.isFinite(pharmacy.location.latitude)
            ) {
                setSelectedPharmacy(pharmacy);
            } else {
                console.warn("Invalid coordinates:", pharmacy);
            }
        },
        [setSelectedPharmacy]
    );

    const mapPanel =
        status === "pending" ? (
            <div className="w-full h-full min-h-[263px] lg:min-h-0 bg-loading-skeleton animate-pulse rounded-2xl" />
        ) : status === "error" ? (
            <p>Error</p>
        ) : (
            <ChoosePharmacyMapLayout
                pharmacies={filteredData}
                status={status}
                bestPricePharmacyId={bestPricePharmacyId}
            />
        );

    return (
        <div className="h-full w-full overflow-hidden flex flex-col lg:gap-[10px] gap-[8px] p-3">
            <div className=" lg:flex w-full bg-white-500  h-[78px] rounded-[16px]  items-center hidden">
                <div className="flex items-center h-[78px] lg:px-[12px] px-[3px] gap-[14px] w-full">
                    <div className="max-w-[562px] w-full max-h-[48px] text-primary-gray flex bg-primary-light-white h-full rounded-[16px] px-2  items-center gap-2">
                        <Image src={search} alt="search icon" width={24} height={24} priority />
                        <input
                            placeholder="Введите адрес аптеки"
                            type="text"
                            className="w-full outline-none bg-transparent text-black-100"
                            onChange={(e) => {
                                setSearchText(e.target.value);
                            }}
                        />
                    </div>

                    <div className="flex items-center gap-[18px]">
                        <div className="flex items-center gap-[7px]">
                            <Checkbox
                                id="allDay"
                                checked={filterPharmacy.allDay}
                                onCheckedChange={() =>
                                    setFilterPharmacy({ ...filterPharmacy, allDay: !filterPharmacy.allDay })
                                }
                            />
                            <label htmlFor="allDay" className="cursor-pointer selected-none">
                                Круглосуточно
                            </label>
                        </div>
                        <div className="flex min-w-[140px] items-center gap-[7px]">
                            <Checkbox
                                id="haveStock"
                                checked={filterPharmacy.haveStock}
                                onCheckedChange={() =>
                                    setFilterPharmacy({
                                        ...filterPharmacy,
                                        haveStock: !filterPharmacy.haveStock,
                                    })
                                }
                            />
                            <label htmlFor="haveStock" className="cursor-pointer selected-none">
                                Все в наличии
                            </label>
                        </div>
                    </div>
                </div>

                <div className="w-[217px] h-[49px] p-[3px] rounded-[24px] border border-gray-3 flex mr-5">
                    <Button
                        onClick={() => setSelectedMode("map")}
                        className={`${selectedMode === "map" ? "bg-primary-blue text-white-500 " : "bg-white-500 text-ink"} 
                                shadow-none rounded-[24px] px-5 h-[43px] font-bold text-[18px] leading-[120%] hover:scale-[100%] transition-none`}
                    >
                        Картой
                    </Button>
                    <Button
                        onClick={() => setSelectedMode("list")}
                        className={`${selectedMode === "list" ? "bg-primary-blue text-white-500 " : "bg-white-500 text-ink"} 
                                shadow-none rounded-[24px] px-5 h-[43px] font-bold text-[18px] leading-[120%] hover:scale-[100%] transition-none`}
                    >
                        Списком
                    </Button>
                </div>
            </div>

            <div className="w-full min-h-fit lg:hidden grid grid-cols-2  max-lg:bg-white-500 lg:p-0 py-[6px] px-[8px] border-[#F7F7F7] rounded-[32px]">
                <Button
                    onClick={() => setSelectedMode("map")}
                    className="h-[44px] w-full rounded-[24px]"
                    variant={selectedMode === "map" ? "default" : "ghost"}
                >
                    Карта
                </Button>
                <Button
                    onClick={() => setSelectedMode("list")}
                    className="h-[44px] w-full rounded-[24px]"
                    variant={selectedMode === "list" ? "default" : "ghost"}
                >
                    Список
                </Button>
            </div>
            <div className="w-full lg:hidden lg:p-0 px-6 p-1 flex justify-center flex-wrap items-center gap-[12px]">
                <div className="flex items-center gap-2">
                    <Checkbox
                        id="allDayMobile"
                        checked={filterPharmacy.allDay}
                        onCheckedChange={() =>
                            setFilterPharmacy({ ...filterPharmacy, allDay: !filterPharmacy.allDay })
                        }
                    />
                    <label htmlFor="allDayMobile" className="text-[15px] cursor-pointer selected-none">
                        Круглосуточно
                    </label>
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox
                        id="haveStockMobile"
                        checked={filterPharmacy.haveStock}
                        onCheckedChange={() =>
                            setFilterPharmacy({
                                ...filterPharmacy,
                                haveStock: !filterPharmacy.haveStock,
                            })
                        }
                    />
                    <label htmlFor="haveStockMobile" className="text-[15px] cursor-pointer selected-none">
                        Все в наличии
                    </label>
                </div>
            </div>

            <div className="lg:hidden flex w-full max-h-[48px] text-primary-gray bg-white-500 py-6 h-full rounded-[16px] px-6  items-center gap-2">
                <Image src={search} alt="search icon" width={24} height={24} priority />
                <input
                    placeholder="Введите адрес аптеки"
                    type="text"
                    className="w-full outline-none bg-transparent text-black-100"
                    onChange={(e) => {
                        setSearchText(e.target.value);
                    }}
                />
            </div>

            { status === "pending" ? (
                <div className="flex flex-col h-full w-full justify-center items-center  ">
                    <Image src={CatWithGlass} alt="Searching pharmacies, please wait"/>
                    <span className="font-medium text-primary-blue">Аптеки <b>загружаются</b>, подождите...</span>
                </div>
            ) : (
                <>
                    { filteredData.length !== 0 ? (
                        <>
                            {selectedMode === "map" && mapPanel}

                            {selectedMode === "list" && (
                                <>
                                    <PharmacyCardModeList
                                        pharmacies={filteredData}
                                        onSelectPharmacy={onSelectPharmacy}
                                        bestPricePharmacyId={bestPricePharmacyId}
                                    />
                                    <div className="flex lg:hidden w-full overflow-hidden">
                                        <PharmaciesList
                                            pharmacies={filteredData}
                                            status={status}
                                            onSelectPharmacy={onSelectPharmacy}
                                            bestPricePharmacyId={bestPricePharmacyId}
                                        />
                                    </div>
                                </>
                            )}
                        </>
                    ) : (
                        <div className="flex flex-col h-full w-full justify-center items-center  ">
                            <Image src={NoMap} alt="No items for map"/>
                            <span className="font-medium text-primary-blue">Аптек <b>не найдено</b></span>
                        </div>
                    )}
                </>
            )}

            <ChooseOnePharmacyDialog pharmacies={filteredData} />
        </div>
    );
};
