"use client";

import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from "react-dom";
import { XIcon } from "@/icons/x-icon";
import {PHONE_MAIN} from "@/constants/global.constants";

const HowToOrderButton = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const modalRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        //ToDo: Эээйээйэйэ, у тебя ESLint'ер ругается красным!!!!!!!!!
        setMounted(true);
    }, []);

    const handleButtonClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    // Закрытие окна при нажатии ESC
    useEffect(() => {
        if (!isModalOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setIsModalOpen(false);
            }
        };

        const handleMouseDown = (e: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
                setIsModalOpen(false);
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("mousedown", handleMouseDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("mousedown", handleMouseDown);
        };
    }, [isModalOpen]);

    return (
        <>
            <button
                className="w-full h-[48px] text-white-500 font-medium text-[16px] sm:text-[15px] md:text-[15px] rounded-[8px] bg-blue-blueGray"
                onClick={handleButtonClick}
            >
                Как заказать?
            </button>

        {mounted && isModalOpen &&
            createPortal(
                <div className="fixed inset-0 z-[9999]">
                    {/* Темный фон с размытием */}
                    <div
                        className="absolute inset-0 backdrop-blur-md"
                        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                    />

                    {/* Модальное окно */}
                    <div className="relative flex items-center justify-center w-full h-full px-4 sm:px-6">
                        <div
                            ref={modalRef}
                            className="relative bg-gray-100 rounded-2xl shadow-2xl w-full sm:w-[80vw] md:w-[60vw] max-w-[520px] p-4 sm:p-5 md:p-6"
                        >
                            <div className="text-center">
                                {/* Заголовок */}
                                <h3 className="font-semibold text-[18px] sm:text-[22px] md:text-2xl mb-3 sm:mb-4 text-gray-900">Заказ товара</h3>

                                {/* Основной текст */}
                                <div className="text-gray-800 text-left mb-4 sm:mb-5 space-y-3 sm:space-y-4 md:space-y-5 text-[13px] sm:text-[15px] md:text-[18px] leading-relaxed">
                                    <p className="font-medium">Для заказа товара приглашаем Вас:</p>
                                    <div className="space-y-2 sm:space-y-3 pl-1 sm:pl-2">
                                        <p className="flex items-start">
                                            <span className="font-bold mr-2 shrink-0">1.</span>
                                            Посетить удобную аптеку
                                        </p>
                                        <p className="flex items-start">
                                            <span className="font-bold mr-2 shrink-0">2.</span>
                                            Сообщить наименование нужного препарата в аптеке и его можно забрать на следующий день
                                        </p>
                                    </div>
                                    <p className="font-medium pt-1 sm:pt-2">Подробности уточняйте по телефону:</p>
                                </div>

                                {/* Номер телефона */}
                                <a
                                    href={"tel:" + PHONE_MAIN}
                                    className="inline-block text-primary-blue font-bold text-[14px] sm:text-[16px] md:text-[20px] hover:text-primary-dark transition-colors py-2 sm:py-3 px-4 sm:px-6 bg-white rounded-lg border-2 border-blue-lightGrayBlue break-all"
                                >
                                    {PHONE_MAIN}
                                </a>
                            </div>

                            {/* Кнопка закрытия с вашей иконкой */}
                            <button
                                className="absolute top-2 right-2 sm:top-3 sm:right-3 text-gray-500 hover:text-destructive transition-colors p-1 rounded-full hover:bg-gray-200"
                                onClick={handleCloseModal}
                            >
                                <XIcon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                            </button>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </>
    );
};

export default HowToOrderButton;