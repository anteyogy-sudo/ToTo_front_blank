import Link from "next/link";
import NoFavoritesIcon from '@/assets/resources/NoFavorites.svg'
import {LineSVG} from "@/icons/line";
import React from "react";
import Image from "next/image";
import {useOpenCatalogStoreStore} from "@/features/navbar/stores/useOpenCatalogStore";

export const NoFavorites = () => {

    const {setOpenCatalog} = useOpenCatalogStoreStore()

  return (
    <div className="w-full flex flex-col gap-6">

        <header className=" w-full">
            <div className=" w-fit flex items-center gap-2.5">
                <Link
                    href="/"
                    className=" text-primary-gray leading-[120%] hover:text-black-500"
                >
                    Главная
                </Link>
                <LineSVG />
                <span className=" leading-[120%] font-medium">Избранное</span>
            </div>
        </header>

        <div className='w-full lg:mt-0 mt-[-70px]  flex flex-col items-center justify-center '>
            <Image src={NoFavoritesIcon} alt='icon'/>

            <p className='font-medium text-[20px] lg:w-fit w-[252px] leading-[100%] lg:mt-0 mt-[-50px] text-center text-primary-blue'>В списке избранных нет <span className='font-bold'>ни одного</span> товара</p>
            <button
                onClick={() => setOpenCatalog(true)}
                className="h-[62px] lg:gap-4 lg:mt-10 mt-10  gap-2 max-w-[337px] w-full font-bold flex justify-center items-center text-white-500 rounded-[16px] bg-primary-blue"
            >
                Перейти в каталог
            </button>
        </div>

      {/*<div className=" w-full flex flex-col gap-4">*/}
      {/*  <p className="font-bold 1144:text-[40px] text-[32px] text-black-100 leading-[100%]">*/}
      {/*    В избранном пусто*/}
      {/*  </p>*/}
      {/*  <p className="font-normal flex items-center gap-2 text-primary-black-gray text-[24px] leading-[120%]">*/}
      {/*    Добавляйте товары в избранное, через кнопку*/}
      {/*    <OutlinedHeart />*/}
      {/*  </p>*/}
      {/*</div>*/}


    </div>
  );
};
