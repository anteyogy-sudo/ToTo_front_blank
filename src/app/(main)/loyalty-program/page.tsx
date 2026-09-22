"use client"
import React from 'react';
import {useAuthDialogStore} from "@/stores/useAuthDialogStore";
import {useUserStore} from "@/stores/useUserStore";
import {useRouter} from "next/navigation";
import Image from "next/image";
import HeroImg from "@/assets/icons/loyalty-program/HeroImg.svg";
import {Button} from "@/components/ui/button";
import {ListItems} from "@/components/ListItems";
import LoyaltyProgramBanner from "@/assets/icons/loyalty-program/LoyaltyProgramBanner.svg";
import PromoBannerMobile from "@/assets/icons/loyalty-program/PromoBannerMobile.svg";

const loyaltyProgramConstants = [
    {title : "Зарегистрируйтесь", subTitle : "на сайте или в приложении"},
    {title : "Получите бонусы", subTitle : "за регистрацию"},
    {title : "Оплачивайте бонусами", subTitle : "до 50% стоимости покупки"},
    {title : "Получайте больше бонусов", subTitle : "и персональные предложения по карте Антей"},
]

const Page = () => {
    const { setIsOpenLoginDialog, setWithRedirect } = useAuthDialogStore();
    const { user } = useUserStore();
    const router = useRouter();

    const handleLogin = () => {
        setWithRedirect(true);

        if (!user) {
            setIsOpenLoginDialog(true);
            return;
        } else {
            router.replace("/account");
        }
    }

    return (
        <div className='w-full max-w-base mx-auto lg:py-10 py-6 2xl:px-20 lg:px-10 px-6'>
            <div className='bg-white-100 rounded-[16px] lg:p-6 p-4 flex lg:flex-row flex-col lg:gap-10 gap-6' style={{ backgroundColor: 'white' }}>
                <Image src={HeroImg} alt='hero'/>
                <div className='flex flex-col justify-center lg:gap-10 gap-6'>
                    <h2 className='font-bold lg:text-[56px] text-[32px] text-black-100 leading-[100%]'>Бонусы за покупки <br className='lg:block hidden' /> в аптеках </h2>
                    <Button onClick={handleLogin} className="lg:max-w-[317px] h-[62px] w-full max-w-[317px] rounded-[18px] text-white-100 font-bold leading-[120%]">
                        Присоединиться
                    </Button>
                </div>
            </div>
            <div className='lg:pt-20 pt-6 grid xl:grid-cols-4 lg:grid-cols-2 grid-cols-1 gap-4'>
                {
                    <ListItems
                        items={loyaltyProgramConstants}
                        render={(item, index) => (
                            <div key={index} className='rounded-[16px] bg-blue-soft px-6 py-4 flex flex-col gap-4'>
                                <div className='flex gap-4 items-center'>
                                    <div className='flex justify-center items-center w-[58px] h-[58px] font-bold text-[48px] leading-[120%] bg-blue-lightBlue text-primary-softBlue '>
                                        {index + 1}
                                    </div>
                                    <p className='font-bold leading-[120%] text-[20px] text-black-100'>{item.title}</p>
                                </div>
                                <p className='font-normal text-[18px] leading-[120%] text-black-100'>{item.subTitle}</p>
                            </div>
                        ) }
                    />
                }
            </div>

            <div className='w-full relative md:h-[378px] lg:mt-[120px] mt-10 h-[540px] rounded-[16px] overflow-hidden lg:p-[55px] p-6'>
                <Image
                    src={LoyaltyProgramBanner}
                    alt='banner'
                    className='absolute md:block hidden h-full top-0 left-0 z-1 object-cover'
                />
                <Image
                    src={PromoBannerMobile}
                    alt='banner'
                    className='absolute md:hidden w-full block h-full top-0 left-0 z-1 object-cover'
                />
                <div className='absolute w-full h-full z-10 pr-12'>
                    <div className='font-bold lg:text-[56px] text-[32px] leading-[100%] '>
                        <span className='text-black-100'>Получайте</span>
                        <br className='md:block hidden'/>
                        <span className='text-primary-blue'> больше выгоды</span>
                    </div>
                    <p className='font-medium lg:text-[18px] pr-12 lg:mt-6 mt-4 text-[16px] text-black-100'>Став участником программы лояльности</p>
                    <Button onClick={handleLogin} className="lg:max-w-[317px] lg:mt-15 mt-6 text-[18px] h-[62px] w-full max-w-[275px] rounded-[18px] text-white-100 font-bold leading-[120%]">
                        Зарегистрироваться
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Page;