"use client";

import { ChevronLeftIcon } from "@/icons/chevron-left";
import { cn } from "@/lib/utils";
import { historyReplaceState } from "@/utils/history-push-state";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { ListItems } from "./ListItems";

interface Props {
    lastPage: number;
    activePage: number;
    onPageChange: (page: number) => void;
}

export const Pagination = ({ lastPage, activePage, onPageChange }: Props) => {
    const searchParams = useSearchParams();
    const pageFromUrl = searchParams.get("page");
    const currentPage = pageFromUrl ? parseInt(pageFromUrl, 10) : activePage;

    const mockPages = useMemo(() => {
        return createPagesArray(lastPage, currentPage);
    }, [lastPage, currentPage]);

    const shortPages = useMemo(() => {
        if (lastPage <= 4)
            return Array.from({ length: lastPage }, (_, i) => i + 1);
        return [1, 2, 3, "...", lastPage];
    }, [lastPage]);

    const onScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const setPage = (page: number) => {
        if (typeof window === "undefined")
            return;
        const params = new URLSearchParams(window.location.search);
        params.set("page", page.toString());
        historyReplaceState(params);
        onPageChange(page);
        onScrollToTop();
    }

    const onPrev = () => {
        if (currentPage > 1) setPage(currentPage - 1);
    };

    const onNext = () => {
        if (currentPage < lastPage) setPage(currentPage + 1);
    };

    const onChangePage = (page: string | number) => {
        if (page === "...")
            return;
        setPage(Number(page));
    };

    return (
        <div className="w-full flex items-center  justify-center md:gap-6 gap-[7px] px-0">
            <button onClick={onPrev}
                disabled={currentPage <= 1}
                className="w-10 h-10 aspect-square rounded-[8px] flex items-center justify-center bg-white-500 disabled:opacity-50 disabled:cursor-not-allowed"
            > <ChevronLeftIcon /> </button>

            {/* --- MOBILE pagination --- */}
            <div className="flex md:hidden items-center gap-2">
                <ListItems items={shortPages} render={(page) => {
                        if (page === "...") {
                            return (
                                <button key={`ellipsis-mobile-${page}-${Math.random()}`}
                                    className="w-10 h-10 flex items-center justify-center bg-white-500 rounded-[8px] text-gray-500 cursor-default"
                                > ... </button>
                            );
                        }
                        return (
                            <button key={`mobile-${page}`} onClick={() => onChangePage(page)}
                                className={cn(
                                    "w-10 h-10 aspect-square rounded-[8px] flex items-center justify-center bg-white-500 text-primary-gray font-medium",
                                    page === currentPage && "bg-blue-lightBlue text-primary-blue"
                                )}
                            > {page} </button>
                        );
                    }}
                />
            </div>

            {/* --- DESKTOP pagination --- */}
            <div className="hidden md:flex items-center gap-2">
                <ListItems
                    items={mockPages}
                    render={(page) => {
                        if (page === "...") {
                            return (
                                <button key={`ellipsis-desktop-${Math.random()}`}
                                    className="w-10 h-10 flex items-center justify-center bg-white-500 rounded-[8px] text-gray-500 cursor-default"
                                > ... </button>
                            );
                        }
                        return (
                            <button key={`desktop-${page}`}
                                onClick={() => onChangePage(page)}
                                className={cn(
                                    "w-10 h-10 aspect-square rounded-[8px] flex items-center justify-center bg-white-500 text-primary-gray font-medium",
                                    page === currentPage && "bg-blue-lightBlue text-primary-blue"
                                )}
                            > {page} </button>
                        );
                    }}
                />
            </div>

            <button onClick={onNext}
                disabled={currentPage >= lastPage}
                className="w-10 h-10 aspect-square rounded-[8px] flex items-center justify-center bg-white-500 rotate-180 disabled:opacity-50 disabled:cursor-not-allowed"
            > <ChevronLeftIcon /> </button>
        </div>
    );
};

function createPagesArray(lastPage: number, currentPage: number): (number | "...")[] {
    const pages: (number | "...")[] = [];

    if (lastPage <= 10)
        return Array.from({ length: lastPage }, (_, i) => i + 1);

    pages.push(1);

    if (currentPage > 4)
        pages.push("...");

    const start = Math.max(2, currentPage - 2);
    const end = Math.min(lastPage - 1, currentPage + 2);

    for (let i = start; i <= end; i++)
        pages.push(i);

    if (currentPage + 2 < lastPage - 1)
        pages.push("...");

    pages.push(lastPage);
    return pages;
}
