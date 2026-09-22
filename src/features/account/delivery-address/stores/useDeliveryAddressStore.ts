import { create } from "zustand";

interface Props {
  openCreate: boolean;
  openEdit: boolean;
  setOpenCreate: (open: boolean) => void;
  setOpenEdit: (open: boolean) => void;
}

export const useDeliveryAddressStore = create<Props>((set) => ({
  openCreate: false,
  setOpenCreate(open) {
    set(() => ({ openCreate: open }));
  },
  openEdit: false,
  setOpenEdit(open) {
    set(() => ({ openEdit: open }));
  },
}));
