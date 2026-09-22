'use client';

import React, { useState } from 'react';
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import Link from "next/link";

const COOKIE_NAME = 'allowCookies';

const AllowCookies = () => {
    const [show, setShow] = useState(false);
    const [isTabletOrAbove, setIsTabletOrAbove] = useState(false);

    useIsomorphicLayoutEffect(() => {
        const hasConsent = document.cookie
            .split('; ')
            .find((row) => row.startsWith(`${COOKIE_NAME}=`));

        if (!hasConsent) {
            setShow(true);
        }

        const checkScreenSize = () => {
            setIsTabletOrAbove(window.innerWidth >= 768);
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);

        return () => {
            window.removeEventListener('resize', checkScreenSize);
        };
    }, []);

    const handleAccept = () => {
        document.cookie = `${COOKIE_NAME}=true; path=/; max-age=${60 * 60 * 24 * 365}`;
        setShow(false);
    };

    if (!show) return null;

    return isTabletOrAbove ? (
        <div className="fixed bottom-[20px] left-[15px] z-[240] flex h-[153px] w-full max-w-[402px] flex-col items-center gap-[20px] rounded-[16px] bg-white-500 px-[25px] py-[22px] shadow-[0_0_16px_0_#00000026]">
            <p className="font-bold text-[18px] leading-[120%] text-black-500">
                Мы используем файлы cookie для вашего удобства пользования сайтом.{" "}
                <Link href="/user-agreement"  className="text-primary-blue underline underline-offset-2">Подробнее</Link>
            </p>
            <button
                onClick={handleAccept}
                className="flex h-[48px] w-[289px] items-center justify-center rounded-[16px] bg-primary-blue font-bold text-[18px] leading-[120%] text-white-500"
            >
                Спасибо, понятно
            </button>
        </div>
    ) : (
        <>
            {/* Затемнение */}
            <div
                className="fixed inset-0 z-[100]"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            />
            {/* Окно */}
            <div className="fixed bottom-4 left-1/2 z-[240] flex w-[calc(100%-32px)] max-w-[400px] -translate-x-1/2 flex-col items-center gap-[17px] rounded-[16px] bg-white-500 px-6 py-5 shadow-[0_0_16px_0_#00000026]">
                <p className="text-center font-bold text-[16px] leading-[120%] text-black-500">
                    Мы используем файлы cookie для вашего удобства пользования сайтом.{" "}
                    <Link href="/user-agreement" className="text-primary-blue underline underline-offset-2">Подробнее</Link>
                </p>
                <button
                    onClick={handleAccept}
                    className="flex h-[48px] w-full max-w-[289px] items-center justify-center rounded-[16px] bg-primary-blue font-bold text-[18px] leading-[120%] text-white-500"
                >
                    Спасибо, понятно
                </button>
            </div>
        </>
    );
};

export default AllowCookies;