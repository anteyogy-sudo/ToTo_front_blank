"use client";

import React, {useState} from 'react';
import { useFetchCollectionsQuery } from "@/features/collections/hooks/queries/useFetchCollectionsQuery";
// import { ChevronRight } from "lucide-react";
import {Carousel, CarouselApi, CarouselContent, CarouselItem} from "@/components/ui/carousel";
import {ListItems} from "@/components/ListItems";
//import Union from "@/assets/resources/collections/Union.svg"
//import Image from "next/image";
import {useIsomorphicLayoutEffect} from "@/hooks/useIsomorphicLayoutEffect";
//import Link from "next/link";
//import {imagePath} from "@/utils/image-path";
import {CollectionsLoadingSkeleton} from "./CollectionsLoadingSkeleton";

const Collections = () => {
    const { data: collections, status } = useFetchCollectionsQuery();
    const [api, setApi] = useState<CarouselApi | null>(null);
    const [selectedIndex, setSelectedIndex] = useState<number>(0);

    useIsomorphicLayoutEffect(() => {
        if (!api) return;

        const onSelect = () => {
            const index = api.selectedScrollSnap();
            setSelectedIndex(index);
        };

        api.on("select", onSelect);

        onSelect();

        return () => {
            api.off("select", onSelect);
        };
    }, [api]);

    if (status === "error") return null;

    return (
        <div className='max-w-base w-full flex flex-col mx-auto gap-4 3xl:px-0 1144:px-10 px-6 pr-0'>
            <div className='flex lg:flex-row flex-col justify-between lg:items-center'>
                <p className='font-bold lg:text-[36px] text-[24px] text-black-100'>Подборки</p>
            </div>

            {status === "pending" && (
                <CollectionsLoadingSkeleton />
            )}
            {status === "success" && (
                <>
                <div className="1144:grid hidden gap-2 grid-cols-3 grid-rows-2 h-[850px]">
                    { collections.map((collection) => {
                            let columnSpanCount, rowSpanCount = 0;
                            columnSpanCount = collection.position.column.end - collection.position.column.start;
                            rowSpanCount = collection.position.row.end - collection.position.row.start;
                            let textPadding = 24, mWidth = 345;
                            if (columnSpanCount-1 !== 0) {
                                textPadding *= (columnSpanCount-1) * 2.6;
                                mWidth *= (columnSpanCount-1) * 1.23;
                            } else if (rowSpanCount-1 !== 0) {
                                mWidth *= (rowSpanCount-1) * 1.23;
                            }
                            return (
                                <div
                                    key={collection?.id}
                                    className="grid relative rounded-[16px] bg-white-500 pt-6 overflow-hidden hover:scale-[101%] transition-transform"
                                    style={{
                                        gridColumnStart: collection?.position.column.start,
                                        gridColumnEnd: collection?.position.column.end,
                                        gridRowStart: collection?.position.row.start,
                                        gridRowEnd: collection?.position.row.end,
                                    }}
                                >
                                    <div className="flex flex-col h-full z-10 gap-4" style={{ paddingLeft: `${textPadding}px`, maxWidth: `${mWidth}px`}}>
                                        <p className="font-bold leading-[100%] text-primary-blue text-[24px] md:text-[30px] lg:text-[40px]">{collection?.title}</p>
                                        <p className="font-medium text-[16px] text-primary-gray leading-[120%]">{collection?.description}</p>
                                    </div>
                                    <img
                                        src={collection.image}
                                        alt='img'
                                        draggable={false}
                                        className='absolute z-1 bottom-0 w-full h-full object-cover select-none'
                                    />
                                </div>
                            );
                        })}
                </div>

                <Carousel className=" 1144:hidden" opts={{ align: "start" }}>
                    <CarouselContent className=" h-full">
                        <ListItems
                            items={collections}
                            render={(item) => (
                                <CarouselItem
                                    key={item.id}
                                    className=" min-w-[256px] max-w-[256px] min-h-full pr-[16px]"
                                >
                                    <div className='w-full h-[336px] rounded-[16px] bg-white-500  relative overflow-hidden hover:scale-[101%] transition-transform'>
                                        <div className='flex flex-col gap-4 p-6 absolute z-10'>
                                            <p className='font-bold text-[24px] leading-[100%] text-primary-blue'>{item.title}</p>
                                            <p className='font-medium text-[16px] text-primary-gray leading-[120%]'>{item.description}</p>
                                        </div>
                                        <img
                                            src={item.image}
                                            alt='img'
                                            draggable={false}
                                            className='absolute z-1 bottom-0 w-full h-full object-cover'
                                        />
                                    </div>
                                </CarouselItem>
                            )}
                        />
                    </CarouselContent>
                </Carousel>
                </>
            )}
        </div>
    );
};

export default Collections;