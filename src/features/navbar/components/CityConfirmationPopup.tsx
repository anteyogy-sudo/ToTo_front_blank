"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Cookies from "js-cookie";

import { CityProps } from "@/types/city.types";
import { CitiesDialog } from "./CitiesDialog";
import { useCityStore } from "../stores/useCityStore";

interface Props {
    cities: CityProps[] | undefined;
    status: "error" | "success" | "pending";
}

const DEFAULT_CITY = {
    id: 34,
    name: "Вологда",
};

function useIsDesktop(query = "(min-width: 1144px)") {
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const media = window.matchMedia(query);

        const update = () => setIsDesktop(media.matches);
        update();

        media.addEventListener?.("change", update);
        return () => media.removeEventListener?.("change", update);
    }, [query]);

    return isDesktop;
}

export const CityConfirmationPopup = ({ cities, status }: Props) => {
    const [isCitiesDialogOpen, setIsCitiesDialogOpen] = useState(false);
    const [dismissed, setDismissed] = useState(false);
    const hasCityCookie = Boolean(Cookies.get("city"));

    const isDesktop = useIsDesktop();
    const { confirmCity } = useCityStore();

    const isVisible =
        !hasCityCookie &&
        status === "success" &&
        Boolean(cities?.length) &&
        !dismissed &&
        !isCitiesDialogOpen;

    const closePopup = () => {
        setDismissed(true);
    };

    const handleConfirm = () => {
        confirmCity(DEFAULT_CITY);
        setDismissed(true);
        setIsCitiesDialogOpen(false);
    };

    const handleSelectOther = () => {
        setIsCitiesDialogOpen(true);
    };

    const popupContent = (
        <div
            className="relative w-full max-w-md rounded-2xl border border-gray-200 bg-white p-4 shadow-lg"
            style={{ backgroundColor: "white" }}
        >
            <button
                onClick={closePopup}
                className="absolute right-2 top-2 text-gray-400 hover:text-gray-600"
                aria-label="Закрыть"
            >
                <X size={18} />
            </button>

            <p className="mb-4 text-left text-lg font-bold text-primary-blue">
                Ваш город Вологда?
            </p>

            <div className="flex gap-3">
                <button
                    onClick={handleSelectOther}
                    className="flex-1 rounded-xl border border-primary-blue bg-white px-3 py-2 font-medium text-primary-blue bg-white-500 "
                >
                    Нет, другой
                </button>

                <button
                    onClick={handleConfirm}
                    className="flex-1 rounded-xl px-3 py-2 font-medium text-white bg-primary-blue text-white-500"
                >
                    Да, всё верно
                </button>
            </div>
        </div>
    );

    return (
        <>
            <CitiesDialog
                open={isCitiesDialogOpen}
                onClose={() => setIsCitiesDialogOpen(false)}
                cities={cities}
                status={status}
            />

            {isVisible &&
                (isDesktop ? (
                    <div className="absolute left-[-10px] top-full z-[260] mt-2 w-[360px]">
                        {popupContent}
                    </div>
                ) : (
                    createPortal(
                        <div className="fixed left-1/2 top-40 z-[260] w-[calc(100%-32px)] max-w-md -translate-x-1/2">
                            {popupContent}
                        </div>,
                        document.body
                    )
                ))}
        </>
    );
};