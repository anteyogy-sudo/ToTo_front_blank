"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CrossIcon } from "@/icons/cross";
import { PenIcon } from "@/icons/pen";
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, Dispatch, SetStateAction } from "react";
import { EditDeliveryAddressForm } from "./edit-delivery-address-form";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export const EditDeliveryAddressButton = ({
  className,
  open,
  setOpen,
  ...props
}: Props) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className={cn(
            " w-10 h-10 flex items-center justify-center bg-white-500 rounded-full",
            className
          )}
          {...props}
        >
          <PenIcon />
        </button>
      </DialogTrigger>

      <DialogContent showX={false} className=" max-w-[327px] gap-6">
        <DialogHeader className=" w-full flex items-center justify-between flex-row">
          <DialogTitle className=" text-[24px] leading-[100%] font-bold">
            Редактировать адрес
          </DialogTitle>
          <DialogDescription className=" hidden">
            Add delivery address
          </DialogDescription>

          <button onClick={() => setOpen(false)}>
            <CrossIcon />
          </button>
        </DialogHeader>

        <EditDeliveryAddressForm />
      </DialogContent>
    </Dialog>
  );
};
