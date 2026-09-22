"use client";

import { Input } from "@/components/ui/input";
import React, { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { useRecentSearches } from "@/features/navbar/hooks/queries/useRecentSearches";
import { useSearchAutocompleteQuery } from "@/features/navbar/hooks/queries/useSearchAutocompleteQuery";
import { XIcon } from "@/icons/x-icon";
import { CartButton } from "@/features/cart/components/cart-button";
import { SearchCartButton } from "@/features/cart/components/search-cart-button";
import Image from "next/image";
import Search from "@/assets/icons/search/search.svg";
import SearchActive from "@/assets/icons/search/search-active.svg";
import Clock from "@/assets/icons/search/clock.svg";
import NoPhoto from "@/assets/icons/NoPhoto.svg";
import bonusIcon from "@/assets/icons/bonus-icon.svg";
import { ArrowLeftIcon } from "@/icons/arrow-left-icon";
import { useDebounce } from "@/hooks/useDebounce";

const POPULAR_SEARCHES = ["детралекс", "гептрал", "ингавирин"];

export const NavSearchbar = () => {
    const [query, setQuery] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileFullscreen, setIsMobileFullscreen] = useState(false);

    const searchParams = useSearchParams();
    const router = useRouter();

    const { recentSearches, addRecentSearch, removeRecentSearch } =
        useRecentSearches();

    const debouncedQuery = useDebounce(query, 300);
    const { data: searchResults } = useSearchAutocompleteQuery(
        debouncedQuery,
        isDropdownOpen
    );

    const dropdownRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const mobileModalRef = useRef<HTMLDivElement>(null);

    const isSearchActive = isDropdownOpen || isMobileFullscreen;

    const lastRecentSearches = recentSearches.slice(0, 2);
    const topPopularSearches = POPULAR_SEARCHES.slice(0, 3);
    const availableProducts = searchResults?.products?.filter((product) => product.available_at > 0) || [];
    const visibleProducts = availableProducts.slice(0, 3);

    const handleCloseSearch = () => {
        setIsDropdownOpen(false);
        setIsMobileFullscreen(false);
    };

    useIsomorphicLayoutEffect(() => {
        const queryFromParams = searchParams.get("query");
        setQuery(queryFromParams || "");
    }, [searchParams]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node) &&
                inputRef.current &&
                !inputRef.current.contains(event.target as Node)
            ) {
                setIsDropdownOpen(false);
            }

            if (
                isMobileFullscreen &&
                mobileModalRef.current &&
                !mobileModalRef.current.contains(event.target as Node)
            ) {
                handleCloseSearch();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isMobileFullscreen]);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                handleCloseSearch();
            }
        };

        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, []);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (query.trim().length > 0) {
            addRecentSearch(query.trim());
            router.replace(`/catalog/0?query=${encodeURIComponent(query.trim())}`);
            handleCloseSearch();
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
        setIsDropdownOpen(true);
    };

    const handleClearQuery = () => {
        setQuery("");
        setIsDropdownOpen(false);
        inputRef.current?.focus();
    };

    const handleSearchClick = (searchQuery: string) => {
        setQuery(searchQuery);
        addRecentSearch(searchQuery);
        router.replace(`/catalog/0?query=${encodeURIComponent(searchQuery)}`);
        handleCloseSearch();
    };

    const handleProductClick = (productId: number) => {
        router.push(`/product/${productId}`);
        handleCloseSearch();
    };

    const handleInputFocus = () => {
        if (window.innerWidth <= 1280) {
            setIsMobileFullscreen(true);
        }

        setIsDropdownOpen(true);
    };

    const handleCloseMobileFullscreen = () => {
        handleCloseSearch();
    };

    const stopPropagation = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    const renderDivider = (key: string) => (
        <div key={key} className="h-px w-full bg-gray-200" />
    );

    const renderHistorySection = (mode: "desktop" | "mobile") => {
        if (lastRecentSearches.length === 0) return null;

        const paddingClass = mode === "desktop" ? "px-4 pt-4" : "px-4 pt-4";

        return (
            <div className={`${paddingClass} bg-white`}>
                <h3 className="text-[18px] font-medium text-gray-900">История:</h3>

                <div className="mt-0.5">
                    {lastRecentSearches.map((search: string, index: number) => (
                        <React.Fragment key={`${search}-${index}`}>
                            <div
                                className="flex items-center gap-3 py-3"
                                onClick={stopPropagation}
                            >
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleSearchClick(search);
                                    }}
                                    className="flex min-w-0 flex-1 items-center gap-2 text-left"
                                >
                                    <Image
                                        src={Clock}
                                        alt="history"
                                        width={16}
                                        height={16}
                                        className="shrink-0"
                                    />
                                    <span className="min-w-0 text-base font-regular text-gray-900 hover:text-primary-blue">
                                        {search}
                                    </span>
                                </button>

                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeRecentSearch(search);
                                    }}
                                    className="ml-2 rounded-full p-1 transition-all hover:bg-gray-200"
                                >
                                    <XIcon className="h-4 w-4 text-gray-500 hover:text-red-500" />
                                </button>
                            </div>

                            {renderDivider(`history-divider-${index}`)}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        );
    };

    const renderPopularSection = (mode: "desktop" | "mobile") => {
        const paddingClass = mode === "desktop" ? "px-4 pt-4 pb-4" : "px-4 pt-4 pb-4";

        return (
            <div className={`${paddingClass} bg-white`}>
                <h3 className="text-[18px] font-medium text-gray-900">Часто ищут:</h3>

                <div className="mt-0.5">
                    {topPopularSearches.map((search, index) => (
                        <React.Fragment key={`${search}-${index}`}>
                            <div className="flex items-center gap-3 py-3">
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleSearchClick(search);
                                    }}
                                    className="flex min-w-0 flex-1 items-center gap-2 text-left"
                                >
                                    <Image
                                        src={Search}
                                        alt="search"
                                        width={16}
                                        height={16}
                                        className="shrink-0"
                                    />
                                    <span className="min-w-0 text-base font-regular text-gray-900 hover:text-primary-blue">
                                        {search}
                                    </span>
                                </button>
                            </div>

                            {renderDivider(`popular-divider-${index}`)}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        );
    };

    const renderProductsSectionDesktop = () => {
        if (query.trim().length === 0) return null;

        if (availableProducts.length === 0) {
            return (
                <div className="bg-white p-8 text-center">
                    <p className="text-[16px] text-gray-500">Загрузка</p>
                </div>
            );
        }

        return (
            <div className="bg-white">
                <div className="px-4 pt-4 pb-4">
                    <h3 className="text-[18px] font-medium text-gray-900">Товары:</h3>
                </div>

                <div className="space-y-0">
                    {visibleProducts.map((product, index) => (
                        <div
                            key={product.id}
                            className="group relative flex cursor-pointer items-center gap-4 rounded-2xl p-4 transition-colors hover:bg-[#ECF3F5]"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleProductClick(product.id);
                            }}
                        >
                            <div className="h-16 w-16 flex-shrink-0 p-1 md:h-16 md:w-16">
                                <Image
                                    src={product.image || NoPhoto}
                                    alt={product.name}
                                    width={64}
                                    height={64}
                                    className="h-full w-full rounded-lg object-contain"
                                />
                            </div>

                            <div className="min-w-0 flex-1">
                                <p className="line-clamp-2 text-[16px] font-regular text-gray-900 transition-colors group-hover:text-[#005CA7]">
                                    {product.name}
                                </p>
                            </div>

                            <div
                                className="ml-4 flex flex-shrink-0 items-center gap-4"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {(() => {
                                    const price = product.price ?? 0;
                                    const fullPrice = product.discount?.fullPrice ?? 0;
                                    const discountAmount = Math.max(fullPrice - price, 0);

                                    const showDiscountBadge =
                                        !!product.discount &&
                                        !product.discount.isBonus &&
                                        discountAmount > 0;

                                    const showRecipeBadge = !!product.isRecipe;

                                    const showBonusBadge =
                                        !!product.discount?.isBonus &&
                                        discountAmount > 0;

                                    const showOldPrice =
                                        !!product.discount &&
                                        fullPrice > price;

                                    return (
                                        <>
                                            <div className="flex flex-col items-end gap-1">
                                                {(showOldPrice ||
                                                    showDiscountBadge ||
                                                    showRecipeBadge ||
                                                    showBonusBadge) && (
                                                    <div className="flex items-center gap-2">
                                                        {showOldPrice && (
                                                            <span className="text-[16px] text-[#8E9AAB] line-through">
                                                                {fullPrice} ₽
                                                            </span>
                                                        )}
                                                        <div className="flex items-center gap-1">
                                                            {showDiscountBadge && (
                                                                <div className="w-fit rounded-[99px] bg-[#E53527] px-2 py-0.5 text-[14px] leading-[110%] text-white-500">
                                                                    -{discountAmount} ₽
                                                                </div>
                                                            )}

                                                            {showRecipeBadge && (
                                                                <div className="w-fit rounded-[99px] bg-[#CA2D74] px-2 py-0.5 text-[14px] leading-[110%] text-white-500">
                                                                    По рецепту
                                                                </div>
                                                            )}

                                                            {showBonusBadge && (
                                                                <div className="flex w-fit items-center gap-1 rounded-[99px] bg-[#005CA7] px-2 py-0.5 text-[14px] leading-[110%] text-white-500">
                                                                    +{discountAmount}
                                                                    <Image
                                                                        src={bonusIcon}
                                                                        alt="bonus icon"
                                                                        width={12}
                                                                        height={12}
                                                                        style={{ width: "auto", height: "auto" }}
                                                                    />
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}

                                                <div className="flex items-baseline gap-1">
                                                    <span className="text-[18px] font-bold text-gray-900">
                                                        от
                                                    </span>
                                                    <p className="whitespace-nowrap text-[18px] font-bold text-gray-900">
                                                        {price} ₽
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex h-10 w-32 items-center justify-center">
                                                <CartButton id={product.id} compact />
                                            </div>
                                        </>
                                    );
                                })()}
                            </div>

                            {index < visibleProducts.length - 1 && (
                                <div className="absolute bottom-0 left-4 right-4 h-px bg-gray-200" />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    // Отображение содержимого для мобильных устройств
    const renderProductsSectionMobile = () => {
        if (query.trim().length === 0) return null;

        if (availableProducts.length === 0) {
            return (
                <div className="bg-white px-4 py-8 text-center">
                    <p className="text-base text-gray-500">Загрузка</p>
                </div>
            );
        }

        return (
            <div className="bg-white">
                <div className="px-4 pt-0">
                    <h3 className="text-[18px] font-medium text-gray-900">Товары:</h3>
                </div>

                <div className="space-y-3 px-4 pb-4">
                    {visibleProducts.map((product, index) => (
                        <div
                            key={product.id}
                            className="group relative flex cursor-pointer items-start gap-3 rounded-xl p-3 transition-colors hover:bg-[#ECF3F5]"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleProductClick(product.id);
                            }}
                        >
                            {/* Изображение */}
                            <div className="h-16 w-16 flex-shrink-0 p-1">
                                <Image
                                    src={product.image || NoPhoto}
                                    alt={product.name}
                                    width={64}
                                    height={64}
                                    className="h-full w-full rounded-lg object-contain"
                                />
                            </div>

                            {/* Описание */}
                            <div className="min-w-0 flex-1 pr-2">
                                <p className="line-clamp-3 text-[16px] font-regular text-gray-900 transition-colors group-hover:text-[#005CA7]">
                                    {product.name}
                                </p>

                                {/* Цена */}
                                {(() => {
                                    const price = product.price ?? 0;
                                    const fullPrice = product.discount?.fullPrice ?? 0;
                                    const discountAmount = Math.max(fullPrice - price, 0);

                                    const showDiscountBadge =
                                        !!product.discount &&
                                        !product.discount.isBonus &&
                                        discountAmount > 0;

                                    const showRecipeBadge = !!product.isRecipe;

                                    const showBonusBadge =
                                        !!product.discount?.isBonus &&
                                        discountAmount > 0;

                                    const showOldPrice =
                                        !!product.discount &&
                                        fullPrice > price;

                                    return (
                                        <div className="mt-2 flex flex-col gap-1">
                                            {(showOldPrice ||
                                                showDiscountBadge ||
                                                showRecipeBadge ||
                                                showBonusBadge) && (
                                                <div className="flex flex-wrap items-center gap-1">
                                                    {showOldPrice && (
                                                        <span className="text-[16px] text-[#8E9AAB] line-through">
                                                            {fullPrice} ₽
                                                        </span>
                                                    )}

                                                    {showDiscountBadge && (
                                                        <div className="w-fit rounded-[99px] bg-[#E53527] px-2 py-0.5 text-[14px] leading-[110%] text-white-500">
                                                            -{discountAmount} ₽
                                                        </div>
                                                    )}

                                                    {showRecipeBadge && (
                                                        <div className="w-fit rounded-[99px] bg-[#CA2D74] px-2 py-0.5 text-[14px] leading-[110%] text-white-500">
                                                            По рецепту
                                                        </div>
                                                    )}

                                                    {showBonusBadge && (
                                                        <div className="flex w-fit items-center gap-1 rounded-[99px] bg-[#005CA7] px-2 py-0.5 text-[14px] leading-[110%] text-white-500">
                                                            +{discountAmount}
                                                            <Image
                                                                src={bonusIcon}
                                                                alt="bonus icon"
                                                                width={10}
                                                                height={10}
                                                                style={{ width: "auto", height: "auto" }}
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                            <div className="flex items-baseline gap-1">
                                                <span className="text-[18px] font-bold text-gray-900">
                                                    от
                                                </span>

                                                <p className="whitespace-nowrap text-[18px] font-bold text-gray-900">
                                                    {price} ₽
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })()}
                            </div>

                            {/* Кнопка */}
                            <div
                                className="flex h-full flex-shrink-0 items-center self-center"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="w-18">
                                    <SearchCartButton
                                        id={product.id}
                                        className="h-12 w-full"
                                    />
                                </div>
                            </div>

                            {index < visibleProducts.length - 1 && (
                                <div className="absolute bottom-0 left-1 right-1 h-px bg-gray-200" />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const renderViewAllProductsSection = () => {
        if (query.trim().length === 0 || availableProducts.length === 0) return null;

        return (
            <div className="border-t border-gray-200 bg-white p-4">
                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        addRecentSearch(query.trim());
                        router.replace(
                            `/catalog/0?query=${encodeURIComponent(query.trim())}`
                        );
                        handleCloseSearch();
                    }}
                    className="w-full rounded-lg border-2 border-[#005CA7] py-3 text-center text-[18px] font-bold text-[#005CA7] transition-colors duration-200 hover:bg-[#005CA7] hover:text-white-100"
                >
                    Смотреть все товары
                </button>
            </div>
        );
    };

    const renderDesktopContent = () => {
        return (
            <div className="max-h-[550px] overflow-y-auto bg-white scrollbar-custom">
                <div className="space-y-1 bg-white">
                    {renderProductsSectionDesktop()}
                    {renderHistorySection("desktop")}
                    {renderPopularSection("desktop")}
                    {renderViewAllProductsSection()}
                </div>
            </div>
        );
    };

    const renderMobileContent = () => {
        return (
            <div className="flex flex-col bg-white" onClick={stopPropagation}>
                <div className="space-y-1 bg-white">
                    {renderProductsSectionMobile()}
                    {renderHistorySection("mobile")}
                    {renderPopularSection("mobile")}
                    {renderViewAllProductsSection()}

                    <div className="h-20 bg-white" />
                </div>
            </div>
        );
    };

    return (
        <>
            {isSearchActive && (
                <div
                    className="fixed inset-0 z-40"
                    style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                    onClick={handleCloseSearch}
                />
            )}

            <div
                className="relative z-50 hidden h-full w-full items-center justify-between gap-2 rounded-2xl bg-primary-light-white px-6 text-primary-gray transition-all xl:flex"
                style={{
                    border: "3px solid #005CA7",
                    backgroundColor: isSearchActive ? "white" : undefined,
                }}
            >
                <form onSubmit={onSubmit} className="flex h-full w-full items-center gap-2">
                    <Image
                        src={isSearchActive ? SearchActive : Search}
                        alt="search"
                        width={18}
                        height={18}
                        className="shrink-0"
                    />

                    <Input
                        ref={inputRef}
                        placeholder="Например: Терафлю"
                        className="h-full border-none bg-transparent px-0 text-base leading-[120%] md:text-[16px] focus-visible:ring-0"
                        style={
                            isSearchActive
                                ? { backgroundColor: "white" }
                                : { backgroundColor: "transparent" }
                        }
                        value={query}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                    />

                    {query.length > 0 && (
                        <button
                            type="button"
                            onClick={handleClearQuery}
                            className="flex-shrink-0 rounded-full p-0.5 transition-all hover:bg-gray-200"
                        >
                            <XIcon className="h-5 w-5 text-gray-500 hover:text-red-500" />
                        </button>
                    )}
                </form>

                {/* Градиент */}
                {isDropdownOpen && (
                    <div
                        ref={dropdownRef}
                        className="absolute left-0 right-0 top-full z-50 mx-auto mt-2 w-full max-w-6xl overflow-hidden rounded-xl shadow-lg"
                        style={{
                            border: "3px solid transparent",
                            background: `linear-gradient(white, white) padding-box,
                            linear-gradient(to bottom, #005CA7, #5EB7FF) border-box`,
                        }}
                        onClick={stopPropagation}
                    >
                        {renderDesktopContent()}
                    </div>
                )}

                {/* Сплошной цвет */}
                {/*{isDropdownOpen && (*/}
                {/*    <div*/}
                {/*        ref={dropdownRef}*/}
                {/*        className="absolute left-0 right-0 top-full z-50 mx-auto mt-2 w-full max-w-6xl overflow-hidden rounded-xl border-2 border-[#005CA7] bg-white shadow-lg"*/}
                {/*        style={{ backgroundColor: "white" }}*/}
                {/*        onClick={stopPropagation}*/}
                {/*    >*/}
                {/*        {renderDesktopContent()}*/}
                {/*    </div>*/}
                {/*)}*/}
            </div>

            <div
                className="relative z-50 flex h-full w-full items-center px-4 text-primary-gray transition-all xl:hidden"
            >
                <button
                    type="button"
                    onClick={handleInputFocus}
                    className="flex h-11 w-full items-center gap-2 rounded-2xl border-2 border-[#005CA7] bg-[#f5f6f7] px-4"
                >
                    <Image
                        src={isSearchActive ? SearchActive : Search}
                        alt="search"
                        width={20}
                        height={20}
                        className="shrink-0"
                    />
                    <span className="truncate text-base leading-[120%] text-gray-400">
                    Например: Терафлю
                    </span>
                </button>

                {isMobileFullscreen && (
                    <div
                        ref={mobileModalRef}
                        className="fixed inset-0 z-50 flex flex-col overflow-hidden bg-white"
                        style={{ backgroundColor: "white" }}
                        onClick={(e) => {
                            if (e.target === e.currentTarget) {
                                handleCloseMobileFullscreen();
                            }
                        }}
                    >
                        <div className="flex items-center gap-3 border-b border-gray-200 bg-white p-4">
                            <button
                                type="button"
                                onClick={handleCloseMobileFullscreen}
                                className="rounded-full p-2 transition-all hover:bg-gray-100"
                            >
                                <ArrowLeftIcon className="h-5 w-5 text-gray-600" />
                            </button>

                            <form onSubmit={onSubmit} className="flex-1">
                                <div className="relative flex h-11 items-center gap-2 overflow-hidden rounded-2xl border-2 border-[#005CA7] bg-[#f5f6f7] px-3 pr-10">
                                    <Image
                                        src={SearchActive}
                                        alt="search"
                                        width={20}
                                        height={20}
                                        className="shrink-0"
                                    />

                                    <Input
                                        ref={inputRef}
                                        placeholder="Например: Терафлю"
                                        className="w-full flex-1 border-none bg-transparent px-0 text-base leading-[120%] focus-visible:ring-0"
                                        style={{ backgroundColor: "transparent" }}
                                        value={query}
                                        onChange={handleInputChange}
                                        autoFocus
                                    />

                                    {query.length > 0 && (
                                        <button
                                            type="button"
                                            onClick={handleClearQuery}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 transition-all hover:bg-gray-100"
                                        >
                                            <XIcon className="h-5 w-5 text-gray-500 hover:text-red-500" />
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>

                        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain bg-white scrollbar-custom">
                            {renderMobileContent()}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};