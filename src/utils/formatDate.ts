export const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
};

export function formatDateToDDMMYYYY(dateString: string): string {
    const [datePart] = dateString.split(" ");
    const [year, month, day] = datePart.split("-");
    return `${day}.${month}.${year}`;
}


