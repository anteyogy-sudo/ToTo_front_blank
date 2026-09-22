import { create } from "zustand";

interface Props {
  smsError: string | null;
  confirmCodeError: string | null;
  setSmsError: (error: Props["smsError"]) => void;
  setConfirmCodeError: (error: Props["confirmCodeError"]) => void;
}

export const useLoginStore = create<Props>((set) => ({
  smsError: null,
  confirmCodeError: null,
  setSmsError: (error) => set({ smsError: error }),
  setConfirmCodeError: (error) => set({ confirmCodeError: error }),
}));
