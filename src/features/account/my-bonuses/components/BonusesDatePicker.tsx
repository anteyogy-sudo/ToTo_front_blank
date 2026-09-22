import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "@/icons/CalendarIcon";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { useState } from "react";

interface Props {
  date: Date | undefined;
  onSelectDate: (date?: Props["date"]) => void;
  disabledBefore?: Date;
  disabledAfter?: Date;
}

// ToDo: Why we have unused BonusesDatePicker?
export const BonusesDatePicker = ({
  date,
  onSelectDate,
  disabledAfter,
  disabledBefore,
}: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const defaultValue = <span className=" text-black-100/40">ДД.ММ.ГГГГ</span>;

  const handleSelect = (newDate?: Date | undefined) => {
    onSelectDate(newDate);
    setOpen(false);
  };

  return (
    <Popover modal open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        data-open={open}
        className=" h-[62px] w-full flex items-center justify-between rounded-[16px] bg-primary-light-white px-4 data-[open=true]:pointer-events-none select-none"
      >
        {date ? format(date, "dd.MM.yyyy", { locale: ru }) : defaultValue}
        <CalendarIcon />
      </PopoverTrigger>

      <PopoverContent className=" p-0 w-fit" align="center">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          initialFocus
          disabled={(day) => {
            if (disabledBefore && day < disabledBefore) return true;
            return !!(disabledAfter && day > disabledAfter);

          }}
        />
      </PopoverContent>
    </Popover>
  );
};
