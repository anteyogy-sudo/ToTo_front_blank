"use client";

import mapPin from "@/assets/icons/map-pin.svg";
import { cn } from "@/lib/utils";
import { CityProps } from "@/types/city.types";
import Image from "next/image";
import { useCities } from "../hooks/useCities";
import { useCityStore } from "../stores/useCityStore";
import { CitiesDialog } from "./CitiesDialog";

interface Props {
  cities: CityProps[] | undefined;
  status: "error" | "success" | "pending";
}

export const MobileMapPin = ({ cities, status }: Props) => {
  const { open, onOpen, onClose } = useCities();
  const { confirmedCity, isManualSelected } = useCityStore();

  const loading = status === "pending" || !confirmedCity;

  return (
    <>
      <CitiesDialog open={open} onClose={onClose} cities={cities} status={status} />

      <button
        onClick={onOpen}
        className={cn(
          " h-fit w-fit text-primary-blue text-start flex items-center gap-2 text-sm leading-[110.00000000000001%]",
          loading && "animate-pulse"
        )}
      >
        <Image src={mapPin} alt="map pin" width={20} height={20} priority />{" "}
        {!loading ? isManualSelected ? confirmedCity.name : <>{confirmedCity.name}</> : "Загрузка..."}
      </button>
    </>
  );
};
