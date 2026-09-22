"use client";

import { Button } from "@/components/ui/button";
import { ChevroneDownIcon } from "@/icons/chevrone-down";
import { cn } from "@/lib/utils";
import { MobileOrderProducts } from "./MobileOrderProducts";
import { useOrderStore } from "../stores/useOrderStore";
import { useMobileMenuStore } from "../stores/useMobileMenuStore";
import { useState } from "react";
import Image from "next/image";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { usePathname } from "next/navigation";
import {useFetchActiveOrders} from "@/features/account/orders/hooks/queries/useFetchActiveOrders";
import {formatSchedule} from "@/utils/format-schedule";
import {formatPhone} from "@/utils/formatPhone";
import {OrderProductProps, OrderProps} from "@/types/order.types";
import ArrowIcon from "@/assets/icons/Arrow.svg";
import Link from "next/link";
import NoPhoto from "@/assets/icons/NoPhoto.svg";
import {Separator} from "@/components/ui/separator";
import IconGeo from '@/assets/icons/IconGeoBlue.svg'
import {Clock4Icon, PhoneIcon} from "lucide-react";
import { Hourglass } from 'lucide-react'

interface Props {
  device: "mobile" | "desktop";
}

export const CompletedOrderButton = ({ device }: Props) => {
  const { data: orders } = useFetchActiveOrders();
  const { isOpenOrderSlide, setOpenOrderSlide } = useOrderStore();
  const { open, setOpen } = useMobileMenuStore();

  const [openOrder, setOpenOrder] = useState<boolean>(false);

  const pathname = usePathname();

  useIsomorphicLayoutEffect(() => {
    if (openOrder) {
      setOpenOrder(false);
    }
  }, [pathname]);

  const onToggle = () => {
    setOpenOrderSlide(!isOpenOrderSlide);
    if (open) {
      setOpen(false);
    }
  };

  if (!orders?.data?.[0]) {
    return;
  }


  const labels: Record<string, string> = {
    "0": "В сборке",

    "100": "Создан",

    "110": "Получен",
    "210": "Получен",
    "215": "Получен",

    "111": "Отменен",
    "202": "Отменен",
    "203": "Отменен",
    "211": "Отменен",
    "212": "Отменен",

    "200": "Готов к выдаче",
    "201": "Готов к выдаче",
    "300": "Готов к выдаче",

    "205": "Истек срок хранения",
    "206": "Истек срок хранения",

    "213": "Готов к выдаче",
    "214": "Готов к выдаче",
  };

  const getColorClass = (variant: string) => {
    if (variant === "100") return "bg-primary-blue";
    if (variant === "0") return "bg-primary-blue";
    if (["213", "200", "201", "214", "300"].includes(variant))
      return "bg-green-500";
    if (["210", "110", "215"].includes(variant)) return "bg-primary-blue";
    if (["202", "203", "211", "212", "111"].includes(variant))
      return "bg-primary-red";
    if (["205", "206"].includes(variant)) return "bg-gray-500";
    return "bg-primary-blue";
  };

  const getColorClassOpacity = (variant: string) => {
    if (variant === "100") return "bg-[#EEF7FF]";
    if (variant === "0") return "bg-[#EEF7FF]";
    if (["213", "200", "201", "214", "300"].includes(variant))
      return "bg-[#E4F6EF]";
    if (["210", "110", "215"].includes(variant)) return "bg-[#EEF7FF]";
    if (["202", "203", "211", "212", "111"].includes(variant))
      return "bg-[#E53527]";
    if (["205", "206"].includes(variant)) return "bg-gray-500";
    return "bg-gray-300";
  };

  return device === "desktop" ? (
      <div className="relative mt-2">
        <Button
            onClick={() => setOpenOrder((prev) => !prev)}
            className={cn(" 1144:flex hidden h-[37px] rounded-[16px] text-white-500 px-4 font-bold text-[16px] w-[304px]",
                getColorClass(String(orders?.data?.[0]?.status.code)),
                orders?.data?.[0].status.code === 0 || orders?.data?.[0].status.code === 100 && !openOrder && 'border border-[#005CA7] text-primary-blue bg-[#F3FAFF]'
            )}
        >
          Ваш заказ №{orders?.data?.[0].id} -{" "}
          {((orders?.data?.[0].status.code || orders?.data?.[0].status.code === 0) && labels[orders?.data?.[0].status.code]) || ""}
        </Button>

        {openOrder && (
            <div className="absolute w-[320px] bg-white-500 px-5 py-3 rounded-[8px] right-0 top-[50px] shadow-[0_4px_12px_#01010114] flex flex-col gap-[10px]">
              <div className=" w-full max-h-[430px] min-h-[80px] overflow-y-auto custom-scroll space-y-3">
                { orders?.data?.map((ordersItem: OrderProps) => {
                  return (
                      <div key={ordersItem.id} className={cn("flex flex-col gap-[10px] bg-gray-50 rounded-[16px] px-3 py-3 border-[1px]")}>
                        <div className="flex flex-row justify-between items-center gap-[6px]">
                          <span className="font-bold text-[18px]">Заказ №{ordersItem.id}</span>
                          <div className={cn("flex px-[10px] py-[1px] rounded-[16px] w-fit h-fit", getColorClass(String(ordersItem.status.code)))}>
                            <span className="text-white-100 text-[13px]">{labels[ordersItem.status.code]}</span>
                          </div>
                        </div>
                        <div className="flex flex-col w-full h-fit max-h-[190px] overflow-y-auto custom-scroll gap-[1px] rounded-[10px] border-gray-200 border-[1px]">
                          { ordersItem.products.map((item: OrderProductProps) => {
                            return (
                                <>
                                  <div key={item.id} className=" w-full flex items-center rounded-[6px] gap-[5px] px-[5px] py-[4px]">
                                    <div className=" w-[56px] h-[56px] aspect-square min-w-[56px] bg-white-500 font-medium">
                                      <Image src={item.images?.[0]?.url ?? NoPhoto} alt={item.name} width={56} height={56} className='object-contain w-full h-full'/>
                                    </div>
                                    <div>
                                      <p className="text-[15px] font-bold leading-[110.00000000000001%]">{item.name}</p>
                                      <div className="flex flex-row items-center gap-[4px]">
                                        <p className="text-[15px] font-bold leading-[120%] text-primary-blue">{item.price} ₽</p>
                                        { item.amount > 1 && (
                                            <span className="text-[15px] leading-[120%]">х {item.amount} шт</span>
                                        ) }
                                      </div>
                                    </div>
                                  </div>
                                  <Separator className=" last:hidden bg-gray-200 ml-2 w-[95%]" />
                                </>
                            );
                          })}
                        </div>
                        { labels[ordersItem.status.code] === "Отменен" ? (
                            <div className='flex flex-col gap-2'>
                              <p className="font-bold text-[16px] leading-[120%]">Итого: {ordersItem.total.fullPrice}₽</p>
                              <div className='flex flex-col gap-[8px] rounded-[16px] bg-red-300 p-4'>
                                <p className='text-[16px] font-bold text-black-100 leading-[110%]'>Причина отмены заказа:</p>
                                <p className='text-[14px] text-wrap text-black-100 leading-[110%]'>Возникли проблемы при обработке заказа.</p>
                                <Button onClick={() => setOpenOrder((prev) => !prev)}
                                        className="bg-primary-red font-bold !text-[18px] rounded-[16px] w-full h-[34px]"
                                > Закрыть </Button>
                              </div>

                            </div>
                        ) : (
                            <>
                              <div className={cn("w-full h-fit p-3 rounded-[12px] font-medium flex flex-col gap-1", getColorClassOpacity(String(ordersItem.status.code)))}>
                                {labels[ordersItem.status.code] === "Готов к выдаче" ? (
                                    <>
                                      <span className="leading-[120%] text-primary-blue text-[15px] font-bold">Заберите по адресу:</span>
                                      <span className="flex flex-row items-center gap-[4px] leading-[110%] text-primary-blue text-[14px] font-bold">
                                        <Image src={IconGeo} alt="Geolocation"></Image>
                                        {ordersItem.store.address}
                                      </span>
                                      { ordersItem.store && ordersItem.store?.schedule && (
                                          <span className="flex flex-row items-center gap-[5px] text-[13px] text-[#656A6D] leading-[110%] font-bold text-balance">
                                            <Clock4Icon color="#656A6D" min-width="19px" min-height="19px" width="19px" height="19px"/>
                                            {formatSchedule(ordersItem.store?.schedule).split(",")}
                                          </span>
                                      )}
                                      { ordersItem.store && ordersItem.store.phone && (
                                          <span className="flex flex-row items-center gap-[5px] text-[13px] text-[#656A6D] leading-[110%] font-bold">
                                            <PhoneIcon color="#656A6D" width="19px" height="19px"/> {formatPhone(ordersItem.store.phone)}
                                          </span>
                                      )}
                                    </>
                                ) : (
                                    <>
                                      <span className="flex flex-row items-center gap-[4px] leading-[110%] text-primary-blue text-[14px] font-bold text-pretty">
                                        <Image src={IconGeo} alt="Geolocation"></Image>
                                        {ordersItem.store.address}
                                      </span>
                                      { ordersItem.store && ordersItem.store?.schedule && (
                                          <span className="flex flex-row items-center leading-[110%] gap-[6px] justify-start">
                                            <Clock4Icon color="#656A6D" width="19px" height="19px"/>
                                            <p className='w-fit text-balance leading-[110%] text-[#656A6D] text-[13px]'>{formatSchedule(ordersItem.store?.schedule).split(",")}</p>
                                          </span>
                                      )}
                                      <span className="flex flex-row items-center gap-[4px] leading-[110%] text-primary-gray text-[14px]">
                                        <Hourglass color="#656A6D" width="19px" height="19px"/>
                                        Обработка заказа до 15 минут</span>
                                    </>
                                )}
                              </div>
                              <p className=" font-bold text-[16px] leading-[120%]">
                                Итого: {ordersItem.total.fullPrice} ₽
                              </p>
                              <Link href={`/account/orders/${ordersItem.id}`} className='py-[5px] max-h-[38px] font-medium leading-[120px] px-4 flex justify-between items-center text-black-100 w-full max-w-[230px] rounded-[13px] bg-white-500 border-1 '>
                                Подробнее о заказе
                                <Image src={ArrowIcon} alt='arrow' width={30} height={30} />
                              </Link>
                            </>
                        )}
                      </div>
                  );
                })}
              </div>
              <Link href={`/account/orders/`} className='py-[5px] px-4 max-h-[38px] font-medium leading-[120px] flex justify-center gap-[10px] items-center text-white-500 w-full rounded-[13px] bg-primary-blue border-1 '>
                Мои заказы
                <Image src={ArrowIcon} alt='arrow' width={30} height={30} />
              </Link>
            </div>
        )}
      </div>
  ) : (
      <>
        <Button
            onClick={onToggle}
            className={cn(
                "1144:hidden w-full rounded-none text-[18px] font-bold leading-[120%] justify-between px-6 py-2 h-10",
                getColorClass(String(orders?.data?.[0]?.status))
            )}
        >
          Заказ {orders?.data?.[0].id} -{" "}
          {orders?.data?.[0].status && labels[orders?.data?.[0].status.code]}
          <span className={cn("", isOpenOrderSlide && "scale-[-1]")}>
            <ChevroneDownIcon />
          </span>
        </Button>

        <MobileOrderProducts
            orders={orders}
            labels={labels}
        />
      </>
  );
};
