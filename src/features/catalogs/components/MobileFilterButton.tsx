"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useWindowDimension } from "@/hooks/useWindowDimension";
import { CatalogFilters } from "./CatalogFilters";
import { useState } from "react";
import FilterIcon from "@/icons/FilterIcon";

interface Props {
  category_id: number;
  onMutate: () => Promise<void>;
}

export const MobileFilterButton = ({ category_id, onMutate }: Props) => {
  const { width } = useWindowDimension();
  const [open, setOpen] = useState<boolean>(false);

  if (width > 1144) return null;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className=" w-[48px] aspect-square flex items-center justify-center rounded-full bg-white-500 shadow-sm">
          <FilterIcon open={open}/>
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        side="bottom"
        avoidCollisions={false}
        className=" w-fit mt-2 p-0 rounded-2xl mr-[148px]"
      >
        <CatalogFilters
          category_id={category_id}
          onMutate={onMutate}
          onClose={() => setOpen(false)}
        />
      </PopoverContent>
    </Popover>
  );
};
