import React from 'react';
import DownloadBg from "@/assets/icons/downloadSection/downloadBg.svg"
import MobileImg from "@/assets/icons/downloadSection/MobileImg.svg"
import QrCode from "@/assets/icons/qr.svg"
import GooglePlayIcon from "@/assets/icons/downloadSection/GooglePlayIcon.svg"
import AppStoreIcon from "@/assets/icons/downloadSection/AppStoreIcon.svg"
import RuStoreIcon from "@/assets/icons/downloadSection/RuStoreIcon.svg"
import AppGalleryIcon from "@/assets/icons/downloadSection/AppGalleryIcon.svg"
import Image from "next/image";
import Link from "next/link";

const DownloadAntey = () => {
    const googlePlayLink = "https://play.google.com/store/apps/details?id=aptekaantey.ru.antey&hl=ru";
    const ruStoreLink = "https://www.rustore.ru/catalog/app/aptekaantey.ru.antey";
    const appGalleryLink = "https://appgallery.huawei.ru/app/C113974529";
    const appStoreLink = "https://apps.apple.com/us/app/аптека-антей/id6760655657";

    return (
       <div className='mt-6 max-w-base mx-auto bg-white-500 lg:pt-12 1144:pt-24 xl:pt-32 rounded-t-[16px] overflow-hidden'>
           <div className='w-full flex flex-col relative justify-center'>
               <div className='flex flex-col w-full lg:h-[300px] h-[430px] overflow-hidden lg:p-10 p-6'>
                   <Image
                       src={DownloadBg}
                       alt='download background' draggable={false}
                       className='w-full h-full object-cover absolute top-0 left-0 right-0 bottom-0 z-1 select-none'
                   />

                   <div className='flex flex-col w-full justify-center max-lg:items-center z-20'>
                       <h4 className='w-full font-bold xl:text-[52px] leading-[105%] lg:text-[48px] lg:text-start text-center text-[20px] text-black-100'>Скачайте приложение Антей</h4>
                       <p className='w-full xs:p-0 px-10  lg:text-[16px] text-[14px] lg:text-start text-center leading-[120%] font-normal'>Чтобы всегда быть в курсе новинок и акций</p>

                       <div className=' w-fit lg:mt-8 mt-4 flex gap-5 lg:justify-start justify-center'>
                           <Image src={QrCode} width={112} height={112} draggable={false} alt='QR code' className='lg:flex hidden bg-white-500 select-none' />
                           <div className='grid grid-cols-2 gap-2 items-center select-none'>
                               <Link href={googlePlayLink} target="_blank">
                                   <Image src={GooglePlayIcon}
                                          alt='Google icon'
                                          className='cursor-pointer hover:opacity-90 hover:invert-[7%] transition duration-200'/>
                               </Link>
                               <Link href={appGalleryLink} target="_blank">
                                   <Image src={AppGalleryIcon}
                                          alt='App Gallery icon'
                                          className='cursor-pointer hover:opacity-90 hover:invert-[7%] transition duration-200'/>
                               </Link>
                               <Link href={ruStoreLink} target="_blank">
                                   <Image src={RuStoreIcon}
                                          alt='Ru Store icon'
                                          className='cursor-pointer hover:opacity-90 hover:invert-[7%] transition duration-200'/>
                               </Link>
                               <Link href={appStoreLink} target="_blank">
                                   <Image src={AppStoreIcon}
                                          alt='App Store icon'
                                          className='cursor-pointer hover:opacity-90 hover:invert-[7%] transition duration-200'/>
                               </Link>
                           </div>
                       </div>
                   </div>

                   <Image
                       src={MobileImg}
                       alt='mobile img'
                       className='absolute object-contain select-none z-10
                       xl:w-[640px] 1144:w-[600px] lg:w-[530px]
                       xl:bottom-[-28%] lg:bottom-[-25%] lg:left-[54%]
                       bottom-[-15%] max-lg:max-w-[400px] max-lg:-translate-x-1/2 transform max-lg:left-[45%]'
                       // lg:top-[-64%] lg:w-[90%] xl:right-[-44%] 1144:right-[-40%] lg:right-[-38%]
                       draggable={false}
                   />
               </div>
           </div>
       </div>
    );
};

export default DownloadAntey;
