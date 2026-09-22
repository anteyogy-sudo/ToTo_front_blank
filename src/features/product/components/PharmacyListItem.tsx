import React, { useRef, useState } from "react";
import { MoveRight } from "lucide-react";
import { groupSchedule } from "@/utils/scheduleTime";
import { Button } from "@/components/ui/button";
import { StockProps } from "@/types/stock.types";
import { Dispatch, SetStateAction } from "react";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
// import ConfirmBookingDialog from "./ConfirmBookingDialog";
import { useFetchProductQuery } from "../hooks/queries/useFetchProductQuery";
import AnteyLogo from '@/assets/resources/product/PharmacyAnteyLogo.svg'
import Image from "next/image";
import { usePanToPharmacy } from "@/features/map/hooks/usePanToPharmacy";
import { PHARMACY_MAP_SELECT_ZOOM } from "@/features/map/constants";

interface PharmacyListItemProps {
  item: StockProps;
  productId: string;
  selectedPharmacy: number;
  setSelectedPharmacy: Dispatch<SetStateAction<number>>;
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
  price : number
}

const PharmacyListItem = ({
  item,
  productId,
  selectedPharmacy,
  setSelectedPharmacy,
  scrollContainerRef
}: PharmacyListItemProps) => {
  const panToPharmacy = usePanToPharmacy();

  const [isOpenConfirmDialog, setIsOpenConfirmDialog] = useState<boolean>(false);
  const [selectedPharmacyId, setSelectedPharmacyId] = useState<number | null>(null);
  const itemRef = useRef<HTMLDivElement | null>(null);
  const { data: product, status } = useFetchProductQuery(productId);

  const openConfirmDialog = (id: StockProps["id"]) => {
      setSelectedPharmacyId(id);
    setIsOpenConfirmDialog(true);
  };

  const closeConfirmDialog = () => {
    setIsOpenConfirmDialog(false);
    setSelectedPharmacyId(null);
  };

  useIsomorphicLayoutEffect(() => {
    if (
      selectedPharmacy === item.id &&
      itemRef.current &&
      scrollContainerRef.current
    ) {
      itemRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "nearest",
      });
    }
  }, [selectedPharmacy]);

  const onMarkerClick = () => {
    panToPharmacy(item, PHARMACY_MAP_SELECT_ZOOM);
    setSelectedPharmacy(item.id);
  };

  return (
    <div
      onClick={onMarkerClick}
      key={item.id}
      ref={itemRef}
      className={`group rounded-[16px] cursor-pointer lg:p-6 p-4 flex flex-col lg:gap-6 gap-4 ${
        selectedPharmacy === item.id && "bg-blue-lightBlue"
      } `}
    >
      <div className="flex items-center justify-between gap-2">
        <p className="font-bold flex flex-col text-black-100 lg:text-[24px] text-[18px] lg:leading-[100%] leading-[120%] ">
            <span className='flex gap-1'>Аптека вивАнтей  <Image src={AnteyLogo} alt='logo'/></span>
            <span>{item.address} </span>
        </p>
        <div
          className={`flex rounded-[8px] justify-center items-center min-w-[32px] h-[32px] ${
            selectedPharmacy === item.id
              ? "bg-white-500"
              : "bg-blue-lightBlue"
          } `}
        >
          <MoveRight size={20} className="text-primary-blue " />
        </div>
      </div>
      {item.quantity_in_stock > 0 ? (
        <p className="font-medium text-[16px] leading-[120%] text-primary-blue">
          В наличии: {Number(item.quantity_in_stock)} шт.
        </p>
      ) : (
        <p className="font-medium text-[16px] leading-[120%] text-primary-red">
          Нет в наличии
        </p>
      )}
      <div>
        <p className="text-primary-gray leading-[120%] text-[16px]">
          {groupSchedule(item.schedule)}
        </p>
        <p className="text-primary-gray leading-[120%] text-[16px]">
          {item.phone}
        </p>
      </div>

      <div className="flex gap-2 items-center justify-between flex-wrap">
          {
              selectedPharmacy === item.id && (
                  <p className="font-bold text-black-100 leading-[100%] text-[24px]">
                      {item.website_price} ₽
                  </p>
              )
          }

        {selectedPharmacy === item.id && (
          <Button
            onClick={() => openConfirmDialog(item.id)}
            className="h-[62px] max-w-[247px] w-full text-[18px] rounded-[16px] px-10 py-5 text-primary-blue border-[1px] border-primary-blue bg-transparent"
          >
            Купить в один клик
          </Button>
        )}
      </div>

      {/* Confirm Booking Dialog */}
      {/*{!!item && isOpenConfirmDialog && status === "success" && (*/}
      {/*  <ConfirmBookingDialog*/}
      {/*    onClose={closeConfirmDialog}*/}
      {/*    open={isOpenConfirmDialog}*/}
      {/*    product={product.data}*/}
      {/*    stockProduct={Number(item.quantity_in_stock)}*/}
      {/*    price={item.website_price}*/}
      {/*    pharmacyId={selectedPharmacyId}*/}
      {/*  />*/}
      {/*)}*/}
    </div>
  );
};

export default PharmacyListItem;
