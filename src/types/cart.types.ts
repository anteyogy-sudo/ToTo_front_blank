export interface CartItemProps {
    id: number;
    amount: number;
}

export interface CartProps {
    sets: CartSetProps[];
    total: {
        price: number;
        fullPrice: number;
        bonus: number;
        amount: number;
        available: number;
        needRecipe: boolean;
        hasDiscount: boolean;
        discount: number;
    }
}

export interface CartSetProps {
    id: number | null;
    name?: string | null;
    goods: CartProductProps[];
    total: {
        price: number;
        fullPrice: number;
        bonus: number;
        amount: number;
        needRecipe: boolean;
        hasDiscount: boolean;
        discount: number;
    }
}

export interface CartProductProps {
    id: number;
    name: string;
    price: number;
    images: string[];
    isRecipe: boolean;
    amount: number;
    required: number;
    available: number;
    discount?: {
        id: number;
        amount: number;
        isRelative: boolean;
        isBonus: boolean;
        fullPrice: number;
    };
    bonus: number;
}