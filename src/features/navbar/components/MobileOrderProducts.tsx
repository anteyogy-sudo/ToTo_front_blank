import { useOrderStore } from "../stores/useOrderStore";
import Image from "next/image";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {formatSchedule} from "@/utils/format-schedule";
import {formatPhone} from "@/utils/formatPhone";
import {OrderProductProps, OrderProps} from "@/types/order.types";
import NoPhoto from "@/assets/icons/NoPhoto.svg";
import IconGeo from "@/assets/icons/IconGeoBlue.svg";
import {Clock4Icon, PhoneIcon} from "lucide-react";
import ArrowIcon from "@/assets/icons/Arrow.svg";
import Link from "next/link";
// import {formatPhone} from "@/utils/formatPhone";

export const MobileOrderProducts = ({orders, labels} : { orders : any, labels : any} ) => {

  const { isOpenOrderSlide, setOpenOrderSlide } = useOrderStore();

  // const getColorClass = (variant: string) => {
  //   if (variant === "100") return "bg-[#EEF7FF]";
  //   if (variant === "0") return "bg-gold-500";
  //   if (["213", "200", "201", "214", "300"].includes(variant))
  //     return "bg-[#0DB85C]";
  //   if (["210", "110", "215"].includes(variant)) return "bg-primary-blue";
  //   if (["202", "203", "211", "212", "111"].includes(variant))
  //     return "bg-[#E53527]";
  //   if (["205", "206"].includes(variant)) return "bg-gray-500";
  //   return "bg-gray-300";
  // };

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

  if (!isOpenOrderSlide || !orders) return null;

  return (
    <div
      data-open={isOpenOrderSlide}
      className=" w-full 1144:hidden absolute -top-full data-[open=true]:top-[195px] left-0 px-6 py-2 bg-white-500 flex flex-col justify-between gap-3 border-b"
    >
        <div className=" w-full max-h-[260px] overflow-x-auto sm:overflow-y-auto custom-scroll space-x-3 sm:space-x-3 flex flex-row  sm:flex-shrink sm:gap-[8px]">
            { orders?.data?.map((ordersItem: OrderProps) => {
                return (
                    <div className="w-full sm:flex-shrink sm:basis-[200px] min-w-[90%] sm:min-w-[49%] border-[1px] border-gray-200 rounded-[12px] px-3 py-1 flex flex-col gap-1">
                        <div className="flex flex-row gap-3 items-center">
                            <span className="font-bold text-[18px]">Заказ №{ordersItem.id}</span>
                            <div className={cn("flex px-[10px] py-[1px] rounded-[16px] w-fit h-fit", getColorClassOpacity(String(ordersItem.status.code)))}>
                                <span className="text-black-50 text-[13px] text-nowrap">{labels[ordersItem.status.code]}</span>
                            </div>
                        </div>
                        <div className="flex flex-col max-h-[60px] overflow-y-auto custom-scroll space-y-3 flex-shrink">
                            { ordersItem.products?.map((item: OrderProductProps) => {
                                return (
                                    <div key={item.id} className=" h-fit flex items-center gap-2">
                                        <div className="flex w-[56px] h-[56px] aspect-square min-w-[56px] bg-white-500 font-medium">
                                            <Image src={item.images?.[0]?.url ?? NoPhoto}
                                                   alt={item.name} width={56} height={56}
                                                   className='object-contain w-full h-full'
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <p className="flex leading-[110%] text-wrap">{item.name}</p>
                                            <p className="flex leading-[120%] text-primary-blue">{item.price} ₽</p>
                                        </div>
                                    </div>
                                  );
                            })}
                        </div>

                        { labels[ordersItem.status.code] === "Отменен" ? (
                            <div>
                                <p className=" font-bold leading-[120%]">Итого: {ordersItem.total.fullPrice}₽</p>
                                <Button onClick={() => setOpenOrderSlide(false)} className='w-full mt-3 bg-primary-red font-bold !text-[18px] rounded-[16px] h-[62px]'>Закрыть</Button>
                                <p className='font-medium text-[14px] mt-[18px] leading-[110%] text-black-100'>Причина отмены заказа: Возникли проблемы при обработке заказа</p>
                            </div>
                        ) : (
                            <>
                                <p className=" font-bold leading-[120%]">Итого: {ordersItem.total.fullPrice}₽</p>
                                <div className={cn(
                                    "w-full h-fit p-3 py-4 rounded-[12px] font-medium flex flex-col gap-1",
                                    getColorClassOpacity(String(ordersItem.status.code))
                                )}>
                                    {
                                        labels[ordersItem.status.code] === 'Готов к выдаче' ? (
                                            <>  <span className="leading-[120%] text-primary-blue text-[15px] font-bold">Заберите по адресу:</span>
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
                                            <><span className=" text-sm leading-[110%]">{ordersItem.store.address}</span></>
                                        )
                                    }
                                </div>
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
  );
};
