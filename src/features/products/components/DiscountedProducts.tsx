"use client";

import { Container } from "@/components/Container";
import { ListItems } from "@/components/ListItems";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useFetchDiscountedProducts } from "@/features/products/hooks/queries/useFetchDiscountedProducts";
import { createArray } from "@/utils/create-array";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { ProductCard } from "./ProductCard";

export const DiscountedProducts = () => {
  const { status, data: products } = useFetchDiscountedProducts();

  return (
    <Container className="flex flex-col xl:gap-10 md:gap-8 gap-6 md:pr-6 pr-0">
      <header className=" w-full flex lg:flex-row flex-col lg:items-center lg:justify-between gap-y-2 lg:pr-0 pr-6">
        <div className=" md:w-fit w-full flex items-center md:justify-start justify-between gap-6 font-bold lg:text-[40px] text-[24px]">
          <p className=" text-black-100 leading-[100%]">Уцененные товары</p>
          {status === "pending" ? (
            <LoadingSpinner className="text-primary-gray" size={32} />
          ) : (
            <p className=" text-primary-gray leading-[100%]">
              {products?.meta.total}
            </p>
          )}
        </div>
        <Link href="/discounted" className=" w-fit h-fit">
          <button className="w-[159px] h-[36px] flex items-center gap-3 justify-center rounded-[200px] bg-white-500 text-primary-gray font-medium text-[16px] leading-[120%] ">
            Смотреть все
            <ChevronRight />
          </button>
        </Link>
      </header>

      {/* {status === "pending" ? (
        <SlicedProductsLoadingSkeleton
          length={countOfSlice}
          columns={countOfSlice}
        />
      ) : status === "error" ? (
        <p>Error</p>
      ) : (
        <>
          <div
            className=" w-full h-fit md:grid hidden gap-4"
            style={{
              gridTemplateColumns: `repeat(${countOfSlice}, minmax(0, 1fr))`,
            }}
          >
            <ListItems
              items={products.data.slice(0, countOfSlice)}
              render={(item) => <ProductCard key={item.id} product={item} />}
            />
          </div>
          <Carousel className=" md:hidden" opts={{ align: "start" }}>
            <CarouselContent className=" h-full">
              <ListItems
                items={products.data}
                render={(good) => (
                  <CarouselItem
                    key={good.id}
                    className=" min-w-[256px] max-w-[256px] min-h-full"
                  >
                    <ProductCard product={good} />
                  </CarouselItem>
                )}
              />
            </CarouselContent>
          </Carousel>
          <Carousel opts={{ align: "start" }}>
            <CarouselContent className=" h-full">
              <ListItems
                items={products.data}
                render={(good) => (
                  <CarouselItem
                    key={good.id}
                    className=" xl:min-w-[305px] xl:max-w-[305px] md:min-w-[295px] md:max-w-[295px] min-w-[250px] max-w-[250px] min-h-full"
                  >
                    <ProductCard product={good} />
                  </CarouselItem>
                )}
              />
            </CarouselContent>
          </Carousel>
        </>
      )} */}

      <Carousel opts={{ align: "start" }}>
        <CarouselContent className=" h-full">
          {status === "pending" ? (
            <ListItems
              items={createArray(10)}
              render={(item) => (
                <CarouselItem
                  key={item}
                  className="2xl:min-w-[243px] 2xl:max-w-[243px] xl:min-w-[211px] xl:max-w-[211px] min-w-[240px] max-w-[240px] min-h-[400px] bg-loading-skeleton animate-pulse ml-4 p-0 rounded-2xl"
                ></CarouselItem>
              )}
            />
          ) : status === "error" ? (
            <p className="text-destructive">
              Произошла ошибка при загрузке товаров.
            </p>
          ) : (
            <ListItems
              items={products.data}
              render={(good) => (
                <CarouselItem
                  key={good.id}
                  className="2xl:min-w-[243px] 2xl:max-w-[243px] xl:min-w-[211px] xl:max-w-[211px] min-w-[240px] max-w-[240px] min-h-full ml-4 p-0"
                >
                  <ProductCard product={good} />
                </CarouselItem>
              )}
            />
          )}
        </CarouselContent>
      </Carousel>
    </Container>
  );
};
