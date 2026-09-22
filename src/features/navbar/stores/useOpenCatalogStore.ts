import { create } from "zustand";

interface Props {
  openCatalog: boolean;
  setOpenCatalog: (value: boolean) => void;
}

export const useOpenCatalogStoreStore = create<Props>((set) => ({
    openCatalog: false,
    setOpenCatalog: (value) => set({ openCatalog: value }),
}));
