import { create } from "zustand";

interface Props {
  isOpenOrderSlide: boolean;
  setOpenOrderSlide: (value: boolean) => void;
}

export const useOrderStore = create<Props>((set) => ({
  isOpenOrderSlide: false,
  setOpenOrderSlide: (value) => set({ isOpenOrderSlide: value }),
}));
