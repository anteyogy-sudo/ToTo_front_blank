"use client";
import { useFetchStocks } from "@/features/promotions/hooks/queries/useFetchStocks";
import {ArrowRight, ChevronRight} from "lucide-react";
import Link from "next/link";
import React, {useState} from "react";
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from "@/components/ui/carousel";
import {useIsomorphicLayoutEffect} from "@/hooks/useIsomorphicLayoutEffect";
import ImageWithFallback from "@/utils/ImageWithFallBack";
import {createArray} from "@/utils/create-array";
import {ListItems} from "@/components/ListItems";

const Promotions = () => {
    const { data, status } = useFetchStocks();
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

    if (status === "error" || (status === "success" && !data?.length)) return null;

    return (
      <div className="mt-6 3xl:max-w-base 3xl:px-0 mx-auto flex flex-col pl-5 2xl:max-w-[1435px] 2xl:px-[40px] xl:max-w-[1280px]">
          <div className="flex justify-between items-center">
              <Link href={'/promotion'} className="flex lg:gap-6 gap-4 items-center text-black-100 hover:scale-x-[103%] hover:text-primary-blue transition duration-300">
                  <p className="font-bold lg:text-[36px] text-[24px] ">
                      Акции
                  </p>
                  <p className="font-bold lg:text-[32px] text-[24px] text-primary-gray leading-[100%]">
                      {data?.length}
                  </p>
              </Link>
              <Link href="/promotion" className=" w-fit h-fit">
                  <button className="sm:flex hidden w-[159px] h-[36px] items-center gap-3 justify-center rounded-[200px] bg-white-500
                  text-primary-gray font-medium text-[16px] leading-[120%] hover:text-primary-blue transition-colors duration-300">
                      Смотреть все
                      <ChevronRight />
                  </button>
                  <button className='sm:hidden flex w-[44px] h-[44px] bg-blue-light rounded-[100%] items-center justify-center'>
                      <ArrowRight className='text-primary-gray'/>
                  </button>
              </Link>
          </div>

          <Carousel setApi={setApi}
                    opts={{ align: "start", containScroll: "trimSnaps" }}>
              <CarouselPrevious className='absolute top-1/2 -translate-y-1/2 left-2 3xl:-left-2 3xl:-translate-x-full'/>
              <CarouselContent className=" h-full gap-[10px]">
                  { status === "pending" ? (
                      <ListItems items={createArray(10)} render={(item) => (
                          <CarouselItem key={item}
                                        className="bg-loading-skeleton animate-pulse p-0 rounded-2xl ml-5
                                        1144:w-[450px] 1144:h-[450px]
                                        xs:w-[384px]   xs:h-[384px]
                                        w-[240px]      h-[240px]"
                          ></CarouselItem>
                      )}/>
                  ) : (
                      data.slice(0, 12).map((item) => (
                          <CarouselItem key={item.id}
                                        className='flex rounded-2xl
                                        1144:w-[470px] 1144:h-[470px]
                                          xs:w-[384px]   xs:h-[384px]
                                             w-[240px]      h-[240px] bg-blue-lightGrayBlue'>
                              <Link
                                  href={`/promotion/${item.id}`}
                                  className="relative overflow-hidden flex justify-center items-center rounded-2xl
                                  lg:text-[24px] text-[18px] text-center text-balance leading-[120%] text-primary-blue font-bold
                                  1144:w-[470px]     1144:h-[470px]
                                    xs:w-[384px]       xs:h-[384px]
                                       w-[240px]          h-[240px]"
                              >
                                  <ImageWithFallback
                                      src={item.image}
                                      alt="Promotion image"
                                      title={item.title}
                                      fill
                                      sizes="(max-width: 470px) 384px, 240px"
                                      draggable={false}
                                      className="w-full h-full object-cover hover:scale-[102%] transition-transform duration-500 select-none"
                                      fallback_text={item.title}
                                  />
                              </Link>
                          </CarouselItem>
                      ))
                  )}
              </CarouselContent>
              <CarouselNext className="absolute top-1/2 -translate-y-1/2 right-2 3xl:-right-2 3xl:translate-x-full"/>

              { status === "success" && (
                  <>
                      <div className="flex justify-center xs:mt-6 mt-4">
                          <div className="flex gap-2 hover:scale-[105%] transition-transform duration-500">
                              { data.slice(0, 12).map((_, index) => {
                                  if(index > data.slice(0, 12).length - 3) { return }

                                  return (
                                      <button
                                          key={index}
                                          onClick={() => api?.scrollTo(index)}
                                          className={`w-2 h-2 rounded-full transition-colors duration-500 ${
                                              selectedIndex === index ? "active-pagination" : "disabled-pagination"
                                          }`}
                                      />
                                  )
                              } )}
                          </div>
                      </div>
                  </>
              )}
          </Carousel>
      </div>
  );
};

export default Promotions;
