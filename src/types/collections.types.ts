export interface CollectionsProps {
    id: number;
    title: string;
    shortTitle: string;
    description: string;
    url: string;
    image: string;
    position: {
        column: {
            start: number
            end: number
        }
        row: {
            start: number
            end: number
        }
    }
}



