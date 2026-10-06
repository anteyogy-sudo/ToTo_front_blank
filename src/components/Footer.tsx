import React from 'react';
import Image from "next/image";
import {Logo} from "@/components/Logo";
import TgIcon from "@/assets/icons/TG-icon.svg"
import VkIcon from "@/assets/icons/VK-icon.svg"
import MaxIcon from "@/assets/icons/MAX-icon.svg"
import DzenIcon from "@/assets/icons/DZEN-icon.svg"
import Link from "next/link";
import AppGalleryIcon from "@/assets/icons/downloadSection/AppGalleryIcon.svg";
import RuStoreIcon from "@/assets/icons/downloadSection/RuStoreIcon.svg";
import GooglePlayIcon from "@/assets/icons/downloadSection/GooglePlayIcon.svg"
import AppStoreIcon from "@/assets/icons/downloadSection/AppStoreIcon.svg";
import EmailSelector from "@/components/EmailSelector";
import {PHONE_MAIN} from "@/constants/global.constants";
import { BRAND_CONFIG } from "@/configs/brand";

const Footer = () => {
    const googlePlayLink = BRAND_CONFIG.stores.googlePlay;
    const ruStoreLink = BRAND_CONFIG.stores.ruStore;
    const appGalleryLink = BRAND_CONFIG.stores.appGallery ?? BRAND_CONFIG.stores.googlePlay;
    const appStoreLink = BRAND_CONFIG.stores.appStore;

    return (
        <footer className="w-full flex bg-white-500">
            <div className='max-w-base mx-auto w-full flex xs:flex-wrap gap-[24px]
            flex-col md:justify-start lg:flex-row lg:justify-between
            px-[24px] xs:px-[20px] sm:px-[40px] lg:px-[45px] 1144:px-[60px] 1144:pb-9 2xl:pr-[50px] 2xl:pl-[30px]
            py-[40px] pb-[96px]'>
                <div className="flex flex-col">
                    <Logo/>
                    <address className="flex flex-col not-italic text-primary-blue gap-[8px] lg:gap-[16px] mt-4 lg:mt-10">
                        <h4 className="font-bold text-[18px]">Есть вопросы?</h4>
                        <p className="flex flex-col gap-1 text-[16px] font-normal whitespace-pre-wrap xl:leading-[220%]">
                            <span>Звоните <a href={"tel:"+PHONE_MAIN} className="hover:underline whitespace-pre-line">{PHONE_MAIN}</a></span>
                            <span>Режим работы: пн-пт 9:00 – 18:00</span>
                            <span>Почта:
                            <EmailSelector email={BRAND_CONFIG.email} className="hover:underline scale-[103%] transition-transform duration-500">
                                {BRAND_CONFIG.email}
                            </EmailSelector>
                            </span>
                        </p>
                    </address>
                </div>

                <div className='flex flex-row flex-wrap md:gap-10 gap-[24px] text-[14px] justify-between'>
                    <div className='xs:max-w-[205px] xl:max-w-[205px] w-fit'>
                        <h4 className='text-primary-blue font-bold text-[18px]'>Сервис</h4>
                        <div className='flex flex-col xl:mt-[24px] mt-4 xl:gap-[8px] gap-[6px]'>
                            <Link href='/loyalty-program' className='w-fit text-blue-blueGray block hover:font-medium hover:text-primary-blue transition duration-300 '>Программа лояльности</Link>
                            <Link href='/terms-loyality' className='w-fit text-blue-blueGray block hover:font-medium hover:text-primary-blue transition duration-300 '>Условия программы лояльности</Link>
                            <Link href='/user-agreement' className='w-fit text-blue-blueGray block hover:font-medium hover:text-primary-blue transition duration-300 '>Пользовательское соглашение</Link>
                            <Link href='/personal-data-processing-policy' className='w-fit text-blue-blueGray block hover:font-medium hover:text-primary-blue transition duration-300 '>Политика обработки персональных данных</Link>
                            <Link href='/consent-processing-personal' className='w-fit text-blue-blueGray block hover:font-medium hover:text-primary-blue transition duration-300 '>Согласие на обработку персональных данных</Link>
                        </div>
                    </div>
                    <div className='xs:w-fit w-full flex flex-row xs:flex-col items-start justify-between'>
                        <div className='xs:max-w-[185px] w-fit flex flex-col justify-between'>
                            <h4 className='text-primary-blue font-bold text-[18px]'>Помощь</h4>
                            <div className='flex flex-col xl:gap-[16px] gap-[8px] xl:mt-[24px] mt-4'>
                                <Link href='/how-to-order' className='w-fit text-blue-blueGray block  hover:font-medium hover:text-primary-blue transition duration-300 '>Как сделать заказ</Link>
                                <Link href='/exchange-goods' className='w-fit text-blue-blueGray block hover:font-medium hover:text-primary-blue transition duration-300 '>Обмен и возврат</Link>
                                <Link href='/contact-us' className='w-fit text-blue-blueGray block hover:font-medium hover:text-primary-blue transition duration-300 '>Связаться с нами</Link>
                                <Link href='/pharmacy-addresses' className='w-fit text-blue-blueGray block hover:font-medium hover:text-primary-blue transition duration-300 '>Адреса аптек</Link>
                                <Link href='/questions' className='w-fit text-blue-blueGray block hover:font-medium hover:text-primary-blue transition duration-300 '>Часто задаваемые вопросы</Link>
                                <Link href='/feedback' className='w-fit text-blue-blueGray block hover:font-medium hover:text-primary-blue transition duration-300 '>Обратная связь</Link>
                            </div>
                        </div>
                        <div className='xs:hidden flex flex-col text-nowrap'>
                            <h4 className=' text-primary-blue font-bold text-[18px]'>Мы в соцсетях</h4>
                            <div className='flex flex-col gap-[6px] mt-2'>
                                <div className='flex flex-row gap-[6px] items-center'>
                                    <Link href='https://vk.com/aptekaantey' target="_blank">
                                        <Image
                                            src={VkIcon} alt='VKontakte icon'
                                            className='cursor-pointer hover:opacity-80 hover:scale-[105%] w-[40px] h-[40px] transition-transform duration-300' draggable={false} style={{ userSelect: "none" }}
                                        />
                                    </Link>
                                    <Link href='https://t.me/+T0Cj-7Tc7KBmYjAy' target="_blank">
                                        <Image
                                            src={TgIcon} alt='Telegram icon'
                                            className='cursor-pointer hover:opacity-80 hover:scale-[105%] w-[37px] h-[37px] transition-transform duration-300' draggable={false} style={{ userSelect: "none" }}
                                        />
                                    </Link>
                                    <Link href='https://max.ru/join/PDLrRQlocSI6W9DfJ_Ayl6l4WX5nEaQ7aKfMLBjxhQg' target="_blank">
                                        <Image
                                            src={MaxIcon} alt='Max icon'
                                            className='cursor-pointer hover:opacity-80 hover:scale-[105%] w-[37px] h-[37px] transition-transform duration-300' draggable={false} style={{ userSelect: "none" }}
                                        />
                                    </Link>
                                </div>
                                <div>
                                    <Link href='https://dzen.ru/aptekaantey' target="_blank">
                                        <Image
                                            src={DzenIcon} alt='Dzen icon'
                                            className='cursor-pointer hover:opacity-80 hover:scale-[105%] w-[37px] h-[37px] transition-transform duration-300' draggable={false} style={{ userSelect: "none" }}
                                        />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='xs:w-fit w-full flex flex-row xs:flex-col items-start justify-between'>
                        <div className='xs:max-w-[185px] w-fit flex flex-col'>
                            <h4 className='text-primary-blue font-bold text-[18px]'>Контакты</h4>
                            <div className='flex flex-col xl:mt-[24px] mt-4 gap-[8px]'>
                                <Link href='/pharmacy-antey' className='text-blue-blueGray  hover:font-medium hover:text-primary-blue transition duration-300 '>О нас</Link>
                                <Link href='/contacts' className='text-blue-blueGray hover:font-medium hover:text-primary-blue transition duration-300 '>Контактные данные</Link>
                                <Link href='/manufacturers' className='text-blue-blueGray hover:font-medium hover:text-primary-blue transition duration-300 '>Производителям</Link>
                                <Link href='/landlords' className='text-blue-blueGray hover:font-medium hover:text-primary-blue transition duration-300 '>Арендодателям</Link>
                                <Link href='/advertising' className='text-blue-blueGray hover:font-medium hover:text-primary-blue transition duration-300 '>Размещение рекламы</Link>
                                <Link href='/vacancies' className='text-blue-blueGray hover:font-medium hover:text-primary-blue transition duration-300 '>Вакансии и карьера</Link>
                                <Link href='/brands' className='text-blue-blueGray hover:font-medium hover:text-primary-blue transition duration-300 '>Наши партнеры</Link>
                                <Link href='/licenses' className='text-blue-blueGray hover:font-medium hover:text-primary-blue transition duration-300 '>Лицензии</Link>
                            </div>
                        </div>
                        <div className='flex flex-col xs:hidden gap-[16px]'>
                            <h4 className='text-primary-blue font-bold text-[18px] sm:max-w-[130px]'>Приложение</h4>
                            <div className='flex flex-col justify-between gap-[8px] '>
                                <Link href={googlePlayLink} target="_blank">
                                    <Image
                                        src={GooglePlayIcon} alt='Google icon'
                                        className='cursor-pointer hover:opacity-90 hover:invert-[10%] transition duration-200select-none' draggable={false}
                                    />
                                </Link>
                                <Link href={appGalleryLink} target="_blank">
                                    <Image
                                        src={AppGalleryIcon} alt='App Gallery icon'
                                        className='cursor-pointer hover:opacity-90 hover:invert-[10%] transition duration-200 select-none' draggable={false}
                                    />
                                </Link>
                                <Link href={ruStoreLink} target="_blank">
                                    <Image
                                        src={RuStoreIcon} alt='Ru Store icon'
                                        className='cursor-pointer hover:opacity-90 hover:invert-[10%] transition duration-200 select-none' draggable={false}
                                    />
                                </Link>
                                <Link href={appStoreLink} target="_blank">
                                    <Image
                                        src={AppStoreIcon} alt='App Store icon'
                                        className='cursor-pointer hover:opacity-90 hover:invert-[10%] transition duration-200 select-none' draggable={false}
                                    />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='hidden xs:flex w-full xl:w-fit sm:flex-row xl:flex-col gap-[10px] items-start justify-between'>
                    <div className='flex flex-col gap-[16px]'>
                        <h4 className='text-primary-blue font-bold text-[18px] sm:max-w-[130px]'>Приложение</h4>
                        <div className='flex justify-between gap-[8px] flex-col xs:flex-row xl:flex-col'>
                            <Link href={googlePlayLink} target="_blank">
                                <Image
                                    src={GooglePlayIcon} alt='Google icon'
                                    className='cursor-pointer hover:opacity-90 hover:invert-[10%] transition duration-200 select-none' draggable={false}
                                />
                            </Link>
                            <Link href={appGalleryLink} target="_blank">
                                <Image
                                    src={AppGalleryIcon} alt='App Gallery icon'
                                    className='cursor-pointer hover:opacity-90 hover:invert-[10%] transition duration-200 select-none' draggable={false}
                                />
                            </Link>
                            <Link href={ruStoreLink} target="_blank">
                                <Image
                                    src={RuStoreIcon} alt='Ru Store icon'
                                    className='cursor-pointer hover:opacity-90 hover:invert-[10%] transition duration-200 select-none' draggable={false}
                                />
                            </Link>
                            <Link href={appStoreLink} target="_blank">
                                <Image
                                    src={AppStoreIcon} alt='App Store icon'
                                    className='cursor-pointer hover:opacity-90 hover:invert-[10%] transition duration-200 select-none' draggable={false}
                                />
                            </Link>
                        </div>
                    </div>
                    <div className='xs:flex flex-col hidden xs:w-full xs:max-w-[142px] 2xl:max-w-[170px]'>
                        <h4 className=' text-primary-blue font-bold text-[18px] text-nowrap'>Мы в соцсетях</h4>
                        <div className='flex flex-col gap-[6px] mt-2'>
                            <div className='flex flex-row gap-[6px] items-center'>
                                <Link href='https://vk.com/aptekaantey' target="_blank">
                                    <Image
                                        src={VkIcon} alt='VKontakte icon'
                                        className='cursor-pointer w-[40px] h-[40px] hover:opacity-80 hover:scale-105 transition duration-200 select-none' draggable={false}
                                    />
                                </Link>
                                <Link href='https://t.me/+T0Cj-7Tc7KBmYjAy' target="_blank">
                                    <Image
                                        src={TgIcon} alt='Telegram icon'
                                        className='cursor-pointer w-[37px] h-[37px] hover:opacity-80 hover:scale-105 transition duration-200 select-none' draggable={false}
                                    />
                                </Link>
                                <Link href='https://max.ru/join/PDLrRQlocSI6W9DfJ_Ayl6l4WX5nEaQ7aKfMLBjxhQg' target="_blank">
                                    <Image
                                        src={MaxIcon} alt='Max icon'
                                        className='cursor-pointer w-[37px] h-[37px] hover:opacity-80 hover:scale-[105%] transition duration-200 select-none' draggable={false}
                                    />
                                </Link>
                                <Link href='https://dzen.ru/aptekaantey' target="_blank">
                                    <Image
                                        src={DzenIcon} alt='Dzen icon'
                                        className='cursor-pointer w-[37px] h-[37px] hover:opacity-80 hover:scale-[105%] transition duration-200 select-none' draggable={false}
                                    />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
