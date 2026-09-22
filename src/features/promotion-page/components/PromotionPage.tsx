"use client";
import React, {useMemo} from "react";
import { useFetchPromotion } from "@/features/promotion-page/hooks/queries/useFetchPromotion";
import { formatDate } from "@/utils/formatDate";
import { SlicedProductsLoadingSkeleton } from "@/features/products/components/SlicedProductsLoadingSkeleton";
import { ListItems } from "@/components/ListItems";
import { ProductCard } from "@/features/products/components/ProductCard";
import { useWindowDimension } from "@/hooks/useWindowDimension";
import { Container } from "@/components/Container";
import ImageWithFallback from "@/utils/ImageWithFallBack";
import {Breadcrumbs} from "@/features/products/components/Breadcrumbs";

const PromotionPage = ({ id }: { id: string }) => {
    const { data: promotion, status } = useFetchPromotion(id);
    const { width } = useWindowDimension();

    const isMobile = width < 768;

    // Навигация
    const breadcrumbItems = useMemo(() => {
        return [
            { label: "Главная", href: "/" },
            { label: "Акции", href: "/promotion"},
            { label: promotion?.title}
        ];
    }, [promotion?.title]);

    const renderPromotionContent = () => {
        if (status === "pending") {
            return (
                <>
                    <div className="bg-loading-skeleton h-14 w-full rounded-md"></div>
                    {isMobile ? (
                        <div className="w-full flex flex-col gap-6">
                            <div className="relative w-full max-w-[300px] aspect-[1/1] rounded-[16px] overflow-hidden">
                                <div className="bg-loading-skeleton h-full w-full rounded-md"></div>
                            </div>
                            <div className="w-full flex flex-col gap-4">
                                <div className="w-full h-[30px] bg-loading-skeleton rounded-md"></div>
                                <div className="w-full h-[30px] bg-loading-skeleton rounded-md"></div>
                                <div className="w-full h-[30px] bg-loading-skeleton rounded-md"></div>
                            </div>
                        </div>
                    ) : (
                        <div className="w-full flex-wrap flex gap-10">
                            <div className="relative w-full max-w-[600px] aspect-[1/1] rounded-[16px] overflow-hidden">
                                <div className="bg-loading-skeleton h-full w-full rounded-md"></div>
                            </div>
                            <div className="max-w-[600px] w-full flex flex-col gap-4">
                                <div className="max-w-[600px] w-full h-[30px] bg-loading-skeleton rounded-md"></div>
                                <div className="max-w-[600px] w-full h-[30px] bg-loading-skeleton rounded-md"></div>
                                <div className="max-w-[600px] w-full h-[30px] bg-loading-skeleton rounded-md"></div>
                            </div>
                        </div>
                    )}
                </>
            );
        }

        if (status === "error") {
            return <p className="text-center text-red-500">Не удалось загрузить акцию</p>;
        }

        if (isMobile) {
            return (
                <div className="w-full flex flex-col gap-6">
                    <ImageWithFallback
                        className="w-full max-w-[300px] h-auto object-cover rounded-[16px]"
                        src={promotion?.image || ''}
                        alt={promotion?.title || "promotion img"}
                        width={300}
                        height={300}
                        draggable={false}
                    />
                    <div className="flex flex-col gap-4">
                        <h1 className="font-bold text-[24px] leading-[100%] text-black-100">
                            {promotion?.title}
                        </h1>
                        <p
                            className="text-black-100 font-normal text-[18px] leading-[120%]"
                            dangerouslySetInnerHTML={{ __html: promotion?.description || '' }}
                        />
                        <p className="text-black-100 text-[16px] leading-[120%] font-medium">
                            Сроки акции: до {promotion?.expirationAt && formatDate(promotion?.expirationAt)}
                        </p>
                    </div>
                </div>
            );
        }

        return (
            <div className="w-full flex flex-row gap-[19px]">
                <ImageWithFallback
                    className="flex w-full h-full object-cover max-w-[436px] max-h-[436px] rounded-[16px]"
                    src={promotion?.image || ''}
                    alt={promotion?.title || "promotion img"}
                    width={436}
                    height={436}
                    draggable={false}
                />
                <div className="flex flex-wrap flex-col gap-10">
                    <h1 className="font-bold lg:text-[56px] text-[24px] leading-[100%] text-black-100">
                        {promotion?.title}
                    </h1>
                    <p
                        className="flex text-black-100 font-normal text-[18px] leading-[120%]"
                        dangerouslySetInnerHTML={{ __html: promotion?.description || '' }}
                    />
                    <p className="text-black-100 lg:text-[18px] text-[16px] leading-[120%] font-medium">
                        Сроки акции: до {promotion?.expirationAt && formatDate(promotion?.expirationAt)}
                    </p>
                </div>
            </div>
        );
    };

    return (
        <Container className="w-full lg:py-10 py-6 2xl:px-20 lg:px-10 px-6 flex flex-col lg:gap-10 gap-6">

            <Breadcrumbs items={breadcrumbItems} />

            {renderPromotionContent()}

            <div className="w-full flex flex-col gap-6 md:mt-10 mt-1">
                {status === "pending" ? (
                    <SlicedProductsLoadingSkeleton
                        length={6}
                        columns={3}
                    />
                ) : status === "error" ? (
                    <p className="text-center text-red-500">Не удалось загрузить товары акции</p>
                ) : (
                    <div className="w-full h-fit grid lg:grid-cols-3 md:grid-cols-2 grid-cols-2 1144:gap-4 gap-2">
                        <ListItems
                            items={promotion?.goods || []}
                            render={(item) => (
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

export default PromotionPage;