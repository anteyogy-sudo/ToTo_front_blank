"use client";

import React, { useMemo, useRef, useState } from "react";
import Image from "next/image";
import search from "@/assets/icons/search.svg";
import PharmacyListItem from "@/features/product/components/PharmacyListItem";
import { StockProps } from "@/types/stock.types";
import { ProductProps } from "@/types/product.types";
import { Checkbox } from "@/components/ui/checkbox";
// import PharmacyCardListItem from "@/features/product/components/PharmacyCardListItem";
import { DEFAULT_COORDS } from "@/constants/global.constants";
import { YandexMapRoot, YandexMapProvider } from "@/features/map/components/YandexMapRoot";
import { YandexMapCanvas } from "@/features/map/components/YandexMapCanvas";
import { PharmacyMapMarkersLayer } from "@/features/map/components/PharmacyMapMarkersLayer";
import { getPharmacyCoordinates } from "@/features/map/utils/getPharmacyCoordinates";
import { PHARMACY_MAP_OVERVIEW_ZOOM } from "@/features/map/constants";

interface ProductMapProps {
    stock: StockProps[];
    productId: string;
    selectedPharmacy: number;
    setSelectedPharmacy: React.Dispatch<React.SetStateAction<number>>;
    price: number;
    product: ProductProps;
}

const ProductPharmacyMap = ({
    stock,
    selectedPharmacy,
    setSelectedPharmacy,
    className,
}: {
    stock: StockProps[];
    selectedPharmacy: number;
    setSelectedPharmacy: React.Dispatch<React.SetStateAction<number>>;
    className?: string;
}) => {
    const initialCenter = useMemo(
        () => getPharmacyCoordinates(stock[0]) ?? DEFAULT_COORDS,
        [stock]
    );

    return (
        <YandexMapRoot initialCenter={initialCenter} initialZoom={PHARMACY_MAP_OVERVIEW_ZOOM} className={className}>
            <PharmacyMapMarkersLayer
                items={stock}
                getItemId={(item) => item.id}
                getItemLabel={(item) => item.address}
                selectedId={selectedPharmacy}
                onSelect={setSelectedPharmacy}
            />
        </YandexMapRoot>
    );
};

const ProductMap: React.FC<ProductMapProps> = ({
    product,
    stock,
    productId,
    selectedPharmacy,
    setSelectedPharmacy,
    price,
}) => {
    const [selectedMapVersion, setSelectedMapVersion] = useState(1);
    const scrollContainerRef = useRef<HTMLDivElement | null>(null);
    const [searchText, setSearchText] = useState<string>("");
    const [filterPharmacy, setFilterPharmacy] = useState({ allDay: false, haveStock: false });

    if (!stock) {
        return;
    }
    const filteredData = stock.filter((val) => {
        const matchesSearch = searchText.length
            ? val.address.toLowerCase().includes(searchText.toLowerCase())
            : true;

        const matchesFullTime = filterPharmacy.allDay ? val.fullTime : true;

        const matchesStock = filterPharmacy.haveStock ? (val.quantity_in_stock ?? 0) > 0 : true;

        return matchesSearch && matchesFullTime && matchesStock;
    });

    console.log("filteredData: ",filteredData);

    return (
        <>
            <div
                id="product-map"
                className="w-full lg:py-10 py-6 2xl:px-20 lg:px-10 px-6 flex flex-col lg:gap-10 gap-6"
            >
                <h2 className="font-bold text-black-100 leading-[100%] lg:text-[40px] text-[24px]">
                    Наличие и цены на {product.name} в аптеках
                </h2>

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

                <div className="lg:hidden flex items-center gap-[21px]">
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
                    <div className="flex items-center gap-[7px]">
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

                <div className="flex lg:hidden w-full text-primary-gray bg-white-500 h-[48px] rounded-[16px] px-6 py-4 items-center gap-4">
                    <Image src={search} alt="search icon" width={24} height={24} priority />
                    <input
                        placeholder="Введите адрес аптеки"
                        type="text"
                        className="w-full outline-none bg-transparent text-black-100"
                        value={searchText}
                        onChange={(e) => {
                            setSearchText(e.target.value);
                            setSelectedPharmacy(0);
                        }}
                    />
                </div>

                {selectedMapVersion === 1 && (
                    <div id="product-map" className="w-full lg:hidden block bg-white-500 rounded-[16px] p-4">
                        {filteredData?.map((item) => (
                            <PharmacyListItem
                                key={item.id}
                                productId={productId}
                                item={item}
                                selectedPharmacy={selectedPharmacy}
                                setSelectedPharmacy={setSelectedPharmacy}
                                scrollContainerRef={scrollContainerRef}
                                price={price}
                            />
                        ))}

                        {!filteredData.length && (
                            <p className="font-medium text-primary-red">asdsaАптек не найдено.</p>
                        )}
                    </div>
                )}

                <div className="lg:flex items-center hidden w-full bg-white-500 h-[84px] py-[15px] px-6">
                    <div className="flex items-center gap-[19px] w-full">
                        <div className="max-w-[613px] w-full text-primary-gray flex bg-primary-light-white h-full rounded-[16px] px-6 py-2 items-center gap-2">
                            <Image src={search} alt="search icon" width={24} height={24} priority />
                            <input
                                placeholder="Введите адрес аптеки"
                                type="text"
                                className="w-full outline-none bg-transparent text-black-100"
                                value={searchText}
                                onChange={(e) => {
                                    setSearchText(e.target.value);
                                    setSelectedPharmacy(0);
                                }}
                            />
                        </div>

                        <div className="flex items-center gap-[18px]">
                            <div className="flex items-center gap-[7px]">
                                <Checkbox
                                    id="allDayDesktop"
                                    checked={filterPharmacy.allDay}
                                    onCheckedChange={() =>
                                        setFilterPharmacy({
                                            ...filterPharmacy,
                                            allDay: !filterPharmacy.allDay,
                                        })
                                    }
                                />
                                <label htmlFor="allDayDesktop" className="cursor-pointer selected-none">
                                    Круглосуточно
                                </label>
                            </div>
                            <div className="flex items-center min-w-[137px] gap-[7px]">
                                <Checkbox
                                    id="haveStockDesktop"
                                    checked={filterPharmacy.haveStock}
                                    onCheckedChange={() =>
                                        setFilterPharmacy({
                                            ...filterPharmacy,
                                            haveStock: !filterPharmacy.haveStock,
                                        })
                                    }
                                />
                                <label htmlFor="haveStockDesktop" className="cursor-pointer selected-none">
                                    Все в наличии
                                </label>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="min-w-[205px] border border-[#CCCCCC] rounded-[24px] h-[49px] p-[3px] flex">
                            <button
                                onClick={() => setSelectedMapVersion(1)}
                                className={`${
                                    selectedMapVersion === 1
                                        ? "bg-primary-blue text-white-500"
                                        : "bg-white-500 text-ink"
                                } rounded-[24px] px-6 h-[43px] font-bold text-[18px] leading-[120%]`}
                            >
                                Картой
                            </button>

                            <button
                                onClick={() => setSelectedMapVersion(2)}
                                className={`${
                                    selectedMapVersion === 2
                                        ? "bg-primary-blue text-white-500"
                                        : "bg-white-500 text-ink"
                                } rounded-[24px] px-6 h-[43px] font-bold text-[18px] leading-[120%]`}
                            >
                                Списком
                            </button>
                        </div>
                    </div>
                </div>

                {selectedMapVersion === 1 ? (
                    <YandexMapProvider
                        initialCenter={getPharmacyCoordinates(filteredData[0]) ?? DEFAULT_COORDS}
                        initialZoom={PHARMACY_MAP_OVERVIEW_ZOOM}
                    >
                        <div className="w-full lg:grid hidden grid-cols-[37%_63%] h-[648px] overflow-hidden gap-4">
                            <div className="rounded-[16px] flex flex-col gap-6 bg-white-500 h-full lg:p-6 p-4 overflow-hidden">
                                <div
                                    ref={scrollContainerRef}
                                    className="flex flex-col gap-y-4 overflow-y-auto custom-scroll h-[600px] pr-4"
                                >
                                    {filteredData?.map((item) => (
                                        <PharmacyListItem
                                            key={item.id}
                                            item={item}
                                            productId={productId}
                                            selectedPharmacy={selectedPharmacy}
                                            setSelectedPharmacy={setSelectedPharmacy}
                                            scrollContainerRef={scrollContainerRef}
                                            price={price}
                                        />
                                    ))}
                                    {!filteredData.length && (
                                        <p className="font-medium text-primary-red">Аптек не найдено12321</p>
                                    )}
                                </div>
                            </div>
                            <div className="rounded-[16px] bg-white-500 h-full lg:p-6 p-4">
                                <div className="w-full h-full rounded-[16px] overflow-hidden">
                                    {!!filteredData.length && (
                                        <YandexMapCanvas>
                                            <PharmacyMapMarkersLayer
                                                items={filteredData}
                                                getItemId={(item) => item.id}
                                                getItemLabel={(item) => item.address}
                                                selectedId={selectedPharmacy}
                                                onSelect={setSelectedPharmacy}
                                            />
                                        </YandexMapCanvas>
                                    )}
                                </div>
                            </div>
                        </div>
                    </YandexMapProvider>
                ) : (
                    <div className="w-full lg:flex hidden flex-col gap-2">
                        {/* ToDo: Pharmacy Card List Item */}
                        {/*{stock.map((item) => (*/}
                        {/*    <PharmacyCardListItem*/}
                        {/*        product={product}*/}
                        {/*        key={item.pharmacy_id}*/}
                        {/*        item={item}*/}
                        {/*    />*/}
                        {/*))}*/}
                    </div>
                )}
            </div>

            {selectedMapVersion === 2 && (
                <>
                    <div className="w-full h-[301px] lg:hidden block bg-white-500 rounded-[16px] px-4">
                        {!!filteredData.length && (
                            <ProductPharmacyMap
                                stock={filteredData}
                                selectedPharmacy={selectedPharmacy}
                                setSelectedPharmacy={setSelectedPharmacy}
                                className="h-[301px]"
                            />
                        )}
                    </div>
                    <div className="w-full h-[322px] lg:hidden block p-4">
                        {filteredData?.map((item) => {
                            if (item.id !== selectedPharmacy) {
                                return null;
                            }
                            return (
                                <PharmacyListItem
                                    key={item.id}
                                    productId={productId}
                                    item={item}
                                    selectedPharmacy={selectedPharmacy}
                                    setSelectedPharmacy={setSelectedPharmacy}
                                    scrollContainerRef={scrollContainerRef}
                                    price={price}
                                />
                            );
                        })}
                    </div>
                </>
            )}
        </>
    );
};

export default ProductMap;
