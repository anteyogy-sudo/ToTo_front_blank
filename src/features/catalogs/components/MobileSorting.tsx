"use client";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { SortingForm } from "./SortingForm";
import { useState } from "react";
import SortingIcon from "@/icons/SortingIcon";

interface Props {
    hideNameSort?: boolean;
    availableSorts?: string[];
}

export const MobileSorting = ({ hideNameSort, availableSorts }: Props) => {
    const [open, setOpen] = useState(false);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <button className="w-[48px] aspect-square flex items-center justify-center rounded-full bg-white-500 shadow-sm">
                    <SortingIcon open={open} />
                </button>
            </PopoverTrigger>
            <PopoverContent
                side="bottom"
                align="start"
                avoidCollisions={false}
                className="mt-2 w-fit p-0 rounded-2xl overflow-hidden"
                style={{ transform: "translateX(-60px)" }}
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