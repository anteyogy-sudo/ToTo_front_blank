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
import { useDeliveryAddressStore } from "../stores/useDeliveryAddressStore";
import { AddDeliveryAddressForm } from "./add-delivery-address-form";

export const AddDeliveryAddressButton = () => {
  const { openCreate, setOpenCreate } = useDeliveryAddressStore();
  return (
    <Dialog open={openCreate} onOpenChange={setOpenCreate}>
      <DialogTrigger asChild>
        <button className=" w-fit h-[62px] px-6 flex items-center justify-center gap-2 text-primary-gray bg-blue-lightBlue rounded-2xl leading-[120%] text-[18px]">
          <span className="text-[32px] text-primary-black-gray">+</span>
          Добавить новый адрес
        </button>
      </DialogTrigger>

      <DialogContent showX={false} className=" max-w-[327px] gap-6">
        <DialogHeader className=" w-full flex items-center justify-between flex-row">
          <DialogTitle className=" text-[24px] leading-[100%] font-bold">
            Добавить адрес
          </DialogTitle>
          <DialogDescription className=" hidden">
            Add delivery address
          </DialogDescription>

          <button onClick={() => setOpenCreate(false)}>
            <CrossIcon />
          </button>
        </DialogHeader>

        <AddDeliveryAddressForm />
      </DialogContent>
    </Dialog>
  );
};
