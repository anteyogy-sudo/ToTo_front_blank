"use client";
import React from "react";
import { useFetchBrandsQuery } from "@/features/Brands/hooks/queries/useFetchBrandsQuery";
import Link from "next/link";
import { LineSVG } from "@/icons/line";
import { ListItems } from "@/components/ListItems";
import { imagePath } from "@/utils/image-path";
import { useWindowDimension } from "@/hooks/useWindowDimension";
import {Container} from "@/components/Container";
import ImageWithFallBack from "@/utils/ImageWithFallBack";

const BrandsPage = () => {
  const { width } = useWindowDimension();
  const { data, status } = useFetchBrandsQuery();

  const countOfSlice =
    width >= 1280 ? 5 : width >= 1024 ? 4 : width >= 768 ? 3 : 2;

  // ToDo: Show Error info
  if (status === "error") return <p>Error occurred</p>;

  return (
    <Container className="flex flex-col py-6 lg:gap-6 gap-3">
      <header className="flex items-center gap-2.5">
          <Link href="/" className=" text-primary-gray leading-[120%] hover:text-black-500">
            Главная
          </Link>
          <LineSVG />
          <span className=" leading-[120%] font-medium">Бренды</span>
      </header>

      <p className="font-bold text-black-100 lg:text-[56px] text-[32px] leading-[100%]">
        Бренды
      </p>

      <div
        className="w-full h-fit grid gap-4"
        style={{
          gridTemplateColumns: `repeat(${countOfSlice}, minmax(0, 1fr))`,
        }}
      >
          { status === "pending" ? (
              <ListItems
                  items={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
                  render={(skeleton) => (
                      <div key={skeleton} className="md:h-[200px] h-[120px] w-full rounded-[18px] bg-loading-skeleton animate-pulse" />
                  )}
              />
          ) : (
              <ListItems
                  items={data}
                  render={(brand) => (
                      <Link
                          href={`/brands/${brand.id}`}
                          key={brand.id}
                          className="md:h-[200px] h-[120px] w-full relative rounded-[18px] bg-white-500 p-7 font-serif text-2xl"
                      >
                          <ImageWithFallBack
                              src={imagePath(brand.image)}
                              fill
                              alt={brand.name}
                              className="p-7 object-contain items-center"
                              fallback_text={brand.name}
                          />
                      </Link>
                  )}
              />
          )}

      </div>
    </Container>
  );
};

export default BrandsPage;
