"use client";
import { ListItems } from "@/components/ListItems";
import { Pagination } from "@/components/Pagination";
import { ProductCard } from "@/features/products/components/ProductCard";
import { SlicedProductsLoadingSkeleton } from "@/features/products/components/SlicedProductsLoadingSkeleton";
import { useFetchDiscountedProducts } from "@/features/products/hooks/queries/useFetchDiscountedProducts";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { useWindowDimension } from "@/hooks/useWindowDimension";
import { LineSVG } from "@/icons/line";
import { Pill } from "lucide-react";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";

const DiscountedPage = () => {
  const { width } = useWindowDimension();
  const { status, data: products } = useFetchDiscountedProducts();

  const [lastPage, setLastPage] = useState<number | null>(null);
  const hasSetLastPage = useRef(false);

  useIsomorphicLayoutEffect(() => {
    if (
      !hasSetLastPage.current &&
      status === "success" &&
      products.meta.last_page
    ) {
      setLastPage(products.meta.last_page);
      hasSetLastPage.current = true;
    }
  }, [status, products, hasSetLastPage.current]);

  const countOfSlice = useMemo(() => {
    return width >= 1280 ? 5 : width >= 1024 ? 4 : width >= 768 ? 3 : 2;
  }, [width]);

  return (
    <div className="w-full lg:py-10 py-6 2xl:px-20 lg:px-10 px-6 flex flex-col lg:gap-10 gap-6">
      <header className="w-full">
        <div className="w-fit flex items-center gap-2.5">
          <Link
            href="/"
            className="text-primary-gray leading-[120%] hover:text-black-500"
          >
            Главная
          </Link>
          <LineSVG />
          <span className="leading-[120%] font-medium">Уцененные товары</span>
        </div>
      </header>
      <p className="md:text-[56px] text-[32px] lg:mt-4 mt-1 font-bold leading-[100%]">
        Уцененные товары
      </p>

      <div className="w-full flex flex-col gap-6">
        {status === "pending" ? (
          <SlicedProductsLoadingSkeleton length={15} columns={countOfSlice} />
        ) : status === "error" ? (
          <p>Error</p>
        ) : products.data.length > 0 ? (
          <div
            className="w-full h-fit grid gap-4"
            style={{
              gridTemplateColumns: `repeat(${countOfSlice}, minmax(0, 1fr))`,
            }}
          >
            <ListItems
              items={products.data}
              render={(item) => <ProductCard key={item.id} product={item} />}
            />
          </div>
        ) : (
          <div className="w-full p-16 flex items-center justify-center flex-col gap-2 text-2xl font-semibold text-primary-gray">
            <Pill size={32} />
            Продуктов не найдено
          </div>
        )}

        {lastPage && <Pagination lastPage={lastPage} />}
      </div>
    </div>
  );
};

export default DiscountedPage;
