import { CartSetProps } from "@/types/cart.types";

export interface PharmacyBrandProps {
    id: number;
    name: string;
    logo: string;
}

export interface PharmacyProps {
    id: number;
    address: string;
    phone: string;
    phones?: string[];
    email: string | null;
    schedule: string;
    fullTime: boolean;
    brand?: PharmacyBrandProps;
    properties: {
        showBrand: boolean;
        enabled: boolean;
    };
    location: {
        latitude: number;
        longitude: number;
    };
}

export interface PharmacyStockTotalProps {
    price: number;
    fullPrice: number;
    bonus: number;
    amount: number;
    available: number;
    needRecipe: boolean;
    hasDiscount: boolean;
    discount: number;
}

export interface PharmacyStockProps extends PharmacyProps {
    sets: CartSetProps[];
    total: PharmacyStockTotalProps;
}

export interface PharmacyStocksResponse {
    data: PharmacyStockProps[];
}
