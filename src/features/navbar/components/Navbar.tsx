"use client";

import { ListItems } from "@/components/ListItems";
import { Logo } from "@/components/Logo";
import { NAVBAR_LINKS } from "@/constants/navbar.constant";
import { CompletedOrderButton } from "@/features/navbar/components/CompletedOrderButton";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import Image from "next/image";
import Link from "next/link";
import { useFetchCitiesQuery } from "../hooks/queries/useFetchCitiesQuery";
import { useCityStore } from "../stores/useCityStore";
import { useMobileMenuStore } from "../stores/useMobileMenuStore";
import { useOrderStore } from "../stores/useOrderStore";
import { AuthButton } from "./AuthButton";
import { CatalogButton } from "./CatalogButton";
import { DesktopMapMin } from "./DesktopMapMin";
import { FavoritesLink } from "./FavoritesLink";
import { HamburgerButton } from "./HamburgerButton";
import { MobileMapPin } from "./MobileMapPin";
import { NavSearchbar } from "./NavSearchbar";
import { CartLink } from "./cart-link";
import { MobileMenu } from "./mobile-menu";
import BottomNavBar from "@/features/navbar/components/BottomNavBar";
import React, { Suspense, useEffect, useRef, useState } from "react";
import MobilePhoneIcon from "@/assets/icons/mobile-phone.svg";
import CardIcon from "@/icons/CardIcon";
import CartPopup from "@/features/navbar/components/CartPopup";
import ExpandScanDialog from "@/features/navbar/components/ExpandScanDialog";
import MobileNewCatalog from "@/features/navbar/components/MobileNewCatalog";
// import { useFetchCollectionsQuery } from "@/features/collections/hooks/queries/useFetchCollectionsQuery";
// import { ChevronRight } from "lucide-react";
import dynamic from "next/dynamic";
import {PHONE_MAIN} from "@/constants/global.constants";
import { BlockMobileApp } from "@/features/navbar/components/BlockMobileApp";

// Только динамический импорт, без статического
const CityConfirmationPopup = dynamic(
    () => import("./CityConfirmationPopup").then((mod) => mod.CityConfirmationPopup),
    { ssr: false }
);

export const Navbar = () => {
    const { status: statusCities, data: cities } = useFetchCitiesQuery();
    // const { status: statusCollections, data: collections } = useFetchCollectionsQuery();

    const [isBlockVisible, setIsBlockVisible] = useState(true);

    const open = useMobileMenuStore(state => state.open);
    const setOpen = useMobileMenuStore(state => state.setOpen);
    const openCatalog = useMobileMenuStore(state => state.openCatalog);

    const isOpenOrderSlide = useOrderStore(state => state.isOpenOrderSlide);
    const setOpenOrderSlide = useOrderStore(state => state.setOpenOrderSlide);

    const [openCart, setOpenCart] = useState(false);
    const [openExpandScan, setOpenExpandScan] = useState(false);

    const catalogTimerRef = useRef<number | null>(null);

    useEffect(() => {
        if (catalogTimerRef.current) {
            window.clearTimeout(catalogTimerRef.current);
            catalogTimerRef.current = null;
        }

        const timer = window.setTimeout(() => {
            setIsBlockVisible(true);
        }, 0);

        return () => window.clearTimeout(timer);
    }, [openCatalog]);

    const handleToggleMenu = () => {
        setOpen(!open);
        if (isOpenOrderSlide) {
            setOpenOrderSlide(false);
        }
    };

    const {
        loadConfirmedCityFromCookie,
        initializeCityIntoCookie,
        confirmedCity,
    } = useCityStore();

    useIsomorphicLayoutEffect(() => {
        loadConfirmedCityFromCookie();
    }, []);

    useIsomorphicLayoutEffect(() => {
        if (!confirmedCity && cities?.data?.length) {
            initializeCityIntoCookie({
                id: cities.data[0].id,
                name: cities.data[0].name,
            });
        }
    }, [confirmedCity, cities]);

    const onClickBonus = () => {
        setOpenCart((prev) => !prev);
    };

    const openExpand = () => {
        setOpenExpandScan(true);
    };

    const closeExpandScan = () => {
        setOpenExpandScan(false);
    };

    return (
        <>
            <BlockMobileApp
                isVisible={isBlockVisible}
                setIsVisible={setIsBlockVisible}
                isCatalogOpen={openCatalog}
            />

            <div className="bg-white-100 sticky top-0 z-[100] border-b">
                <header className="bg-white-500 w-full flex flex-col py-3.5 z-40">
                    <div className="max-w-base w-full mx-auto">
                        {/* Первая строка */}
                        <div className="w-full flex items-center justify-between px-6">
                            <div className="w-full flex items-center justify-between gap-6 1144:w-fit 1144:justify-start">
                                <div className="relative">
                                    <DesktopMapMin status={statusCities} cities={cities?.data} />
                                    <CityConfirmationPopup cities={cities?.data} status={statusCities} />
                                </div>
                                <div className="hidden w-fit 1144:flex flex-row gap-[15px] text-primary-gray text-[14px]">
                                    <a className="hover:underline hover:text-primary-blue transition-colors duration-300" href={"tel:"+PHONE_MAIN}>{PHONE_MAIN}</a>
                                    <span>Пн-Пт, 09:00-18:00</span>
                                </div>
                                <div className="flex 1144:hidden">
                                    <Logo />
                                </div>
                                <div className="flex 1144:hidden bg-secondary-blue p-2 rounded-[16px] items-center gap-6">
                                    <MobileMapPin status={statusCities} cities={cities?.data} />
                                    <HamburgerButton open={open} onClick={handleToggleMenu} />
                                </div>
                            </div>

                            {/* Ссылки */}
                            <ul className="w-fit 1144:flex hidden items-center gap-6">
                                {/* Как сделать заказ и найти аптеку */}
                                <ListItems
                                    items={NAVBAR_LINKS["row-1"]}
                                    render={(link, index) => (
                                        <li key={index}>
                                            <Link href={link.href} className="transition-colors hover:text-primary-blue duration-200 leading-[120%]">
                                                {link.name}
                                            </Link>
                                        </li>
                                    )}
                                />
                                {/*<Link href='/promotion' className='font-medium flex text-[16px] leading-[120%] text-white-500 px-[16px] py-[6px] items-center justify-center bg-primary-purple rounded-[16px] hover:opacity-[85%] hover:scale-x-[103%] transition-opacity' >*/}
                                {/*    Акции*/}
                                {/*</Link>*/}
                                {/* Мобильное приложение */}
                                <li>
                                    <Link
                                        href="/mobile-app"
                                        className="flex items-center gap-2 font-bold text-[16px] text-white border-[1px]
                                        rounded-[16px] h-[30px] px-2 leading-[120%] hover:opacity-80 transition-opacity duration-300"
                                        style={{
                                            background: "linear-gradient(308.03deg, hsl(var(--brand-shine-a)) -46.76%, hsl(var(--brand-strong)) -13.68%, hsl(var(--brand-shine-b)) 60.72%, hsl(var(--brand-shine-c)) 105.34%, hsl(var(--brand-shine-d)) 147.71%)",
                                            border: "1px solid hsl(var(--brand-shine-line))",
                                            color: "white",
                                        }}
                                    >
                                        <Image src={MobilePhoneIcon} alt="Мобильное приложение" width={12}/>
                                        Мобильное приложение
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* HR */}
                    <hr className="my-1 h-0 border-0 border-b border-blue-light-gray"></hr>
                    {/* Вторая строка */}
                    <div className="max-w-base flex-col mx-auto w-full px-6">
                        <div className="flex w-full items-center justify-between gap-[20px]">
                            <div className="flex flex-row flex-shrink-0 gap-[20px]">
                                {/* Логотип */}
                                <div className="hidden 1144:flex">
                                    <Logo />
                                </div>
                                {/* Кнопка "Каталог" */}
                                <div className="w-[122px] h-[44px] hidden 1144:flex">
                                    <CatalogButton />
                                </div>
                            </div>
                            {/* Поиск товаров */}
                            <div className="w-full h-auto xl:px-[24px] mt-[15px] mb-[4px] md:mx-[5px] md:px-2 1144:h-[44px] 1144:px-0 1144:my-0 items-center gap-4 flex justify-center ">
                                <Suspense>
                                    <NavSearchbar />
                                </Suspense>
                            </div>
                            {/* Карта, Избранное, Корзина, Профиль */}
                            <div className="hidden 1144:flex gap-[20px] whitespace-nowrap h-full max-h-[50px] flex-row w-fit text-center align-center">
                                <div
                                    onClick={onClickBonus}
                                    className="w-full cursor-pointer flex flex-col justify-between items-center hover:opacity-80 text-primary-gray hover:text-primary-blue transition-colors duration-300"
                                >
                                    <CardIcon variant={openCart ? "siren" : "cloud"} />
                                    <span className="select-none text-[14px] font-medium ">Моя карта</span>
                                </div>
                                <FavoritesLink />
                                <CartLink />
                                <AuthButton />
                            </div>
                        </div>
                    </div>

                    {/* Третья строка */}
                    <div className="max-w-base mx-auto w-full px-6">
                        <div className="w-full flex-col">
                            <div className=" hidden 1144:flex w-full items-center justify-end gap-[18px]">
                                {/* Акции и скидки */}
                                {/*<div className=" h-[32px] w-fit flex items-center gap-[16px] text-sm text-primary-blue">*/}
                                {/*    <Link href='/promotion' className='font-medium flex text-[16px] leading-[120%] text-white-500 px-[16px] py-[6px] items-center justify-center bg-primary-purple rounded-[16px] hover:opacity-[85%] hover:scale-x-[103%] transition-opacity' >*/}
                                {/*        Акции*/}
                                {/*    </Link>*/}
                                {/*    <Link href='/catalog/0?from_promo=true' className='font-medium flex px-[16px] py-[6px] items-center justify-center text-[16px] leading-[120%] text-white-500 bg-blue-strong rounded-[16px] hover:opacity-[85%] hover:scale-x-[103%] transition-opacity' >*/}
                                {/*        Скидки*/}
                                {/*    </Link>*/}
                                {/*</div>*/}
                                {/*/!* Подборки Коллекции *!/*/}
                                {/*{statusCollections === "pending" && (*/}
                                {/*    <div className='flex flex-row gap-[20px] w-full'>*/}
                                {/*        <div className='flex flex-row gap-[20px] justify-start flex-1'>*/}
                                {/*            <div className='flex h-[32px] rounded-[16px] pt-[32px] shadow-sm bg-loading-skeleton animate-pulse w-full' />*/}
                                {/*            <div className='flex h-[32px] rounded-[16px] pt-[32px] shadow-sm bg-loading-skeleton animate-pulse w-full' />*/}
                                {/*            <div className='flex h-[32px] rounded-[16px] pt-[32px] shadow-sm bg-loading-skeleton animate-pulse w-full' />*/}
                                {/*            <div className='flex h-[32px] rounded-[16px] pt-[32px] shadow-sm bg-loading-skeleton animate-pulse w-full' />*/}
                                {/*            <div className='flex h-[32px] rounded-[16px] pt-[32px] shadow-sm bg-loading-skeleton animate-pulse min-w-[54px]' />*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*)}*/}
                                {/*{statusCollections === "error" && <></>}*/}
                                {/*{statusCollections === "success" && (*/}
                                {/*    <div className="w-full flex justify-between gap-[10px] overflow-hidden">*/}
                                {/*        <ul className="w-full flex justify-start gap-[10px] overflow-hidden">*/}
                                {/*            {collections.map((el) => (*/}
                                {/*                <li key={el.id} className="flex w-full hover:opacity-[85%] transition-opacity">*/}
                                {/*                    <Link*/}
                                {/*                        href={el.url}*/}
                                {/*                        className="flex w-full items-center justify-center gap-[4px] font-bold text-[14px] text-primary-blue bg-blue-ghostBlue rounded-[16px] max-h-[32px] min-h-[32px] px-4 leading-[110%] py-1"*/}
                                {/*                    >*/}
                                {/*                        <img src={el.image} className="w-[15px]" alt="" />*/}
                                {/*                        <p className="text-nowrap truncate">{el.shortTitle}</p>*/}
                                {/*                    </Link>*/}
                                {/*                </li>*/}
                                {/*            ))}*/}
                                {/*            <Link*/}
                                {/*                href={"/"}*/}
                                {/*                className="flex max-w-[90px] w-full justify-center items-center font-bold text-[14px] text-primary-blue bg-blue-ghostBlue rounded-[16px] h-[32px] px-2 py-2 hover:opacity-80 transition-opacity"*/}
                                {/*            >*/}
                                {/*                {"Ещё"}*/}
                                {/*                <ChevronRight size={15} />*/}
                                {/*            </Link>*/}
                                {/*        </ul>*/}
                                {/*    </div>*/}
                                {/*)}*/}

                                {/* Статус заказа */}
                                <Suspense fallback={<div className="flex flex-col h-[32px] rounded-[16px] pt-[32px] shadow-sm bg-loading-skeleton animate-pulse w-[292px]" />}>
                                    <CompletedOrderButton device="desktop" />
                                </Suspense>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="w-full">
                    <Suspense>
                        <CompletedOrderButton device="mobile" />
                    </Suspense>
                </div>

                <Suspense>
                    <MobileMenu />
                    <MobileNewCatalog />
                </Suspense>

                <Suspense>
                    <ExpandScanDialog onClose={closeExpandScan} open={openExpandScan} />
                </Suspense>

                <CartPopup open={openCart} setOpen={setOpenCart} openExpand={openExpand} />
            </div>

            <Suspense>
                <BottomNavBar setOpen={setOpenCart} open={openCart} />
            </Suspense>
        </>
    );
};