export interface StockProps {
        id: number;
        address: string;
        phone: string;
        email: string;
        schedule: string;
        fullTime: boolean;
        properties: {
            showBrand: boolean;
            enabled: boolean
        }
        location: {
            latitude: number;
            longitude: number;
        }
        brand: string;
        city: string;
        city_id: number;
        /** Остаток на складе — используется в ProductMap и PharmacyListItem */
        quantity_in_stock?: number;
        /** Цена товара — используется в PharmacyListItem */
        website_price?: number;
}