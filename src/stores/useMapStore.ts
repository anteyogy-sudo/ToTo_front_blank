import { DEFAULT_COORDS } from "@/constants/global.constants";
import { create } from "zustand";

interface Props {
  location: [number, number];
  zoom: number;
  setZoom: (zoom: Props["zoom"]) => void;
  setLocation: (location: Props["location"]) => void;
  resetLocation: () => void;
}

export const useMapStore = create<Props>((set) => {
  return {
    location: DEFAULT_COORDS,
    zoom: 17.3,
    setZoom: (zoom) => set({ zoom }),
    setLocation: (location) => set({ location }),
    resetLocation: () => set({ location: DEFAULT_COORDS, zoom: 17.3 }),
  };
});
