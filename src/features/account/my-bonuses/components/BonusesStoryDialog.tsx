"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CrossIconGray } from "@/icons/CrossIconGray";
import { BonusesStoryBonusItem } from "./BonusesStoryBonusItem";

import React from "react";
// import { BonusesDatePicker } from "./BonusesDatePicker";
// import {CartProductCard} from "@/features/cart/components/cart-ProductCard";
// import {Separator} from "@/components/ui/separator";
import {Loyalty_history} from "@/types/bonuses.types";


interface Props {
  loyaltyHistory: Loyalty_history[];
}

export const BonusesStoryDialog = ({ loyaltyHistory }: Props) => {
  // const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  // const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  //
  // const handleStartDateSelect = (date?: Date) => {
  //   if (date) {
  //     setStartDate(date);
  //   }
  // };
  //
  // const handleEndDateSelect = (date?: Date) => {
  //   if (date) {
  //     setEndDate(date);
  //   }
  // };

  return (
    <Dialog>
      <DialogTrigger className=" w-fit h-fit 1144:text-[18px] leading-[120%] text-primary-blue">
        История начислений и списаний
      </DialogTrigger>
      <DialogContent
        className=" max-w-640 p-6 rounded-[16px] "
        showX={false}
      >
        <DialogHeader className=" w-full flex flex-col gap-6 space-y-0">
          <div className=" w-full h-fit flex items-center justify-between">
            <DialogTitle className=" text-[24px] font-bold leading-[100%]">
              История бонусов
            </DialogTitle>
            <DialogClose tabIndex={-1}>
              <CrossIconGray />
            </DialogClose>
          </div>
          <DialogDescription className=" text-black-100/70 leading-[120%]">
            Показаны последние 10 операций с бонусами
          </DialogDescription>
        </DialogHeader>

        {/*<div className=" w-full h-fit grid grid-cols-2 gap-2">*/}
        {/*  /!* start date *!/*/}
        {/*  <div className=" w-full space-y-2 h-fit">*/}
        {/*    <span className=" font-medium text-sm leading-[110.00000000000001%] text-black-100/70">*/}
        {/*      Начало периода*/}
        {/*    </span>*/}

        {/*    <BonusesDatePicker*/}
        {/*      date={startDate}*/}
        {/*      onSelectDate={handleStartDateSelect}*/}
        {/*      disabledAfter={endDate}*/}
        {/*    />*/}
        {/*  </div>*/}

        {/*  /!* end date *!/*/}
        {/*  <div className=" w-full space-y-2 h-fit">*/}
        {/*    <span className=" font-medium text-sm leading-[110.00000000000001%] text-black-100/70">*/}
        {/*      Конец периода*/}
        {/*    </span>*/}

        {/*    <BonusesDatePicker*/}
        {/*      date={endDate}*/}
        {/*      onSelectDate={handleEndDateSelect}*/}
        {/*      disabledBefore={startDate}*/}
        {/*    />*/}
        {/*  </div>*/}
        {/*</div>*/}

        <div className=" w-full flex flex-col gap-3">
          {loyaltyHistory.map((item) => (
              <BonusesStoryBonusItem key={item.date} history={item}/>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
