import { useFetchFavoritesQuery } from "../hooks/queries/useFetchFavoritesQuery";
import { SlicedProductsLoadingSkeleton } from "@/features/products/components/SlicedProductsLoadingSkeleton";
import { ListItems } from "@/components/ListItems";
import { ProductCard } from "@/features/products/components/ProductCard";
import Link from "next/link";
import { LineSVG } from "@/icons/line";
import React from "react";
import { useWait } from "@/hooks/useWait";
import { useFavoritesStore } from "../stores/useFavoritesStore";

interface Props {
  skeletonCount: number;
}

export const DisplayFavorites = ({ skeletonCount }: Props) => {
  const { favorites } = useFavoritesStore();
  const { data: products, status } = useFetchFavoritesQuery();
  const isWaiting = useWait();

  return (
    <div className=" w-full flex flex-col lg:gap-10 gap-6">
      <header className=" w-full">
        <div className=" w-fit flex items-center gap-2.5">
          <Link href="/" className=" text-primary-gray leading-[120%] hover:text-black-500">Главная</Link>
          <LineSVG />
          <span className=" leading-[120%] font-medium">Избранное</span>
        </div>
      </header>
      <p className=" md:text-[56px] text-[32px] lg:mt-4 mt-1 font-bold leading-[100%]">Избранное</p>
      {status === "pending" || isWaiting ? (
        <SlicedProductsLoadingSkeleton
          length={skeletonCount}
          columns={skeletonCount}
        />
      ) : status === "error" ? (
        <p>Error</p>
      ) : (
        <>
          <div
            className=" w-full h-fit grid  gap-4"
            style={{
              gridTemplateColumns: `repeat(${skeletonCount}, minmax(0, 1fr))`,
            }}
          >
            <ListItems
              items={products.data.filter((item) =>
                favorites.includes(item.id)
              )}
              render={(item) => <ProductCard key={item.id} product={item} />}
            />
          </div>
        </>
      )}
    </div>
  );
};
