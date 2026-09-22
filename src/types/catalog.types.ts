export interface CatalogProps {
    id: number;
    name: string;
    image: string;
    text_color: string;
    categories: CatalogProps[]|null;
}