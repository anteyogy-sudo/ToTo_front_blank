"use client";

import { MapPinIcon } from "@/icons/map-pin";
import { useState } from "react";
import { EditDeliveryAddressButton } from "./edit-delivery-address-button";

interface Props {
  title: string;
}

export const DeliveryAddressCard = ({ title }: Props) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className=" w-full px-6 py-4 flex md:flex-row flex-col gap-6 md:items-center md:justify-between rounded-2xl bg-primary-light-white">
      <div className=" md:w-fit w-full h-fit flex items-center md:justify-normal justify-between gap-4">
        <MapPinIcon />
        {/* desktop variant */}
        <div className=" w-fit h-fit md:flex hidden flex-col gap-2">
          <p className=" text-[24px] font-bold leading-[110.00000000000001%]">
            {title}
          </p>
          <p className=" text-[18px] leading-[120%] text-black-100/70">
              улица не существует, дом не существует
          </p>
        </div>
        {/* mobile variant */}
        <EditDeliveryAddressButton
          className=" md:hidden"
          open={open}
          setOpen={setOpen}
        />
      </div>

      {/* mobile variant */}
      <div className=" w-fit h-fit md:hidden flex flex-col gap-2">
        <p className=" text-[24px] font-bold leading-[110.00000000000001%]">
          {title}
        </p>
        <p className=" text-[18px] leading-[120%] text-black-100/70">
          улица не существует, дом не существует
        </p>
      </div>

      {/* desktop variant */}
      <EditDeliveryAddressButton
        className=" md:flex hidden"
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
};
