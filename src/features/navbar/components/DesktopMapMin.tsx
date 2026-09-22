"use client";

import mapPin from "@/assets/icons/map-pin.svg";
import { cn } from "@/lib/utils";
import { CityProps } from "@/types/city.types";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useCities } from "../hooks/useCities";
import { useCityStore } from "../stores/useCityStore";
import { CitiesDialog } from "./CitiesDialog";

interface Props {
  cities: CityProps[] | undefined;
  status: "error" | "success" | "pending";
}

export const DesktopMapMin = ({ cities, status }: Props) => {
  const { open, onOpen, onClose } = useCities();
  const { confirmedCity, isManualSelected } = useCityStore();

  const loading = status === "pending" || !confirmedCity;

  return (
    <>
      <CitiesDialog
        open={open}
        onClose={onClose}
        cities={cities}
        status={status}
      />

      <Button
        onClick={loading ? undefined : onOpen}
        className={cn(
          "1144:flex hidden ml-[-20px] py-[9px] rounded-2xl bg-secondary-white text-primary-blue shadow-none text-base leading-[120%] hover:scale-100 hover:opacity-75 transition-opacity duration-300",
          loading && "animate-pulse"
        )}
      >
        <Image src={mapPin} alt="map pin" width={20} height={20} priority />
        {!loading ? (
          isManualSelected ? (
            confirmedCity.name
          ) : (
            <>{confirmedCity.name}</>
          )
        ) : (
          "Загрузка..."
        )}
      </Button>
    </>
  );
};
