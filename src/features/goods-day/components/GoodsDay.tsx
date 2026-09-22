"use client"
import React, {useMemo} from 'react';
import {LineSVG} from "@/icons/line";
import Link from "next/link";
import Promotions from "@/features/promotions/components/Promotions";
import Image from "next/image";
import LoyaltyProgramBanner from "@/assets/icons/loyalty-program/LoyaltyProgramBanner.svg";
import PromoBannerMobile from "@/assets/icons/loyalty-program/PromoBannerMobile.svg";
import {Button} from "@/components/ui/button";
import {DisplayGoodsDay} from "@/features/goods-day/components/DisplayGoodsDay";
import {useWindowDimension} from "@/hooks/useWindowDimension";
import {Container} from "@/components/Container";

const GoodsDay = () => {

    const { width } = useWindowDimension();
    const countOfSlice = useMemo(() => {
        return width >= 1280 ? 5 : width >= 1024 ? 4 : width >= 768 ? 3 : 2;
    }, [width]);

    return (
        <>
            <Container className='w-full lg:py-10 py-6 2xl:px-0 lg:px-10 px-6'>
                <div className=" w-full">
                    <div className=" w-fit flex items-center gap-2.5">
                        <Link href='/' className=" text-primary-gray leading-[120%] hover:text-black-500">Главная</Link>
                        <LineSVG />
                        <span className=" leading-[120%] font-medium">Товары дня</span>
                    </div>
                </div>

                <DisplayGoodsDay skeletonCount={countOfSlice}/>
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

export default GoodsDay;