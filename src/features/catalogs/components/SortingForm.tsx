"use client";

import { ListItems } from "@/components/ListItems";
import { Checkbox } from "@/components/ui/checkbox";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const sortingOptions = [
    { id: "popular", label: "По популярности", value: "popular" },
    { id: "by_ascending_price", label: "По возрастанию цены", value: "by_ascending_price" },
    { id: "by_descending_price", label: "По убыванию цены", value: "by_descending_price" },
    { id: "az", label: "По названию (А-Я)", value: "az" },
    { id: "za", label: "По названию (Я-А)", value: "za" },
];

interface Props {
    onClose?: () => void;
    hideNameSort?: boolean;
    availableSorts?: string[];
}

export const SortingForm = ({ onClose, hideNameSort = false, availableSorts }: Props) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const selectedSortOption = searchParams.get("sort");

    const [selected, setSelected] = useState(selectedSortOption || "popular");

    useEffect(() => {
        setSelected(selectedSortOption || "popular");
    }, [selectedSortOption]);

    let options = sortingOptions;

    // Если передан availableSorts оставляем только указанные значения
    if (availableSorts) {
        options = options.filter(opt => availableSorts.includes(opt.value));
    } else {
        // Иначе применяем старую логику скрытия сортировки по названию
        if (hideNameSort) {
            options = options.filter(opt => opt.value !== 'az' && opt.value !== 'za');
        }
    }

    const onSort = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());

        params.set("sort", value);
        params.set("page", "1");

        router.replace(`${pathname}?${params.toString()}`, { scroll: false });

        setSelected(value);

        onClose?.();
    };

    return (
        <div className="w-full 1144:max-w-[243px] max-w-[203px] 1144:p-6 py-[18px] px-4 flex flex-col gap-4">
            <ListItems
                items={options}
                render={(item) => (
                    <div key={item.id} className="w-fit flex items-center gap-2">
                        <Checkbox
                            variant="rounded"
                            value={item.value}
                            id={item.id}
                            checked={selected === item.value}
                            onCheckedChange={() => onSort(item.value)}
                        />
                        <label htmlFor={item.id} className="leading-[120%] cursor-pointer 1144:text-base text-sm">
                            {item.label}
                        </label>
                    </div>
                )}
            />
        </div>
    );
};