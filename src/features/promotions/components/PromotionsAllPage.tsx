"use client";
import React, { useMemo, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useFetchStocks } from "@/features/promotions/hooks/queries/useFetchStocks";
import Link from "next/link";
import { ListItems } from "@/components/ListItems";
import { SlicedProductsLoadingSkeleton } from "@/features/products/components/SlicedProductsLoadingSkeleton";
import { useWindowDimension } from "@/hooks/useWindowDimension";
import { Breadcrumbs } from "@/features/products/components/Breadcrumbs";
import { Container } from "@/components/Container";
import { Pagination } from "@/components/Pagination";
import { formatDate } from "@/utils/formatDate";
import ImageWithFallback from "@/utils/ImageWithFallBack";

// Отображение акций на странице
const ITEMS_PER_PAGE = 9;

const PromotionsAllPage = () => {
    const { data, status } = useFetchStocks();
    const { width } = useWindowDimension();
    const searchParams = useSearchParams();
    const router = useRouter();

    const pageParam = searchParams.get("page");
    const currentPage = pageParam ? parseInt(pageParam, 10) : 1;

    const totalPages = useMemo(() => {
        return Math.ceil((data?.length || 0) / ITEMS_PER_PAGE);
    }, [data]);

    useEffect(() => {
        if (totalPages === 0) return;
        if (currentPage > totalPages) {
            const params = new URLSearchParams(searchParams.toString());
            params.set("page", totalPages.toString());
            router.replace(`?${params.toString()}`, { scroll: false });
        } else if (currentPage < 1) {
            const params = new URLSearchParams(searchParams.toString());
            params.set("page", "1");
            router.replace(`?${params.toString()}`, { scroll: false });
        }
    }, [currentPage, totalPages, router, searchParams]);

    const paginatedData = useMemo(() => {
        if (!data) return [];
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        const end = start + ITEMS_PER_PAGE;
        return data.slice(start, end);
    }, [data, currentPage]);

    const countOfSlice = useMemo(() => {
        return width >= 1144 ? 3 : width >= 768 ? 2 : 1;
    }, [width]);

    // Навигация
    const breadcrumbItems = useMemo(() => {
        return [
            { label: "Главная", href: "/" },
            { label: "Акции" }
        ];
    }, []);

    return (
        <Container className="w-full 3xl:px-0 2xl:px-10 lg:px-10 px-6 flex flex-col gap-3">
            <Breadcrumbs items={breadcrumbItems} />

            <p className="md:text-[40px] flex gap-3 lg:gap-4 text-[32px] font-bold leading-[100%]">
                Акции
                <span className="text-primary-gray leading-[100%]">{data?.length}</span>
            </p>

            {status === "pending" ? (
                <SlicedProductsLoadingSkeleton length={21} columns={countOfSlice} />
            ) : status === "error" ? (
                <p>Error</p>
            ) : (
                <>
                    <div className="w-full h-fit grid md:gap-4 gap-2"
                         style={{ gridTemplateColumns: `repeat(${countOfSlice}, minmax(0, 1fr))`, }}
                    >
                        <ListItems
                            items={paginatedData}
                            render={(item) => {
                                if (!item) return null;

                                const formattedDate = item.expirationAt ? formatDate(item.expirationAt) : "...";

                                return (
                                    <Link key={item.id}
                                          href={`/promotion/${item.id}`}
                                          className="flex flex-col w-full flex-wrap bg-white-500 items-center
                                          border-[#E0E0E0] border-[1px]
                                          px-6 py-6 min-h-[300px]
                                          leading-[100%] group overflow-hidden rounded-2xl
                                          text-primary-blue lg:text-[24px] text-[18px] font-bold text-center text-balance"
                                    >
                                            <div className="flex relative overflow-hidden rounded-2xl justify-center items-center bg-blue-lightGrayBlue
                                            2xl:w-[350px] 2xl:h-[350px] xs:w-[300px] xs:h-[300px] w-[250px] h-[250px]">
                                                <ImageWithFallback
                                                    src={item.image}
                                                    alt="drug image"
                                                    fill
                                                    className="object-cover hover:scale-[102%] transition-transform duration-500 rounded-2xl"
                                                    draggable={false}
                                                    fallback_text={item.title}
                                                />
                                            </div>
                                            <div className="mt-[10px] flex flex-col items-center gap-2">
                                                <p className="font-bold text-gray-400 leading-[120%] text-[20px]">
                                                    Действует до {formattedDate}
                                                </p>
                                                <p className="text-black-100 font-bold leading-[120%] text-[20px] group-hover:text-primary-blue transition-colors duration-500">
                                                    {item.title}
                                                </p>
                                            </div>

                                    </Link>
                                );
                            }}
                        />
                    </div>

                    {totalPages > 1 && (
                        <div className="mt-8">
                            <Pagination
                                lastPage={totalPages}
                                activePage={currentPage}
                                onPageChange={() => {}}
                            />
                        </div>
                    )}
                </>
            )}
        </Container>
    );
};

export default PromotionsAllPage;