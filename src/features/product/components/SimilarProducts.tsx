"use client";
import React, { FC } from "react";
import { Container } from "@/components/Container";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { SlicedProductsLoadingSkeleton } from "@/features/products/components/SlicedProductsLoadingSkeleton";
import { ListItems } from "@/components/ListItems";
import { ProductCard } from "@/features/products/components/ProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useWindowDimension } from "@/hooks/useWindowDimension";
import { useFetchSimilarProducts } from "@/features/product/hooks/queries/useFetchSimilarProducts";
// import { ChevronRight } from "lucide-react";

interface SimilarProductsProps {
  similarProducts: number[];
}

const SimilarProducts: FC<SimilarProductsProps> = ({ similarProducts }) => {
  const { width } = useWindowDimension();
  const { status, data: products } = useFetchSimilarProducts(similarProducts);

  const countOfSlice =
    width >= 1280 ? 5 : width >= 1024 ? 4 : width >= 768 ? 3 : 2;

  if(!products?.goods?.length && status !== "pending"){
    return
  }

  return (
    <Container className="flex flex-col xl:gap-10 md:gap-8 gap-6 md:pr-6 pr-0">
      <header className=" w-full flex lg:flex-row flex-col lg:items-center lg:justify-between gap-y-2 pr-6">
        <div className=" md:w-fit w-full flex items-center md:justify-start justify-between gap-6 font-bold lg:text-[40px] text-[24px]">
          <p className=" text-black-100 leading-[100%]">Аналоги товаров</p>
          {status === "pending" ? (
            <LoadingSpinner className="text-primary-gray" size={32} />
          ) : (
            <p className=" text-primary-gray leading-[100%]">
              {products?.total}
            </p>
          )}
        </div>
        {/*<button className="w-[159px] h-[36px] flex items-center gap-3 justify-center rounded-[200px] bg-white-500 text-primary-gray font-medium text-[16px] leading-[120%] ">*/}
        {/*  Смотреть все*/}
        {/*  <ChevronRight />*/}
        {/*</button>*/}
      </header>

      {status === "pending" ? (
        <SlicedProductsLoadingSkeleton
          length={countOfSlice}
          columns={countOfSlice}
        />
      ) : status === "error" ? (
        <p>Error</p>
      ) : (
        <>
          <Carousel opts={{ align: "start" }}>
            <CarouselContent className=" h-full">
              <ListItems
                  items={products.goods}
                  render={(good) => (
                      <CarouselItem
                          key={good.id}
                          className="2xl:min-w-[243px] 2xl:max-w-[243px] xl:min-w-[211px] xl:max-w-[211px] min-w-[240px] max-w-[240px] min-h-full  p-0 ml-4"
                      >
                        <ProductCard product={good} />
                      </CarouselItem>
                  )}
              />
            </CarouselContent>
          </Carousel></>
      )}
    </Container>
  );
};

export default SimilarProducts;
