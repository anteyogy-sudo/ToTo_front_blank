// OrderBadgeStrictMap.tsx
import { cn } from "@/lib/utils";

type StatusCode =
    | "0" | "100" | "111"
    | "200" | "201" | "202" | "205" | "210" | "211" | "212" | "213"

interface Props {
    variant: StatusCode | number;
    device: "mobile" | "desktop";
}

export const OrderBadge = ({ variant, device }: Props) => {
    const code = String(variant) as StatusCode;

    const statusMap: Record<StatusCode, { label: string; color: string }> = {
        "0": { label: "В обработке", color: "bg-gold-500" },
        "100": { label: "Новый заказ", color: "bg-blue-medium" },
        "200": { label: "Принят аптекой", color: "bg-blue-medium" },
        "213": { label: "Ожидает выдачи", color: "bg-green-500" },
        "210": { label: "Получен", color: "bg-primary-blue" },
        "201": { label: "Частично принят аптекой", color: "bg-green-500" },
        "205": { label: "Истек срок хранения", color: "bg-gray-500" },
        "202": { label: "Отменен аптекой", color: "bg-primary-red" },
        "212": { label: "Отменен аптекой", color: "bg-primary-red" },
        "111": { label: "Отменен клиентом", color: "bg-primary-red" },
        "211": { label: "Отменен клиентом", color: "bg-primary-red" },
    };

    const current = statusMap[code] ?? { label: "Неизвестен", color: "bg-gray-300" };

    return (
        <div
            className={cn(
                "px-4 py-2 rounded-[99px] text-white-500 font-medium leading-[120%]",
                device === "mobile" ? "sm:hidden" : "sm:inline-block hidden",
                current.color
            )}
        >
            {current.label}
        </div>
    );
};
