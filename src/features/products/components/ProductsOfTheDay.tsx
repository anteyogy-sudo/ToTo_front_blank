"use client";

import { ListItems } from "@/components/ListItems";
import {
    Carousel, CarouselApi,
    CarouselContent,
    CarouselItem, CarouselNext, CarouselPrevious,
} from "@/components/ui/carousel";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { createArray } from "@/utils/create-array";
import {ArrowRight, ChevronRight} from "lucide-react";
import Link from "next/link";
import { ProductCard } from "./ProductCard";
import React, {useState} from "react";
import {useIsomorphicLayoutEffect} from "@/hooks/useIsomorphicLayoutEffect";
import {useFetchGoodDaysIdsQuery} from "@/features/products/hooks/queries/useFetchGoodDaysIdsQuery";
import {useWindowDimension} from "@/hooks/useWindowDimension";

export const ProductsOfTheDay = () => {
    const { status, data: products } = useFetchGoodDaysIdsQuery();
    const [api, setApi] = useState<CarouselApi | null>(null);
    const [selectedIndex, setSelectedIndex] = useState<number>(0);

    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

    const { width } = useWindowDimension();

    useIsomorphicLayoutEffect(() => {
        if (!api) return;

        const update = () => {
            setScrollSnaps(api.scrollSnapList());
            setSelectedIndex(api.selectedScrollSnap());
        };

        api.on("select", update);
        api.on("reInit", update);

        update();

        return () => {
            api.off("select", update);
            api.off("reInit", update);
        };
    }, [api]);

    const SCROLL_COUNT = (!width || width < 768) ? 1 : (width < 1024 ? 2 : 3);

    if (status === "error" || (status === "success" && !products?.data?.length)) {
        console.error("ProductsOfTheDay: ERROR");
        return;
    }

    return (
        <div className="3xl:max-w-base 3xl:px-0 mx-auto flex flex-col pl-5
                        2xl:max-w-[1435px] 2xl:px-[40px]
                        xl:max-w-[1280px]"
        >
            <div className=" w-full flex justify-between gap-y-[8px] 2xl:pr-0 pr-6 items-center">
                <Link href='/goods-day'
                      className=" md:w-fit w-full flex items-center md:justify-start gap-4 font-bold lg:text-[36px] text-[24px] text-black-100 hover:scale-x-[103%] hover:text-primary-blue transition duration-300">
                    <p className="leading-[100%]">Товары дня</p>
                    { status === "pending" ? (
                            <LoadingSpinner className="text-primary-gray" size={32} />
                        ) : (
                            <p className="text-primary-gray leading-[100%]">{products?.data.length || null}</p>
                        )
                    }
                </Link>
                <Link href="/goods-day" className=" w-fit h-fit">
                    <button className="sm:flex hidden w-[159px] h-[36px] items-center gap-3 justify-center rounded-[200px] bg-white-500 text-primary-gray font-medium text-[16px] leading-[120%] hover:text-primary-blue transition-colors duration-300">
                        Смотреть все
                        <ChevronRight />
                    </button>
                    <button className='sm:hidden flex w-[44px] h-[44px] bg-blue-light rounded-[100%] items-center justify-center'>
                        <ArrowRight className='text-primary-gray'/>
                    </button>
                </Link>
            </div>

            <Carousel setApi={setApi} opts={{ align: "start", containScroll: "trimSnaps", slidesToScroll: SCROLL_COUNT}}>
                <div className='flex flex-row items-center'>
                    <CarouselPrevious className='absolute top-1/2 -translate-y-1/2 left-2 3xl:-left-2 3xl:-translate-x-full'/>
                    <CarouselContent className="gap-[16px] sm:gap-[20px] 2xl:gap-[34px] py-4">
                        {status === "pending" ? (
                            <ListItems items={createArray(10)} render={(item) => (
                                <CarouselItem key={item}
                                              className="bg-loading-skeleton animate-pulse p-0 rounded-2xl ml-5
                                              3xl:min-w-[260px] 3xl:max-w-[260px]
                                              xl:min-w-[210px] xl:max-w-[210px]
                                              min-w-[240px] max-w-[240px] min-h-[370px]"
                                ></CarouselItem>
                            )}/>
                        ) : (
                            products.data.slice(1,16).map((good) => {
                                return (
                                    <CarouselItem key={good.id} className="3xl:w-[260px] 2xl:w-[240px] w-[233px] shrink-0 last:mr-0 hover:scale-[102%] duration-500 transition-transform">
                                        <ProductCard product={good} />
                                    </CarouselItem>
                                );
                            })
                        )}
                    </CarouselContent>
                    <CarouselNext className="absolute top-1/2 -translate-y-1/2 right-2 3xl:-right-2 3xl:translate-x-full"/>
                </div>
                <div className="flex justify-center mt-[14px]">
                    <div className='flex gap-2 hover:scale-[105%] transition-transform duration-500'>
                        {scrollSnaps.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => api?.scrollTo(index)}
                                className={`w-[8px] h-[8px] rounded-full transition-colors duration-500 ${
                                    selectedIndex === index
                                        ? "active-pagination"
                                        : "disabled-pagination"
                                }`}
                            />
                        ))}
                    </div>
                </div>
            </Carousel>
        </div>
    );
};
