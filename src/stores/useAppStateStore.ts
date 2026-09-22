import { create } from "zustand";

interface AppState {
    isCityConfirmed: boolean;
    setCityConfirmed: (confirmed: boolean) => void;
}

export const useAppStateStore = create<AppState>((set) => ({
    isCityConfirmed: false,
    setCityConfirmed: (confirmed) => set({ isCityConfirmed: confirmed }),
}));