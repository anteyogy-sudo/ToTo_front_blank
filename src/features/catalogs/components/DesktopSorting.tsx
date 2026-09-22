"use client";

import chevronIcon from "@/assets/icons/chevron-down.svg";
import sortingIcon from "@/assets/icons/sorting-icon.svg";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import { useState } from "react";
import { SortingForm } from "./SortingForm";

interface Props {
    hideNameSort?: boolean;
    availableSorts?: string[];
}

export const DesktopSorting = ({ hideNameSort, availableSorts }: Props) => {
    const [open, setOpen] = useState(false);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <button className="w-fit h-[48px] rounded-2xl bg-white-500 1144:flex hidden items-center justify-center gap-6 py-2 px-6">
                    <div className="w-fit flex items-center gap-2">
                        <Image src={sortingIcon} alt="sorting icon" width={20} height={20} />
                        <span className="text-[18px] font-bold leading-[120%] text-primary-gray">
              Сортировка
            </span>
                    </div>
                    <Image src={chevronIcon} alt="arrow icon" width={24} height={24} />
                </button>
            </PopoverTrigger>
            <PopoverContent
                align="end"
                side="bottom"
                avoidCollisions={false}
                className="mt-2 w-fit p-0 rounded-2xl overflow-hidden"
            >
                <SortingForm
                    onClose={() => setOpen(false)}
                    hideNameSort={hideNameSort}
                    availableSorts={availableSorts}
                />
            </PopoverContent>
        </Popover>
    );
};