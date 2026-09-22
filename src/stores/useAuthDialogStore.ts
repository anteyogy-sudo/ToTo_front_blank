import { create } from "zustand";

interface Props {
  withRedirect: boolean;
  isOpenLoginDialog: boolean;
  setWithRedirect: (value: boolean) => void;
  setIsOpenLoginDialog: (open: boolean) => void;
}

export const useAuthDialogStore = create<Props>((set) => ({
  isOpenLoginDialog: false,
  withRedirect: true,
  setWithRedirect: (value) => set({ withRedirect: value }),
  setIsOpenLoginDialog(value) {
    set({ isOpenLoginDialog: value });
  },
}));
