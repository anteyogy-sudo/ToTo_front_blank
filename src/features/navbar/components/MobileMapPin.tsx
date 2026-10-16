"use client";

import MapPinSmall from "@/icons/map-pin-small";
import { cn } from "@/lib/utils";
import { CityProps } from "@/types/city.types";

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
        <MapPinSmall size={20} />{" "}
        {!loading ? isManualSelected ? confirmedCity.name : <>{confirmedCity.name}</> : "Загрузка..."}
      </button>
    </>
  );
};
