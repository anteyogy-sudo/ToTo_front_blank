"use client";

import { ChoosePharmacyButton } from "./choose-pharmacy-button";
import { usePharmacyStore } from "@/stores/usePharmacyStore";
import {useIsomorphicLayoutEffect} from "@/hooks/useIsomorphicLayoutEffect";

export const ChoosePharmacy = () => {
    const { confirmedPharmacy } = usePharmacyStore();
    // const { reset: resetPharmacy } = usePharmacyStore.getState();

    useIsomorphicLayoutEffect(() => {}, [confirmedPharmacy]);

    return (
        <div className="w-full h-fit flex flex-col gap-6 p-6 rounded-2xl bg-white-500 shadow-sm">
            <p className="font-bold md:text-[24px] text-[20px] leading-[120%]">
                Аптека для получения
            </p>

            { confirmedPharmacy && (
                <div className="font-bold text-[24px] leading-[100%]">
                    {confirmedPharmacy.address}
                </div>
            )}

            {/*<ChoosePharmacyButton />*/}
        </div>
    );
};
