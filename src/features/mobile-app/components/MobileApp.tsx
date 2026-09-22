"use client"
import React from 'react';
import Image from 'next/image';

import Rectangle1 from "@/assets/icons/Rectangle 1.svg";
import Ellipse1 from "@/assets/icons/Ellipse 1.svg";
import GroupScreen from "@/assets/icons/Group Screen.svg";
import Arrow1 from "@/assets/icons/arrow 1.svg";
import Arrow2 from "@/assets/icons/arrow 2.svg";
import GooglePlay from "@/assets/icons/Google Play.svg";
import AppStore from "@/assets/icons/AppStore.svg";
import AppGallery from "@/assets/icons/AppGallery.svg";
import RuStore from "@/assets/icons/RuStore.svg";
import Rectangle2 from "@/assets/icons/Rectangle 2.svg";
import Cart from "@/assets/icons/Cart.svg";
import Heart from "@/assets/icons/Heart.svg";
import Ellipse2 from "@/assets/icons/Ellipse 2.svg";
import Rectangle3 from "@/assets/icons/Rectangle 3.svg";
import Speaker from "@/assets/icons/speaker.svg";
import Basket from "@/assets/icons/Basket.svg";
import Percent from "@/assets/icons/Percent.svg";
import QrCode from "@/assets/icons/qr.svg";

const MobileApp = () => {
    const googlePlayLink = "https://play.google.com/store/apps/details?id=aptekaantey.ru.antey&hl=ru";
    const ruStoreLink = "https://www.rustore.ru/catalog/app/aptekaantey.ru.antey";
    const appGalleryLink = "https://appgallery.huawei.ru/app/C113974529";
    const appStoreLink = "https://apps.apple.com/us/app/аптека-антей/id6760655657";

    return (
        <div className='w-full overflow-hidden'>
            {/* Верхняя часть страницы */}
            <div className="relative w-full h-[800px] md:h-[850px] max-md:h-[500px]">
                {/* Основной контейнер для верхней части */}
                <div className="relative w-full h-full">
                    {/* Эллипс */}
                    <div className="absolute w-[1350px] h-[1000px] top-[-150px] left-[-200px] transform rotate-[15deg] z-10
                                   xl:w-[1350px] xl:h-[1000px] xl:top-[-175px] xl:left-[-250px]
                                   lg:w-[1000px] lg:h-[800px] lg:top-[-120px] lg:left-[-190px] lg:rotate-[15deg]
                                   md:w-[800px] md:h-[700px] md:top-[-90px] md:left-[-180px] md:rotate-[15deg]
                                   max-md:w-[700px] max-md:h-[710px] max-md:top-[-85px] max-md:left-[-100px] max-md:rotate-[52deg]">
                        <Image
                            src={Ellipse1}
                            alt="Ellipse background"
                            fill
                            style={{ objectFit: 'contain' }}
                        />
                    </div>

                    {/* Верхний прямоугольник */}
                    <div className="absolute w-[120%] h-[500px] top-[-50px] left-[-10%] z-20
                                   xl:w-[120%] xl:h-[550px] xl:top-[-50px] xl:left-[-10%]
                                   lg:w-[110%] lg:h-[450px] lg:top-[-40px] lg:left-[-5%]
                                   md:w-[115%] md:h-[400px] md:top-[-30px] md:left-[-7%]
                                   max-md:h-[200px] max-md:left-[0%] max-md:w-[165%] max-md:top-[-10px]">
                        <Image
                            src={Rectangle1}
                            alt="Main background"
                            fill
                            style={{ objectFit: 'cover' }}
                            className="max-md:object-left"
                        />
                    </div>

                    {/* Стрелочка и текст для мобильных экранов */}
                    <div className="absolute top-[320px] left-[20px] z-50 md:hidden flex flex-col items-start
                    max-md:left-[10px]
                    max-sm:top-[400px] max-sm::left-[25px]
                    max-xs:top-[350px] max-xs:left-[25px]
                    max-none:top-[380px] max-none:left-[20px]">
                        <div className="w-[150px] h-[100px] relative">
                            <Image
                                src={Arrow2}
                                alt="Arrow 2"
                                fill
                                style={{ objectFit: 'contain' }}
                            />
                        </div>
                        {/* Текст под стрелочкой для мобильных экранов */}
                        <div className="px-1">
                            <h1 className="text-[32px] font-bold leading-[100%] bg-gradient-to-r from-[#12379C] to-[#04087C] bg-clip-text text-transparent
                            max-md:text-[28px] max-md:font-bold max-md:leading-[100%] max-md:bg-gradient-to-r max-md:bg-clip-text max-md:text-transparent
                            max-xs:text-[22px]
                            max-none:text-[20px]">
                                Установи<br/>приложение
                            </h1>
                        </div>
                    </div>

                    {/* Иконки магазинов для мобильных экранов */}
                    <div className="absolute top-[80px] right-[20px] z-40 md:hidden flex flex-col space-y-0.5
                    max-md:top-[140px] max-md:right-[200px]
                    max-sm:top-[140px] max-sm:right-[30px]
                    max-xs:top-[140px] max-xs:right-[10px]">
                        <a
                            href={googlePlayLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-[155px] h-[70px] relative cursor-pointer transition-opacity"
                        >
                            <Image
                                src={GooglePlay}
                                alt="Google Play"
                                fill
                                style={{ objectFit: 'contain' }}
                            />
                        </a>

                        <a
                            href={appStoreLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-[155px] h-[70px] relative cursor-pointer transition-opacity"
                        >
                            <Image
                                src={AppStore}
                                alt="AppStore"
                                fill
                                style={{ objectFit: 'contain' }}
                            />
                        </a>
                        <a
                            href={appGalleryLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-[155px] h-[70px] relative cursor-pointer transition-opacity"
                        >
                            <Image
                                src={AppGallery}
                                alt="AppGallery"
                                fill
                                style={{ objectFit: 'contain' }}
                            />
                        </a>
                        <a
                            href={ruStoreLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-[155px] h-[70px] relative cursor-pointer transition-opacity"
                        >
                            <Image
                                src={RuStore}
                                alt="RuStore"
                                fill
                                style={{ objectFit: 'contain' }}
                            />
                        </a>
                    </div>

                    {/* Экран мобильных телефонов */}
                    <div className="absolute w-[1500px] h-[955px] top-[-80px] left-[-310px] z-40
                                    xl:w-[1500px] xl:h-[955px] xl:top-[-80px] xl:left-[-310px]
                                    lg:w-[900px] lg:h-[800px] lg:top-[-40px] lg:left-[-100px]
                                    md:w-[700px] md:h-[700px] md:top-[-40px] md:left-[-110px]
                                    max-md:w-[500px] max-md:h-[450px] max-md:top-[1px] max-md:left-[-100px]
                                    max-sm:w-[550px] max-sm:h-[470px] max-sm:top-[1px] max-sm:left-[-80px]
                                    max-xs:w-[490px] max-xs:h-[380px] max-xs:top-[30px] max-xs:left-[-170px]
                                    max-none:w-[400px] max-none:h-[300px] max-none:top-[50px] max-none:left-[-200px]">
                        <Image
                            src={GroupScreen}
                            alt="Group Screen"
                            fill
                            style={{ objectFit: 'contain' }}
                        />
                    </div>

                    {/* Правая часть с текстом */}
                    <div className="absolute top-[40px] right-[120px] w-auto z-30
                                   xl:top-[60px] xl:right-[60px] xl:w-[360px]
                                   lg:top-[60px] lg:right-[30px] lg:w-[480px]
                                   md:top-[80px] md:right-[1px] md:w-[400px]
                                   max-md:hidden">
                        <div className="flex flex-col items-end">
                            {/* Стрелочка для больших экранов */}
                            <div className="relative w-[300px] h-[200px] mb-1 ml-auto mr-10
                                           xl:w-[300px] xl:h-[200px] xl:mr-10
                                           lg:w-[250px] lg:h-[170px] lg:mr-8
                                           md:w-[180px] md:h-[140px] md:mr-1">
                                <Image
                                    src={Arrow1}
                                    alt="Arrow 1"
                                    fill
                                    style={{ objectFit: 'contain' }}
                                />
                            </div>

                            {/* Текст для больших экранов */}
                            <div className="text-center mr-1
                                            lg:mr-1
                                            md:mr-0.5">
                                <div className="bg-white inline-block px-6 py-3 rounded-lg shadow-sm">
                                    <h1 className="text-[47px] font-bold leading-[100%] text-[#005CA7] mb-6">
                                        Установи приложение
                                    </h1>
                                </div>
                            </div>

                            {/* Иконки магазинов приложений для ПК и планшетов */}
                            <div className="flex flex-col items-end">
                                <div className="flex flex-col mb-10 lg:mb-8 md:mb-6">
                                {/* Первая строка с двумя иконками */}
                                <div className="flex gap-5 justify-end mr-8 lg:gap-4 lg:mr-6 md:gap-3 md:mr-4">
                                    <a
                                        href={googlePlayLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-[180px] h-[80px] relative cursor-pointer transition-opacity
                                                 lg:w-[150px] lg:h-[70px]
                                                 md:w-[130px] md:h-[60px]"
                                    >
                                        <Image
                                            src={GooglePlay}
                                            alt="Google Play"
                                            fill
                                            style={{ objectFit: 'contain' }}
                                        />
                                    </a>

                                    <a
                                        href={appStoreLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-[180px] h-[80px] relative cursor-pointer transition-opacity
                                                 lg:w-[150px] lg:h-[70px]
                                                 md:w-[130px] md:h-[60px]"
                                    >
                                        <Image
                                            src={AppStore}
                                            alt="AppStore"
                                            fill
                                            style={{ objectFit: 'contain' }}
                                        />
                                    </a>
                                </div>

                                {/* Вторая строка с двумя иконками */}
                                <div className="flex gap-5 justify-end mr-8 mt-4 lg:gap-4 lg:mr-6 md:gap-3 md:mr-4 md:mt-3">
                                    <a
                                        href={appGalleryLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-[180px] h-[80px] relative cursor-pointer transition-opacity
                                                 lg:w-[150px] lg:h-[70px]
                                                 md:w-[130px] md:h-[60px]"
                                    >
                                        <Image
                                            src={AppGallery}
                                            alt="AppGallery"
                                            fill
                                            style={{ objectFit: 'contain' }}
                                        />
                                    </a>
                                    <a
                                        href={ruStoreLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-[180px] h-[80px] relative cursor-pointer transition-opacity
                                                 lg:w-[150px] lg:h-[70px]
                                                 md:w-[130px] md:h-[60px]"
                                    >
                                        <Image
                                            src={RuStore}
                                            alt="RuStore"
                                            fill
                                            style={{ objectFit: 'contain' }}
                                        />
                                    </a>
                                </div>
                            </div>

                            {/* Прямоугольник с QR-кодом */}
                                <div className="relative w-[350px] h-[125px] mx-auto
                                               xl:w-[350px] xl:h-[125px]
                                               lg:w-[300px] lg:h-[110px]
                                               md:w-[250px] md:h-[100px]">
                                    <Image
                                        src={Rectangle2}
                                        alt="QR Code Background"
                                        fill
                                        style={{ objectFit: 'fill' }}
                                        className="w-full h-full"
                                    />
                                    {/* Контент внутри прямоугольника */}
                                    <div className="absolute inset-0 flex items-center px-4
                                                   xl:px-4
                                                   lg:px-3
                                                   md:px-1">
                                        {/* QR код */}
                                        <div className="rounded-md bg-white-500 w-24 h-24 relative mr-4 flex-shrink-0 ml-[12px]
                                                       xl:w-24 xl:h-24
                                                       lg:w-20 lg:h-20 lg:mr-3
                                                       md:w-16 md:h-16 md:mr-2">
                                            <Image
                                                src={QrCode}
                                                alt="QR Code"
                                                fill
                                                style={{ objectFit: 'contain' }}
                                            />
                                        </div>
                                        {/* Текст справа */}
                                        <p className="text-[18px] font-bold text-[#12379C] leading-[1.2]
                                                    xl:text-[18px]
                                                    lg:text-[16px]
                                                    md:text-[14px]">
                                            Наведите камеру<br />
                                            на QR-код, чтобы<br />
                                            скачать<br />
                                            приложение
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Середина страницы */}
            <div className="relative mt-32 px-[150px] mb-40 max-md:px-5 max-md:mt-20 max-md:mb-10
                2xl:mt-32 2xl:px-[150px]
                xl:mt-24 xl:px-[100px]
                lg:-mt-24 lg:px-[60px]
                md:-mt-44 md:px-[40px]
                sm:px-[20px]">
                <div className="relative flex justify-between min-h-[500px] max-md:flex-col max-md:min-h-0
                    2xl:min-h-[500px]
                    xl:min-h-[450px]
                    lg:min-h-[400px]
                    md:min-h-[350px]">
                    {/* Иконка сердца слева скрыта на мобильных */}
                    <div className="absolute left-[-350px] top-[310px] w-[650px] h-[650px] z-20 max-md:hidden
                        2xl:left-[-350px] 2xl:top-[310px] 2xl:w-[650px] 2xl:h-[650px]
                        xl:left-[-250px] xl:top-[260px] xl:w-[550px] xl:h-[550px]
                        lg:left-[-200px] lg:top-[280px] lg:w-[450px] lg:h-[450px]
                        md:left-[-150px] md:top-[320px] md:w-[350px] md:h-[350px]">
                        <Image
                            src={Heart}
                            alt="Heart"
                            fill
                            style={{ objectFit: 'contain' }}
                        />
                    </div>

                    {/* Текст по центру */}
                    <div className="relative z-30 flex-1 max-w-2xl text-left ml-12 -mt-16
                        max-md:mt-4 max-md:ml-0 max-md:max-w-none
                        2xl:max-w-2xl 2xl:ml-12
                        xl:max-w-xl xl:ml-10
                        lg:max-w-lg lg:ml-8
                        md:max-w-md md:ml-6
                        sm:max-w-full sm:ml-0">
                        {/* Заголовок */}
                        <h2 className="text-[46px] font-bold leading-[120%] text-[#2255B6] mb-8 max-md:text-[28px] max-md:ml-5 max-md:mb-6
                            2xl:text-[46px] 2xl:mb-8
                            xl:text-[40px] xl:mb-7
                            lg:text-[38px] lg:mb-6
                            md:text-[34px] md:mb-5
                            sm:text-[28px] sm:pt-20">
                            Забота о вашем здоровье<br />
                            начинается здесь
                        </h2>

                        {/* Текст с описанием */}
                        <div className="text-[#2255B6] text-[26px] font-medium font-inter leading-relaxed space-y-2 max-md:text-[22px] max-md:ml-5 max-md:space-y-3
                            2xl:text-[26px] 2xl:space-y-2
                            xl:text-[24px] xl:space-y-2
                            lg:text-[22px] lg:space-y-2
                            md:text-[20px] md:space-y-3
                            sm:text-[20px] sm:space-y-3">
                            <p>
                                Мы создали мобильное приложение &quot;Аптека Антей&quot;
                            </p>
                            <p className="relative z-30">
                                Мы заботимся о наших клиентах,<br />
                                с возможностью искать медикаменты,<br />
                                сравнивать цены,<br />
                                бронировать товары для самовывоза<br />
                            </p>
                            <p>
                                Приложение помогает экономить время и<br />
                                упрощает процесс покупки медикаментов<br />
                            </p>
                        </div>

                        {/* Иконки для мобильных экранов */}
                        <div className="hidden max-md:flex max-md:justify-between max-md:items-center max-md:mt-8 max-md:px-5 max-md:relative max-md:h-[400px]">
                            {/* Иконка тележки слева */}
                            <div className="absolute left-[-80px] top-[-50px] w-[320px] h-[320px] z-20">
                                <Image
                                    src={Cart}
                                    alt="Cart"
                                    fill
                                    style={{
                                        objectFit: 'contain',
                                        opacity: 0.9
                                    }}
                                />
                            </div>

                            {/* Иконка сердца справа */}
                            <div className="absolute right-[-30px] top-[-100px] w-[250px] h-[250px] z-20">
                                <Image
                                    src={Heart}
                                    alt="Heart"
                                    fill
                                    style={{ objectFit: 'contain' }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Иконка тележки справа скрыта на мобильных */}
                    <div className="absolute left-[475px] top-[-5px] w-[650px] h-[650px] z-20 max-md:hidden
                        2xl:left-[475px] 2xl:top-[-5px] 2xl:w-[650px] 2xl:h-[650px]
                        xl:left-[380px] xl:top-[-10px] xl:w-[550px] xl:h-[550px]
                        lg:left-[440px] lg:top-[-10px] lg:w-[450px] lg:h-[450px]
                        md:left-[310px] md:top-[60px] md:w-[350px] md:h-[350px]">
                        <Image
                            src={Cart}
                            alt="Cart"
                            fill
                            style={{
                                objectFit: 'contain',
                                opacity: 0.9
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Низ страницы */}
            <div className="relative h-[1100px] md:h-[850px] lg:h-[950px] max-md:h-[700px]">
                {/* Эллипс */}
                <div className="absolute w-[830px] h-[1000px] top-[-535px] right-[0px] z-10
                    md:w-[600px] md:h-[900px] md:top-[-400px] md:right-[-50px]
                    lg:w-[700px] lg:h-[900px] lg:top-[-555px] lg:right-[-30px]
                    max-md:w-[600px] max-md:h-[800px] max-md:top-[-630px] max-md:right-auto max-md:left-[170px]">
                    <Image
                        src={Ellipse2}
                        alt="Ellipse 2"
                        fill
                        style={{ objectFit: 'contain' }}
                        className="max-md:object-left"
                    />
                </div>

                {/* Прямоугольник */}
                <div className="relative w-[100%] h-[1000px] top-[-170px] mt-20 mx-auto z-20
                    md:h-[750px] md:top-[-80px]
                    lg:h-[850px] lg:top-[-120px]
                    max-md:h-[700px] max-md:top-[-290px] max-md:w-[100%]">
                    <Image
                        src={Rectangle3}
                        alt="Rectangle 3"
                        fill
                        style={{ objectFit: 'cover' }}
                        className="max-md:object-right"
                    />

                    {/* Контент */}
                    <div className="absolute inset-0 z-30 h-full flex items-center justify-center px-[100px]
                        md:px-[40px] md:items-start md:pt-[200px]
                        lg:px-[60px] lg:items-center lg:pt-0
                        max-md:px-4 max-md:items-center max-md:justify-start">

                        {/* Основной контент справа */}
                        <div className="relative w-full max-w-[500px] md:max-w-[100px] lg:max-w-[450px]
                            max-md:max-w-full max-md:flex max-md:flex-col max-md:items-center max-md:justify-center max-md:h-full">

                            {/* Текст */}
                            <div className="text-left md:w-full md:max-w-[350px] md:text-left md:flex md:flex-col md:items-start
                                max-md:w-full max-md:max-w-[280px] max-md:text-left max-md:flex max-md:flex-col max-md:items-center max-md:mt-[-90px]">
                                {/* Заголовок */}
                                <h2 className="text-[46px] font-bold leading-[120%] text-[#F7F7F7] mb-8 whitespace-nowrap
                                    md:text-[34px] md:mb-6 md:whitespace-normal
                                    lg:text-[40px] lg:mb-7
                                    max-md:text-[28px] max-md:whitespace-normal max-md:mb-6 max-md:w-full">
                                    Легко, комфортно и выгодно!
                                </h2>

                                {/* Текст с описанием */}
                                <div className="text-[#F7F7F7] text-[26px] font-medium leading-relaxed space-y-3
                                    md:text-[20px] md:leading-tight md:space-y-4
                                    lg:text-[22px] lg:space-y-4
                                    max-md:text-[22px] max-md:leading-tight max-md:space-y-6 max-md:w-full">
                                    <p className="relative z-30 max-md:w-full">
                                        Получи привилегии карты Антей!<br />
                                        Низкие цены<br />
                                        Скидки и акции<br />
                                        Более 20 тысяч товаров<br />
                                    </p>
                                </div>
                            </div>

                            {/* Иконка громкоговорителя */}
                            <div className="absolute left-[-380px] top-[95px] z-20 w-[300px] h-[300px]
                                md:left-[-285px] md:top-[100px] md:w-[220px] md:h-[220px]
                                lg:left-[-250px] lg:top-[120px] lg:w-[260px] lg:h-[260px]
                                max-md:left-[-20px] max-md:top-[480px] max-md:w-[200px] max-md:h-[200px]">
                                <Image
                                    src={Speaker}
                                    alt="Speaker"
                                    fill
                                    style={{ objectFit: 'contain' }}
                                />
                            </div>

                            {/* Иконка корзины */}
                            <div className="absolute left-[-190px] top-[400px] z-20 w-[350px] h-[350px]
                                md:left-[-270px] md:top-[450px] md:w-[250px] md:h-[250px]
                                lg:left-[-140px] lg:top-[380px] lg:w-[280px] lg:h-[280px]
                                max-md:left-[180px] max-md:top-[405px] max-md:w-[220px] max-md:h-[220px]">
                                <Image
                                    src={Basket}
                                    alt="Basket"
                                    fill
                                    style={{ objectFit: 'contain' }}
                                />
                            </div>

                            {/* Иконка процента */}
                            <div className="absolute left-[340px] top-[320px] z-20 w-[450px] h-[450px]
                                md:left-[170px] md:top-[310px] md:w-[300px] md:h-[300px]
                                lg:left-[340px] lg:top-[300px] lg:w-[350px] lg:h-[350px]
                                max-md:left-[260px] max-md:top-[580px] max-md:translate-x-[-50%] max-md:w-[350px] max-md:h-[360px]">
                                <Image
                                    src={Percent}
                                    alt="Percent"
                                    fill
                                    style={{ objectFit: 'contain' }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Кнопка установить*/}
                <div className="absolute bottom-[30px] left-0 right-0 z-40
                    md:bottom-[15px]
                    lg:bottom-[25px]
                    max-md:bottom-[5px]">
                    <div className="w-full px-6 md:px-8 lg:px-10">
                        <a
                            href="https://play.google.com/store/apps/details?id=aptekaantey.ru.antey&hl=ru"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block bg-[#005CA7] hover:bg-[#004A8A] w-full py-1.5 md:py-2 lg:py-3 rounded-lg text-center transition-colors duration-200"
                        >
                            <span className="text-[#F7F7F7] text-[26px] font-medium
                                md:text-[22px] md:font-semibold
                                lg:text-[24px]
                                max-md:text-[20px]">Установить</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileApp;