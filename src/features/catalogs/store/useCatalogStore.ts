import { create } from "zustand";

type ViewType = "list" | "grid";

interface CatalogStore {
    view: ViewType;
    setView: (view: ViewType) => void;
}

export const useCatalogStore = create<CatalogStore>((set) => ({
    view: "grid",
    setView: (view) => set({ view }),
}));
