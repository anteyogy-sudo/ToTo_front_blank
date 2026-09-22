import { ProductProps } from "@/types/product.types";
import { create } from "zustand";

interface Props {
  products: ProductProps[];
  setProducts: (products: Props["products"]) => void;
}

export const useProductsStore = create<Props>((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
}));
