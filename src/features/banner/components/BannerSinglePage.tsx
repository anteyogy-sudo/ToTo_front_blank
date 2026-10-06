"use client";
import React, { useMemo } from "react";
import { SlicedProductsLoadingSkeleton } from "@/features/products/components/SlicedProductsLoadingSkeleton";
import { ListItems } from "@/components/ListItems";
import { ProductCard } from "@/features/products/components/ProductCard";
import { useWindowDimension } from "@/hooks/useWindowDimension";
import { ProductProps } from "@/types/product.types";
import { Container } from "@/components/Container";
import {useFetchBannersByIdQuery} from "@/features/banner/hooks/queries/useFetchBannerByIdQuery";
import Image from "next/image";
import Link from "next/link";

const BannerSinglePage = ({ id }: { id: number }) => {
    const { data: banner, status } = useFetchBannersByIdQuery(id);
    const { width } = useWindowDimension();

    const countOfSlice = useMemo(() => {
        return width >= 1280 ? 5 : width >= 1024 ? 4 : width >= 768 ? 3 : 2;
    }, [width]);

    return (
        <Container className="flex flex-col gap-6">
            <div className="w-fit flex items-center gap-2">
                <Link
                    href="/"
                    className="leading-[120%] text-primary-gray cursor-pointer hover:text-black-500"
                >
                    Главная
                </Link>
                <div className="px-[6px] pt-[1px] bg-blue-blueGray" />
                <span className="font-medium leading-[120%] text-primary-gray">
                    Предложения
                </span>
                <div className="px-[6px] pt-[1px] bg-blue-blueGray" />
                <span className="font-medium leading-[120%]">{banner?.title}</span>
            </div>

            {status === "pending" && (
                <div className=" w-full 1144:h-[440px] md:h-[380px] h-[240px] 1144:aspect-auto aspect-[253/100] rounded-2xl relative shadow-sm bg-loading-skeleton animate-pulse mb-8" />
            )}
            {status === "success" && (
                <div className='flex rounded-2xl '>
                    <div key={banner.id}
                         className='relative basis-full 1144:h-[440px] aspect-[253/100] rounded-2xl overflow-hidden
                         shadow-sm select-none items-center justify-center'>
                        <Image
                            src={banner.image}
                            alt={banner.title}
                            fill priority
                            className="object-fill w-full rounded-2xl"
                            draggable={false}
                        />
                    </div>
                </div>
            )}

            {/* Товары баннера */}
            <div className="w-full flex flex-col gap-6">
                {status === "pending" ? (
                    <SlicedProductsLoadingSkeleton
                        length={countOfSlice}
                        columns={countOfSlice}
                    />
                ) : status === "error" ? (
                    <p className="text-center text-destructive">Ошибка при загрузке товаров</p>
                ) : !banner?.products?.length ? (
                    <p className="text-center text-gray-500">Товары не найдены</p>
                ) : (
                    <div
                        className="w-full h-fit grid gap-4"
                        style={{
                            gridTemplateColumns: `repeat(${countOfSlice}, minmax(0, 1fr))`,
                        }}
                    >
                        <ListItems
                            items={banner.products}
                            render={(item: ProductProps) => (
                                <ProductCard
                                    key={item.id}
                                    product={item}
                                />
                            )}
                        />
                    </div>
                )}
            </div>
        </Container>
    );
};

export default BannerSinglePage;