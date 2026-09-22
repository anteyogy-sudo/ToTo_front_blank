export interface BrandResponseProps {
    data: BrandProps[];
    links: {
        first: string;
        last: string;
        prev: string | null;
        next: string | null;
    }
    meta: {
        current_page: number;
        from: number;
        last_page: number;
        links: {
           url: string | null;
           label: string;
           page: number | null;
           active: boolean;
        }[]
    }
    path: string;
    per_page: number;
    to: number;
    total: number;
}

export interface BrandProps {
    id: string;
    name: string;
    image: string;
    goods: number[];
}