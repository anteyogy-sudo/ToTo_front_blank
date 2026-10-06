"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { createPortal } from "react-dom";

import Ellipse1 from "@/assets/icons/blockmobileapp/Ellipse1.svg";
import Ellipse2 from "@/assets/icons/blockmobileapp/Ellipse2.svg";
import Ellipse3 from "@/assets/icons/blockmobileapp/Ellipse3.svg";
import DisplayPhone from "@/assets/icons/blockmobileapp/DisplayPhone.svg";
import Speaker from "@/assets/icons/blockmobileapp/Speaker.svg";
import Basket from "@/assets/icons/Basket.svg";
import Percent from "@/assets/icons/blockmobileapp/Percent.svg";
import Arrow from "@/assets/icons/blockmobileapp/Arrow.svg";
import QrCode from "@/assets/icons/qr.svg";
import VKicon from "@/assets/icons/VK-icon.svg";
import MAXicon from "@/assets/icons/MAX-icon.svg"
import {X} from "lucide-react";

interface BlockMobileAppProps {
    isVisible: boolean;
    setIsVisible: (value: boolean) => void;
    isCatalogOpen: boolean;
}

export const BlockMobileApp = ({ isVisible, setIsVisible, isCatalogOpen }: BlockMobileAppProps) => {
    const [isQrOpen, setIsQrOpen] = useState(false);

    const button = "https://4751071.redirect.appmetrica.yandex.com?appmetrica_tracking_id=677843326744939945&referrer=reattribution%3D1";

    const shouldRender = isVisible && !isCatalogOpen;

    if (!shouldRender) {
        return null;
    }

    return (
        <div
            className="w-full overflow-hidden"
            style={{ fontFamily: '"PT Root UI", sans-serif' }}
        >
            {/* Десктопная версия */}
            <div
                className="hidden lg:block w-full"
                style={{
                    background: "linear-gradient(90deg, hsl(var(--brand-navy)) 0%, hsl(var(--brand)) 48%, hsl(var(--brand-deep)) 64%, hsl(var(--brand)) 78%, hsl(var(--brand-stop-a)) 93%, hsl(var(--brand-stop-b)) 100%)",
                }}
            >
                <div className="relative mx-auto w-full max-w-[1440px] overflow-hidden px-4 py-5 md:px-6 md:py-6">
                    {/* Фоновые элементы */}
                    <div className="pointer-events-none absolute hidden z-10
                    xl:right-[80px] xl:top-[-130px] xl:block xl:h-[360px] xl:w-[1700px]
                    lg:right-[50px] lg:top-[-100px] lg:block lg:h-[300px] lg:w-[1200px]">
                        <Image
                            src={Ellipse1}
                            alt="Ellipse1"
                            fill
                            style={{ objectFit: "contain" }}
                            priority
                        />
                    </div>

                    <div className="pointer-events-none absolute hidden z-10
                    xl:left-[-105px] xl:top-[-135px] xl:block xl:h-[415px] xl:w-[380px]
                    lg:left-[-125px] lg:top-[-120px] lg:block lg:h-[310px] lg:w-[280px]">
                        <Image
                            src={Ellipse2}
                            alt="Ellipse2"
                            fill
                            style={{ objectFit: "contain" }}
                            priority
                        />
                    </div>

                    <div className="pointer-events-none absolute hidden z-20
                    xl:left-[70px] xl:top-[-23px] xl:block xl:h-[160px] xl:w-[160px]
                    lg:left-[18px] lg:top-[-16px] lg:block lg:h-[140px] lg:w-[140px]">
                        <Image
                            src={DisplayPhone}
                            alt="DisplayPhone"
                            fill
                            style={{ objectFit: "contain" }}
                            priority
                        />
                    </div>

                    <div className="pointer-events-none absolute hidden z-20
                    xl:left-[250px] xl:top-[-20px] xl:block xl:h-[85px] xl:w-[85px]
                    lg:left-[155px] lg:top-[-10px] lg:block lg:h-[65px] lg:w-[65px]">
                        <Image
                            src={Speaker}
                            alt="Speaker"
                            fill
                            style={{ objectFit: "contain" }}
                            priority
                        />
                    </div>

                    <div className="pointer-events-none absolute hidden z-20
                    xl:left-[250px] xl:top-[65px] xl:block
                    lg:left-[150px] lg:top-[60px] lg:block">
                        <p className="xl:text-[13px] lg:text-[11px] font-semibold leading-[1.2] text-surface">
                            низкие цены
                        </p>
                    </div>

                    <div className="pointer-events-none absolute hidden z-20
                    xl:left-[330px] xl:top-[-20px] xl:block xl:h-[155px] xl:w-[155px]
                    lg:left-[220px] lg:top-[-6px] lg:block lg:h-[120px] lg:w-[120px]">
                        <Image
                            src={Percent}
                            alt="Percent"
                            fill
                            style={{ objectFit: "contain" }}
                            priority
                        />
                    </div>

                    <div className="pointer-events-none absolute hidden z-20
                    xl:left-[450px] xl:top-[10px] xl:block
                    lg:left-[310px] lg:top-[10px] lg:block">
                        <p className="xl:text-[13px] lg:text-[11px] font-semibold leading-[1.2] text-surface">
                            скидки<br />
                            и акции
                        </p>
                    </div>

                    <div className="pointer-events-none absolute hidden z-20
                    xl:left-[500px] xl:top-[32px] xl:block xl:h-[85px] xl:w-[85px]
                    lg:left-[335px] lg:top-[40px] lg:block lg:h-[65px] lg:w-[65px]">
                        <Image
                            src={Basket}
                            alt="Basket"
                            fill
                            style={{ objectFit: "contain" }}
                            priority
                        />
                    </div>

                    <div className="pointer-events-none absolute hidden z-20
                    xl:left-[580px] xl:top-[55px] xl:block
                    lg:left-[400px] lg:top-[45px] lg:block">
                        <p className="xl:text-[13px] lg:text-[11px] font-semibold leading-[1.2] text-surface text-center">
                            более 20<br />
                            тысяч товаров
                        </p>
                    </div>

                    <div className="pointer-events-none absolute hidden z-20
                    xl:right-[360px] xl:top-[10px] xl:block
                    lg:right-[280px] lg:top-[13px] lg:block">
                        <p
                            className="font-semibold leading-[1.05] text-surface xl:text-[34px] lg:text-[26px]"
                            style={{ letterSpacing: "0.7px" }}
                        >
                            Установи приложение
                        </p>
                    </div>

                    <div className="pointer-events-none absolute hidden z-20
                    xl:right-[230px] xl:top-[55px] xl:block
                    lg:right-[230px] lg:top-[45px] lg:block
                    min-[1280px]:max-[1360px]:top-[50px] min-[1280px]:max-[1360px]:max-w-[360px]
                    min-[1023px]:max-[1136px]:top-[45px] min-[1023px]:max-[1136px]:max-w-[300px]">
                        <p
                            className="font-normal leading-[1.05] text-surface xl:text-[18px] lg:text-[16px]"
                            style={{ letterSpacing: "0.7px" }}
                        >
                            И пусть нужные лекарства будут с Вами повсюду
                        </p>
                    </div>

                    <div className="pointer-events-none absolute hidden z-20
                    xl:right-[215px] xl:top-[-33px] xl:block xl:h-[130px] xl:w-[130px]
                    lg:right-[180px] lg:top-[-15px] lg:block lg:h-[90px] lg:w-[90px]">
                        <Image
                            src={Arrow}
                            alt="Arrow"
                            fill
                            style={{ objectFit: "contain" }}
                            priority
                        />
                    </div>

                    {/* Кнопка */}
                    <div className="relative z-40 mx-auto flex w-full max-w-[1440px] items-center justify-end -mr-4 xl:-mr-4 lg:-mr-2">
                        <div className="ml-auto flex shrink-0 items-center gap-3 md:gap-4">
                            <button
                                type="button"
                                onClick={() => setIsQrOpen(true)}
                                className="inline-flex items-center justify-center rounded-[16px] px-5 py-2.5
                                transition-transform duration-200 hover:scale-[1.02] xl:px-7 xl:py-3 lg:px-4 lg:py-2.5"
                                style={{
                                    background: "linear-gradient(90deg, hsl(var(--brand-mist)) 0%, hsl(var(--brand-orchid)) 50%, #FFFFFF 100%)",
                                    border: "1px solid hsl(var(--brand-glow-soft) / 0.9)",
                                    boxShadow: "0 0 0 1px hsl(var(--brand-glow-soft) / 0.35), 0 0 22px hsl(var(--brand-glow-soft) / 0.55)",
                                    fontFamily: '"PT Root UI", sans-serif',
                                }}
                            >
                                <span className="text-[20px] font-semibold leading-none xl:text-[20px] lg:text-[16px]"
                                      style={{
                                          fontFamily: '"PT Root UI", sans-serif',
                                          backgroundImage: "linear-gradient(90deg, hsl(var(--brand-stop-d)) 0%, hsl(var(--brand-violet)) 100%)",
                                          WebkitBackgroundClip: "text",
                                          backgroundClip: "text",
                                          color: "transparent",
                                      }}
                                >
                                    Скачать
                                </span>
                            </button>

                            <button
                                type="button"
                                onClick={() => setIsVisible(false)}
                                className="relative w-10 h-10 flex shrink-0 items-center justify-center rounded-full
                                text-[rgb(202,202,202)] hover:text-white-500 transition-colors duration-200 hover:bg-white/25 "
                                aria-label="Закрыть"
                            >
                                <X className="w-7 h-7 z-10 stroke-2"/>
                            </button>
                        </div>
                    </div>

                    {/* Окошко */}
                    {isQrOpen &&
                        typeof window !== "undefined" &&
                        createPortal(
                            <>
                                {/* Затемнение */}
                                <div className="fixed inset-0 z-[9998]"
                                     style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                                     onClick={() => setIsQrOpen(false)}
                                />

                                {/* Модальное окно */}
                                <div className="pointer-events-none fixed inset-0 z-[9999] flex items-center justify-center px-4">
                                    <div className="pointer-events-auto relative flex h-[480px] w-[400px] flex-col items-center rounded-[30px] px-4 py-4"
                                         onClick={(e) => e.stopPropagation()}
                                         style={{
                                             background: "linear-gradient(180deg, #FFFFFF 36%, hsl(var(--brand-haze)) 52%, hsl(var(--brand-haze-2)) 95%)",
                                             fontFamily: '"PT Root UI", sans-serif',
                                         }}
                                    >
                                        <button type="button"
                                                onClick={() => setIsQrOpen(false)}
                                                className="absolute right-8 top-8 flex items-center justify-center
                                                 text-primary-blue hover:opacity-70 transition-opacity duration-300"
                                                aria-label="Закрыть окно"
                                        >
                                            <X className="w-8 h-8 stroke-2"/>
                                        </button>

                                        <div className="flex items-center justify-center pt-2">
                                            <Image src={QrCode}
                                                   alt="QR code"
                                                   width={180}
                                                   height={180}
                                                   className="h-auto w-[180px]"
                                                   priority
                                            />
                                        </div>

                                        <p
                                            className="mt-4 max-w-[560px] text-center text-[20px] font-semibold leading-[1.25] bg-clip-text text-transparent"
                                            style={{backgroundImage: "linear-gradient(90deg, hsl(var(--brand)) 0%, hsl(var(--brand-stop-c)) 100%)",}}
                                        >
                                            Для установки приложения отсканируйте QR-код с помощью<br /> мобильного телефона
                                        </p>

                                        <div className="mt-6 flex items-center justify-center gap-4">
                                            <Link href="https://vk.com/aptekaantey"
                                                  target="_blank"
                                                  rel="noopener noreferrer"
                                                  aria-label="VK"
                                                  className="inline-flex h-[64px] w-[64px] items-center justify-center transition-opacity hover:opacity-80"
                                            >
                                                <Image src={VKicon}
                                                       alt="VK"
                                                       width={64}
                                                       height={64}
                                                       className="h-full w-full object-contain"
                                                />
                                            </Link>

                                            <Link href="https://max.ru/join/PDLrRQlocSI6W9DfJ_Ayl6l4WX5nEaQ7aKfMLBjxhQg"
                                                  target="_blank"
                                                  rel="noopener noreferrer"
                                                  aria-label="MAX"
                                                  className="inline-flex h-[64px] w-[64px] items-center justify-center transition-opacity hover:opacity-80"
                                            >
                                                <Image src={MAXicon}
                                                       alt="MAX"
                                                       width={64}
                                                       height={64}
                                                       className="h-[92%] w-[92%] object-contain"
                                                />
                                            </Link>
                                        </div>

                                        <p className="mt-3 max-w-[320px] text-center text-[18px] font-semibold leading-[1.25] bg-clip-text text-transparent"
                                           style={{backgroundImage: "linear-gradient(90deg, hsl(var(--brand-stop-e)) 0%, hsl(var(--brand-plum)) 100%)",}}
                                        >
                                            Будь в курсе наших акций в<br /> любой момент!
                                        </p>
                                    </div>
                                </div>
                            </>,
                            document.body
                        )}
                </div>
            </div>

            {/* Мобильная версия */}
            <div className="lg:hidden -mx-4 md:-mx-6">
                <div className="relative w-full max-w-[1360px] overflow-hidden px-4 py-4 md:px-4 md:py-4"
                     style={{
                         background: "linear-gradient(90deg, hsl(var(--brand-stop-b)) 100%)", fontFamily: '"PT Root UI", sans-serif',
                     }}
                >
                    <div className="absolute top-0 left-[-20px] w-[820px] h-[115px]
                    min-[600px]:max-[800px]:w-[700px]
                    min-[600px]:max-[800px]:h-[115px]
                    min-[600px]:max-[800px]:left-[-40px]
                    min-[320px]:max-[600px]:w-[700px]
                    min-[320px]:max-[600px]:h-[115px]
                    min-[320px]:max-[650px]:left-[-45px]">
                        <Image
                            src={Ellipse3}
                            alt="Ellipse3"
                            fill
                            style={{ objectFit: "cover" }}
                            priority
                        />
                    </div>

                    <button
                        type="button"
                        onClick={() => setIsVisible(false)}
                        className="absolute right-[25px] top-3 z-30 flex h-10 w-10 items-center justify-center rounded-full
                        min-[120px]:max-[355px]:translate-x-0.1
                        min-[120px]:max-[355px]:top-6
                         text-[hsl(var(--brand-haze-3))] hover:text-white-500 transition-colors duration-500"
                        aria-label="Закрыть"
                    >
                        <X className="w-8 h-8 z-10 stroke-2"/>
                    </button>

                    <div className="relative z-20 flex w-full flex-col items-center justify-center text-center">
                        <p
                            className="w-full leading-[1.3] text-surface text-[16px] min-[120px]:max-[461px]:text-[12px]"
                            style={{
                                fontFamily: '"PT Root UI", sans-serif',
                                fontWeight: 500,
                            }}
                        >
                            <span style={{ fontWeight: 500 }}>Установи </span>
                            <span style={{ fontWeight: 700 }}>мобильное приложение </span>
                            <span style={{ fontWeight: 500 }}>Антей </span>
                            <span style={{ fontWeight: 500 }}>и пусть<br /> нужные лекарства будут с Вами повсюду </span>
                        </p>

                        <Link
                            href={button}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2 inline-flex h-[36px] w-[320px] items-center justify-center rounded-[16px]
                            px-6 transition-transform duration-200 hover:scale-[1.02]
                            min-[120px]:max-[461px]:h-[30px] min-[120px]:max-[461px]:w-[240px]"
                            style={{
                                background: "linear-gradient(90deg, hsl(var(--brand-azure)) 0%, hsl(var(--brand-glow)) 100%)",
                                boxShadow: "0 6px 8px hsl(var(--brand-shadow-a) / 0.9), 0 10px 24px hsl(var(--brand-azure) / 0.22)",
                                fontFamily: '"PT Root UI", sans-serif',
                            }}
                        >
                            <span
                                className="w-full leading-[1.3] text-surface text-[16px] min-[120px]:max-[461px]:text-[12px]"
                                style={{
                                    fontFamily: '"PT Root UI", sans-serif',
                                    fontWeight: 600,
                                    textShadow: "0 2px 6px rgba(0, 0, 0, 0.35)",
                                    letterSpacing: "0.7px",
                                }}
                            >
                                Скачать приложение
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlockMobileApp;