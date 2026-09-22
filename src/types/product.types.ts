export interface Image {
    id: number;
    filename: string;
    url: string;
}

export interface DiscountData {
    amount: number;
    isRelative: boolean; // true - %, false - RUB
    fullPrice: number; // Цена без скидки
    id: number;
    isBonus?: boolean;
}

export interface ProductProps {
    id: number; // ИД-товара
    name: string; // Название товара
    code?: number; // Код товара
    series?: number; // Партия
    images: string[]; // Изображения товара

    required: number; // Сколько в корзине
    available: number; // Сколько доступно

    price?: number; // Цена товара
    discount?: DiscountData; // Скидка
    bonus?: number; // Бонус
    isRecipe: boolean; // Рецепт
    isDeprecated?: boolean;

    availableAt: number | null;

    meta?: {
        art?: string;
        country?: string;
        producer?: string;
        form?: string;
        vendor?: string;
        activeSubstance?: string;
    }
}

export interface ProductsDaysProps {
    data: ProductProps[];
    meta: {
        current_page: number;
        from: number;
        last_page: number;
        path: string;
        per_page: number;
        to: number;
        total: number;
    }
}
