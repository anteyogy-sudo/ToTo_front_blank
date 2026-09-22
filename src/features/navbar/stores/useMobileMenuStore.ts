import { create } from "zustand";

interface Props {
  open: boolean;
  openCatalog: boolean;
  setOpen: (open: boolean) => void;
  setOpenCatalog: (openCatalog: boolean) => void;
}

export const useMobileMenuStore = create<Props>((set) => ({
  open: false,
    openCatalog: false,
  setOpen: (open) => set(() => ({ open })),
    setOpenCatalog: (openCatalog) => set(() => ({ openCatalog })),
}));
