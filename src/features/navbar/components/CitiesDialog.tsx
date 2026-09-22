"use client";

import searchIcon from "@/assets/icons/search.svg";
import { ListItems } from "@/components/ListItems";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { useCityStore } from "../stores/useCityStore";
import RegionMarker from '@/assets/icons/RegionMarker.svg'
import {groupCitiesByRegion} from "@/utils/groupCityByRegion";
import { CityProps } from "@/types/city.types";
import { GroupedCity } from "@/utils/groupCityByRegion";

interface Props {
  open: boolean;
  onClose: () => void;
  cities: CityProps[] | undefined;
  status: "error" | "success" | "pending";
}

export const CitiesDialog = ({ cities, status, open, onClose }: Props) => {
    const {
        selectedCity,
        confirmedCity,
        setCity,
        confirmCity,
        onManualSelect,
        isManualSelected,
    } = useCityStore();

    const [existingCities, setExistingCities] = useState<CityProps[]>([]);
    const [searchValue, setSearchValue] = useState<string>("");
    const [selectedRegion, setSelectedRegion] = useState<number | null>(null);
    const [filteredGroupedCities, setFilteredGroupedCities] = useState<GroupedCity[]>([]);

    const handleSelectRegion = (regionId: number) => {
        setSelectedRegion(regionId);
    };

    useIsomorphicLayoutEffect(() => {
        if (cities?.length) {
            const grouped = groupCitiesByRegion(cities);
            setFilteredGroupedCities(grouped);
            handleSelectRegion(grouped[0]?.regionId ?? null)
        }
    }, [cities]);

    useIsomorphicLayoutEffect(() => {
        if (!cities?.length) return;
        if (searchValue.trim() === "") {
            setExistingCities([]);
            return;
        }
        const keywords = searchValue.toLowerCase().split(/\s+/);
        const filtered = cities.filter((city) =>
            keywords.some((keyword) => city.name.toLowerCase().includes(keyword))
        );
        setExistingCities(filtered);
    }, [searchValue, cities]);

    const handleSelectCity = (city: CityProps) => {
        setCity(city);
    };

    const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
  };

  const onFinish = () => {
    if (!!selectedCity) {
      onManualSelect();
      confirmCity();
      onClose();
    }
  };

  useIsomorphicLayoutEffect(() => {
    if (!confirmedCity && cities?.length) {
      setCity(cities[0]);
      confirmCity();
    }
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (!!cities && cities.length > 0) {
      const keywords = searchValue.toLowerCase().split(/\s+/); // split into words
      const filtered = cities.filter((city) =>
        keywords.some((keyword) => city.name.toLowerCase().includes(keyword))
      );
      setExistingCities(filtered);
    }
  }, [searchValue, cities]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent showX={false}
                     className="flex dialog-top-mobile min-[768px]:max-[1600px]:translate-y-[10px] min-[300px]:max-[768px]:translate-y-[-70px] rounded-2xl space-y-0 gap-[20px] text-black-100
                     sm:max-w-[621px] h-fit w-[100%]
                     sm:py-[41px] py-[21px] flex-shrink justify-center"
      >
        <DialogHeader className='flex flex-col gap-[17px]'>
          <div className="flex w-full items-center relative justify-between gap-4 ">
              <DialogTitle className="sm:text-[37px] text-[24px] text-black-100 leading-[100%] font-bold text-nowrap">
                  Выберите <span className='max-sm:hidden'>ваш</span> регион
              </DialogTitle>
              <button onClick={onClose} className="w-fit h-fit">
                  <X size={24} className=" text-primary-gray" />
              </button>
              <Image src={RegionMarker} alt='marker'
                     className='absolute sm:w-[177px] w-[75px] sm:h-[141px] h-[90px] sm:right-[15px] sm:top-[-107px] right-[20px] top-[-37px] '
              />
          </div>
          <p className='font-medium text-primary-black-gray2 sm:block hidden text-[20px] mt-[17px] leading-[120%]'>
              От этого зависят <span className='text-primary-blue font-bold'>цены</span> и <span className='font-bold text-primary-blue'>ассортимент</span> товаров
          </p>
        </DialogHeader>

        <div className="w-full mt-2 flex flex-col gap-4 ">
          <div className="w-full sm:h-[62px] h-[48px] px-6 rounded-2xl bg-primary-light-white flex items-center gap-2 placeholder-primary-gray font-bold text-black-500">
            <Image src={searchIcon} alt="search icon" width={24} height={24} priority/>
            <input value={searchValue} onChange={onChangeSearch}
                   placeholder="Введите город"
                   className="outline-none border-none w-full h-full leading-[120%] bg-transparent placeholder:font-normal "
            />
          </div>
          { status === "pending" ? (
            <p>loading</p>
          ) : status === "error" ? (
            <p>error</p>
          ) : (
            <div className="w-full flex flex-col gap-[6px]">
                { !existingCities.length ? (
                    <p>По запросу {" "}
                        <span className=" font-bold text-primary-blue">{searchValue}</span>
                        {" "} ничего не найдено.
                    </p>
                ) : ( searchValue.length > 0 ? (
                    <div className="rounded-[12px] h-[202px] grid grid-cols-1 sm:gap-4 gap-[7px] border-[1px] border-[#C2C2C24D] shadow-custom-1">
                        <div className="flex flex-col max-h-[200px] overflow-y-auto overflow-x-hidden scrollbar-light rounded-[12px] gap-[0px]">
                            {existingCities.map((city) => (
                                <button key={city.id} onClick={() => handleSelectCity(city)}
                                        className={cn("flex items-center w-full pl-[19px] min-h-[30px] h-fit text-nowrap text-[#525252] sm:text-[18px] text-[16px] font-medium leading-[120%] overflow-x-auto scrollbar-light-citiesDialog first:mt-[9px]",
                                            selectedCity?.id === city.id && "bg-primary-blue text-white-500 min-h-[30px] first:mt-0 first:py-[5px] first:min-h-[40px]"
                                        )}
                                > {city?.name}
                                    { city?.region?.name && (
                                        " ("+city.region.name+")"
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="w-full flex flex-col gap-[6px]">
                      <div className='grid grid-cols-2 px-[12px] font-medium sm:text-[20px] text-[16px] leading-[120%] text-primary-blue'>
                          <p>Регион</p><p className="sm:pl-[27px] pl-[12px]">Город</p>
                      </div>
                      <div className='flex rounded-[12px] sm:h-[204px] h-[100px] sm:gap-4 gap-[7px] border-[1px] border-[#C2C2C24D] shadow-custom-2 px-[9px] py-[9px] overflow-hidden'>
                          <div className="flex flex-col overflow-y-scroll scrollbar-light-citiesDialog gap-[3px] overflow-x-auto flex-grow basis-0">
                              <ListItems items={filteredGroupedCities} render={(item) => (
                                  <button key={item.regionId} onClick={() => handleSelectRegion(item.regionId)}
                                          className="flex w-full"
                                  > {
                                      <span className={cn(
                                          "flex sm:text-[18px] text-[14px] leading-[120%] font-medium px-[6px] py-[4px] text-nowrap rounded-[10px]",
                                          selectedRegion === item.regionId && "bg-primary-blue text-white-500",
                                          item.regionId === -1 && "opacity-70",
                                      )}>{item.regionName}</span>
                                  }
                                  </button>
                                  )}
                              />
                          </div>
                          <div className="flex flex-col overflow-y-scroll scrollbar-light-citiesDialog gap-[3px] overflow-x-auto flex-grow basis-0">
                              { filteredGroupedCities
                                  .find((item) => item.regionId === selectedRegion)
                                  ?.cities.map((city) => (
                                      <button key={city.id} onClick={() => handleSelectCity(city)}
                                              className="flex w-full"
                                      >
                                          <span className={cn(
                                              "flex sm:text-[18px] text-[14px] leading-[120%] font-medium px-[6px] py-[4px] text-nowrap rounded-[10px]",
                                              selectedCity?.id === city.id && "bg-primary-blue text-white-500"
                                          )}>{city.name}</span>
                                      </button>
                                  ))
                              }
                          </div>
                      </div>
                        </div>
                  )
                )}
            </div>
          )}
          <Button onClick={onFinish}
                  disabled={ isManualSelected && (!selectedCity || selectedCity?.id === confirmedCity?.id)}
                  className="h-[48px] max-w-[279px] mt-[10px] w-full mx-auto text-[18px] font-bold rounded-2xl"
          > Выбрать
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
