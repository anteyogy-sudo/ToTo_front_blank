export interface PromotionProps {
    id: number;
    title: string;
    image: string;
    products: number[];
    expirationAt?: string;
    dateFrom?: string;
    description?: string;
}