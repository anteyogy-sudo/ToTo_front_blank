import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PharmacyProps } from "@/types/pharmacy.types";

interface PharmacyStore {
    confirmedPharmacy: PharmacyProps | null;
    selectedPharmacy: PharmacyProps | null;
    setConfirmedPharmacy: (pharmacy: PharmacyProps | null) => void;
    setSelectedPharmacy: (pharmacy: PharmacyProps | null) => void;
    reset: () => void;

    isOpenChoosePharmacyDialog: boolean;
    setOpenChoosePharmacyDialog: (isOpenChoosePharmacyDialog: boolean) => void;

    isOpenChooseOnePharmacyDialog: boolean;
    setOpenChooseOnePharmacyDialog: (isOpenChoosePharmacyDialog: boolean) => void;
}

export const usePharmacyStore = create<PharmacyStore>()(
    persist(
        (set) => ({
            confirmedPharmacy: null,
            selectedPharmacy: null,
            isOpenChoosePharmacyDialog: false,
            isOpenChooseOnePharmacyDialog: false,

            setConfirmedPharmacy: (pharmacy) => set({ confirmedPharmacy: pharmacy }),
            setSelectedPharmacy: (pharmacy) => set({ selectedPharmacy: pharmacy }),
            reset: () => set({ confirmedPharmacy: null, selectedPharmacy: null }),

            setOpenChoosePharmacyDialog: (isOpenChoosePharmacyDialog) =>
                set({ isOpenChoosePharmacyDialog }),
            setOpenChooseOnePharmacyDialog: (isOpenChooseOnePharmacyDialog) =>
                set({ isOpenChooseOnePharmacyDialog }),
        }),
        {
            name: "pharmacy-storage",
            partialize: (state) => ({
                confirmedPharmacy: state.confirmedPharmacy,
            }),
        }
    )
);
