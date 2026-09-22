"use client";

import { ListItems } from "@/components/ListItems";
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import Image from "next/image";
import { useRef, useState } from "react";
import { useFetchBannersQuery } from "../hooks/queries/useFetchBannersQuery";
//import { BannerLoadingSkeleton } from "./BannerLoadingSkeleton";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {BannerProps} from "@/types/banner.types";
import {useRouter} from "next/navigation";


export const BannerCarousel = () => {
    const { data, status, error } = useFetchBannersQuery();
    const [api, setApi] = useState<CarouselApi | null>(null);
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const [isPaused, setIsPaused] = useState<boolean>(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useIsomorphicLayoutEffect(() => {
        if (status === "error") return;
        if (!data || !api || data.length === 0) return;

        const updateSelected = () => {
            setSelectedIndex(api.selectedScrollSnap());
        };

        api.on("select", updateSelected);
        updateSelected();

        return () => {
            api.off("select", updateSelected);
        };
    }, [api, data]);

    useIsomorphicLayoutEffect(() => {
        if (status === "error") return;
        if (!data || !api || data.length === 0 || isPaused) return;

        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(() => {
            const nextIndex = (selectedIndex + 1) % data.length;
            api.scrollTo(nextIndex);
        }, 5000);

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [selectedIndex, data, api, isPaused]);

    if (status === "error") throw {
        name: error,
        title: "Не удалось получить изображения баннеров",
        message: "Проверьте подключение к интернету или повторите попытку позже."
    };

    if (status === "success" && data?.length === 0) throw {
        name: "data.length === 0",
        title: "Нет доступных баннеров",
        message: "Приносим свои извинения, повторите попытку позже.",
    };


    // Клик по баннеру === перевести
    const router = useRouter();
    const handleBannerClick = (banner: BannerProps) => {
        if (banner.targetUrl) {
            window.location.assign(banner.targetUrl);
        } else if (banner.goodId) {
            return router.push("/product/" + banner.goodId);
        } else if (banner.products && !banner.promotion) {
            if (banner.products.length === 1) {
                return router.push("/product/" + banner.products[0]);
            } else {
                return router.push("/banner/" + banner.id);
            }
        } else if (banner.promotion && !banner.products) {
            if (banner?.promotion.products.length === 1) {
                return router.push("/product/" + banner.promotion.products[0]);
            } else {
                return router.push("/promotion/" + banner.promotion.id);
            }
        } else if (banner.promotion && banner.products) {
            return router.push("/banner/" + banner.id);
        }
        else {
            console.error("Can't find action for ", banner.id, " banner.");
            console.log(banner);
        }
    }

    return (
        <div className="w-full relative rounded-2xl">
            {status === "pending" && (
                <div className=" w-full 1144:h-[440px] md:h-[380px] h-[240px] 1144:aspect-auto aspect-[253/100] rounded-2xl relative shadow-sm bg-loading-skeleton animate-pulse mb-8" />
            )}
            {status === "success" && (
                <Carousel
                    setApi={setApi}
                    opts={{
                        loop: true,
                        align: "start",
                        dragFree: false,
                        watchDrag: false,
                    }}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    <div className='px-[10px] 1144:px-[0px] rounded-2xl '>
                        <CarouselContent>
                            <ListItems
                                items={data}
                                render={(item) => (
                                    <CarouselItem key={item.id}
                                                  onClick={() => handleBannerClick(item)}
                                                  className='relative basis-full 1144:w-fit 1144:h-[440px] 1144:aspect-auto aspect-[253/100] gap-10 rounded-2xl overflow-hidden shadow-sm select-none items-center justify-center'>
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill priority
                                            className="w-full rounded-2xl 1144:object-fill hover:scale-[102%] transition-transform cursor-pointer duration-500"
                                            draggable={false}

                                        />
                                    </CarouselItem>
                                )}
                            />
                        </CarouselContent>
                    </div>

                    {/* Left Arrow */}
                    <div className="absolute xs:block hidden top-1/2 left-4 transform -translate-y-1/2 z-10 duration-300">
                        <button
                            onClick={() => api?.scrollPrev()}
                            className="absolute xs:flex hidden top-1/2 -translate-y-1/2 rounded-full shadow
                            w-[40px] 1144:w-[60px] h-[40px] 1144:h-[60px]
                            right-4 left-[-20px] 1144:left-[-35px] 2xl:left-[-50px]
                            bg-white-500 items-center justify-center z-10 hover:scale-[105%] transition-transform duration-500"
                        >
                            <ChevronLeft size={28} />
                        </button>
                    </div>

                    <button
                        onClick={() => api?.scrollNext()}
                        className="absolute xs:flex hidden top-1/2 -translate-y-1/2 bg-white-500 shadow
                        w-[40px] 1144:w-[60px] h-[40px] 1144:h-[60px]
                        -right-[10px] 1144:-right-[25px] 2xl:-right-[25px]
                        items-center justify-center rounded-full hover:scale-[105%] duration-500 transition-transform z-10"
                    >
                        <ChevronRight size={28} />
                    </button>

                    <div className="flex justify-center xs:mt-6 mt-4 gap-2 scale-[102%] transition-transform duration-500">
                        {data.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => api?.scrollTo(index)}
                                className={`w-2 h-2 rounded-full scale-[105%] transition-colors duration-500 ${
                                    selectedIndex === index ? "active-pagination" : "disabled-pagination"
                                }`}
                            />
                        ))}
                    </div>
                </Carousel>
            )}
        </div>
    );
};
