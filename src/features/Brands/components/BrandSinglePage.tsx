"use client";
import React, { useMemo } from "react";
import { useFetchBrandQuery } from "@/features/Brands/hooks/queries/useFetchBrandQuery";
import Link from "next/link";
import { SlicedProductsLoadingSkeleton } from "@/features/products/components/SlicedProductsLoadingSkeleton";
import { ListItems } from "@/components/ListItems";
import { ProductCard } from "@/features/products/components/ProductCard";
import { useWindowDimension } from "@/hooks/useWindowDimension";
import { ProductProps } from "@/types/product.types";
import { Container } from "@/components/Container";
import ImageWithFallBack from "@/utils/ImageWithFallBack";

const BrandSinglePage = ({ id }: { id: number }) => {
    const { data: brand, status } = useFetchBrandQuery(id);
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
                <Link
                    href="/brands"
                    className="font-medium leading-[120%] text-primary-gray cursor-pointer hover:text-black-500"
                >
                    Бренды
                </Link>
                <div className="px-[6px] pt-[1px] bg-blue-blueGray" />
                <span className="font-medium leading-[120%]">{brand?.name}</span>
            </div>

            {/* Картинка бренда */}

            {status === "pending" ? (
                <div className="bg-loading-skeleton h-full w-full rounded-md"></div>
            ) : (
                brand && (
                    <div className="flex flex-col justify-center items-center mx-auto w-full gap-1">
                        <div className="flex w-[300px] h-[200px] mx-auto relative text-3xl bg-white-500 font-serif rounded-2xl">
                            <ImageWithFallBack
                                src={brand.image}
                                title={brand.name}
                                alt="promotion img"
                                fill
                                className="w-full h-full object-contain items-center p-4"
                                draggable={false}
                                fallback_text={brand.name}
                            />
                        </div>
                    </div>
                )
            )}

            {/* Товары бренда */}
            <div className="w-full flex flex-col gap-6">
                {status === "pending" ? (
                    <SlicedProductsLoadingSkeleton
                        length={countOfSlice}
                        columns={countOfSlice}
                    />
                ) : status === "error" ? (
                    <p className="text-center text-destructive">Ошибка при загрузке товаров</p>
                ) : !brand?.products?.length ? (
                    <p className="text-center text-gray-500">Товары не найдены</p>
                ) : (
                    <div
                        className="w-full h-fit grid gap-4"
                        style={{
                            gridTemplateColumns: `repeat(${countOfSlice}, minmax(0, 1fr))`,
                        }}
                    >
                        <ListItems
                            items={brand.products}
                            render={(item: ProductProps) => ( // Явно указываем тип для item
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

export default BrandSinglePage;