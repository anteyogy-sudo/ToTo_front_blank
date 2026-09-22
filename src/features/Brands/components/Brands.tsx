"use client";

import React, {useState} from "react";
import { useFetchBrandsQuery } from "@/features/Brands/hooks/queries/useFetchBrandsQuery";
import {
    Carousel, CarouselApi,
    CarouselContent,
    CarouselItem, CarouselNext, CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import {ChevronRight, ArrowRight} from "lucide-react";
import {useIsomorphicLayoutEffect} from "@/hooks/useIsomorphicLayoutEffect";
import ImageWithFallback from "@/utils/ImageWithFallBack";

const Brands = () => {
    const { data, status } = useFetchBrandsQuery();

    const [api, setApi] = useState<CarouselApi | null>(null);
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const [snapCount, setSnapCount] = useState<number>(0);

    useIsomorphicLayoutEffect(() => {
        if (!api) return;

        setSnapCount(api.scrollSnapList().length);

        const onSelect = () => {
            setSelectedIndex(api.selectedScrollSnap());
        };

        api.on("select", onSelect);
        onSelect();
        return () => {
            api.off("select", onSelect);
        };
    }, [api]);

  if (status === "error") return null;

  return (
    <div className="3xl:max-w-base 3xl:px-0 mx-auto flex flex-col pl-5 2xl:max-w-[1435px] 2xl:px-[40px] xl:max-w-[1280px]">
      <div className=" w-full flex gap-2 md:flex-row md:justify-between py-[16px] items-center">
        <Link href={'/brands'} className="w-full flex items-center gap-3 font-bold md:w-fit md:justify-start lg:gap-4 text-black-100 hover:scale-x-[103%] hover:text-primary-blue transition duration-300">
          <span className="lg:text-[36px] text-[24px]">
            Бренды
          </span>
          <span className="text-primary-gray leading-[100%] lg:text-[32px] text-[24px]">
            {status === "pending" ? <LoadingSpinner className="text-primary-gray" /> : data?.length || null}
          </span>
        </Link>

        <Link href="/brands">
          <button className="1144:flex hidden w-[159px] h-[36px] items-center gap-3 justify-center rounded-[200px] bg-white-500
                  text-primary-gray font-medium text-[16px] leading-[120%] hover:text-primary-blue transition-colors duration-300">
            Смотреть все
            <ChevronRight />
          </button>
            <button className='1144:hidden flex w-[44px] h-[44px] bg-blue-light rounded-[100%] items-center justify-center'>
                <ArrowRight className='text-primary-gray'/>
            </button>
        </Link>
      </div>

      { status === "pending" ? (
          <div className='flex flex-col gap-2' >
              <div className='h-[120px] grid grid-cols-5 gap-2'>
                  <div className='rounded-[16px] p-6 shadow-sm bg-loading-skeleton animate-pulse' />
                  <div className='rounded-[16px] p-6 shadow-sm bg-loading-skeleton animate-pulse' />
                  <div className='rounded-[16px] p-6 shadow-sm bg-loading-skeleton animate-pulse' />
                  <div className='rounded-[16px] p-6 shadow-sm bg-loading-skeleton animate-pulse' />
                  <div className='rounded-[16px] p-6 shadow-sm bg-loading-skeleton animate-pulse' />
              </div>
          </div>
      ) : (
          <Carousel setApi={setApi} opts={{ align: "start", containScroll: "trimSnaps" }}>
              <CarouselPrevious className='absolute top-1/2 -translate-y-1/2 left-2 3xl:-left-2 3xl:-translate-x-full'/>
              <CarouselContent className=" gap-[18px]">
                  { data?.slice(0, 14).map((brand) => {
                      return (
                          <CarouselItem key={brand.id}
                                        className='flex shrink-0 grow-0 basis-[240px] xs:basis-[272px] justify-center rounded-[14px] bg-white-500 h-[120px]'>
                              <Link key={brand.id}
                                    href={`/brands/${brand.id}`}
                                    className="flex relative overflow-hidden justify-center items-center rounded-[14px] w-full h-full text-2xl font-serif"
                              >
                                  <ImageWithFallback src={brand.image}
                                                     title={brand.name}
                                                     fill
                                                     sizes="272px"
                                                     alt="Brand name"
                                                     draggable="false"
                                                     className="object-contain px-3 py-3 hover:scale-105 duration-300 transition-transform select-none"
                                                     fallback_text={brand.name}
                                  />
                              </Link>
                          </CarouselItem>
                      )
                  })}
              </CarouselContent>
              <CarouselNext className="absolute top-1/2 -translate-y-1/2 right-2 3xl:-right-2 3xl:translate-x-full"/>

              {/* PAGINATION */}
              <div className="flex justify-center xs:mt-6 mt-4">
                  <div className='flex gap-2 hover:scale-[105%] transition-transform duration-500'>
                      {Array.from({ length: snapCount }).map((_, index) => (
                          <button key={index}
                                  onClick={() => api?.scrollTo(index)}
                                  className={`w-2 h-2 rounded-full transition-colors duration-500 ${
                                      selectedIndex === index ? "active-pagination" : "disabled-pagination"}`}
                          />
                      ))}
                  </div>
              </div>
          </Carousel>
      )}
    </div>
  );
};

export default Brands;
