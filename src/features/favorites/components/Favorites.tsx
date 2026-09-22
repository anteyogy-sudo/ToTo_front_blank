"use client";

import LoyaltyProgramBanner from "@/assets/icons/loyalty-program/LoyaltyProgramBanner.svg";
import PromoBannerMobile from "@/assets/icons/loyalty-program/PromoBannerMobile.svg";
import { Container } from "@/components/Container";
import { Button } from "@/components/ui/button";
// import { DiscountedProducts } from "@/features/products/components/DiscountedProducts";
import { SlicedProductsLoadingSkeleton } from "@/features/products/components/SlicedProductsLoadingSkeleton";
import Promotions from "@/features/promotions/components/Promotions";
import { useIsMounted } from "@/hooks/useIsMounted";
import { useWindowDimension } from "@/hooks/useWindowDimension";
import Image from "next/image";
import {useMemo} from "react";
import { useFavoritesStore } from "../stores/useFavoritesStore";
import { DisplayFavorites } from "./DisplayFavorites";
import { NoFavorites } from "./NoFavorites";
import {useIsomorphicLayoutEffect} from "@/hooks/useIsomorphicLayoutEffect";

const Favorites = () => {
  const { width } = useWindowDimension();
  const { favorites, fetchFavorites, isLoading } = useFavoritesStore();
  const hasMounted = useIsMounted();

  const countOfSlice = useMemo(() => {
    return width >= 1280 ? 5 : width >= 1024 ? 4 : width >= 768 ? 3 : 2;
  }, [width]);

  useIsomorphicLayoutEffect(() => {
    window.scrollTo(0, 0);
    fetchFavorites();
  }, []);

  return (
    <>
      <Container>
        {(!hasMounted || isLoading) ? (
          <div className=" w-full flex flex-col gap-6">
            <div className=" w-80 h-14 rounded-md bg-loading-skeleton animate-pulse"></div>
            <SlicedProductsLoadingSkeleton
              length={countOfSlice}
              columns={countOfSlice}
            />
          </div>
        ) : !favorites.length ? (
          <NoFavorites />
        ) : (
          <DisplayFavorites skeletonCount={countOfSlice} />
        )}
      </Container>

      {/*<DiscountedProducts />*/}

      <Promotions />
      <Container className="w-full 2xl:px-0 lg:px-10 px-6 lg:pb-10 pb-6">
        <div className="w-full relative md:h-[378px]  mt-10 h-[540px] rounded-[16px] overflow-hidden lg:p-[55px] p-6">
          <Image
            src={LoyaltyProgramBanner}
            alt="banner"
            className="absolute md:block hidden w-full h-full top-0 left-0 z-1 object-cover"
          />
          <Image
            src={PromoBannerMobile}
            alt="banner"
            className="absolute md:hidden w-full block h-full top-0 left-0 z-1 object-cover"
          />
          <div className="absolute w-full h-full z-10 pr-12">
            <div className="font-bold lg:text-[56px] text-[32px] leading-[100%] ">
              <span className="text-black-100">Получайте</span>
              <br className="md:block hidden" />
              <span className="text-primary-blue"> больше выгоды</span>
            </div>
            <p className="font-medium lg:text-[18px] pr-12 lg:mt-6 mt-4 text-[16px] text-black-100">
              Став участником программы лояльности
            </p>
            <Button className="lg:max-w-[317px] lg:mt-15 mt-6 text-[18px]  h-[62px] w-full max-w-[275px] rounded-[18px] text-white-100 font-bold leading-[120%]">
              Зарегистрироваться
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Favorites;
