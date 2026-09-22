import { ListItems } from "@/components/ListItems";
import { OrderProps } from "@/types/order.types";
// import { OrderBadge } from "./order-badge";
import { OrderProductCard } from "./OrderProductCard";
import {formatDate} from "@/utils/formatDate";
import ArrowIcon from '@/assets/icons/Arrow.svg'
import Image from "next/image";
import Link from "next/link";
import {cn} from "@/lib/utils";
// import {ChevronDown} from "lucide-react";

interface Props {
  order: OrderProps;
}

export const OrderCard = ({ order }: Props) => {
    type StatusCode =
        | "0" | "100" | "111"
        | "200" | "201" | "202" | "205" | "210" | "211" | "212" | "213"
    const code = String(order.status.code) as StatusCode;
    const statusMap: Record<StatusCode, { label: string; color: string, colorOpacity: string }> = {
        "0": { label: "В обработке", color: "bg-gold-500", colorOpacity: "bg-gold-500/15" },
        "100": { label: "Новый заказ", color: "bg-blue-medium", colorOpacity: "bg-blue-medium/15" },
        "210": { label: "Получен", color: "bg-primary-blue", colorOpacity: "bg-primary-blue/15" },
        "111": { label: "Отменен клиентом", color: "bg-primary-red", colorOpacity: "bg-primary-red/5" },
        "202": { label: "Отменен аптекой", color: "bg-primary-red", colorOpacity: "bg-primary-red/5" },
        "211": { label: "Отменен клиентом", color: "bg-primary-red", colorOpacity: "bg-primary-red/5" },
        "212": { label: "Отменен аптекой", color: "bg-primary-red", colorOpacity: "bg-primary-red/5" },
        "200": { label: "Принят аптекой", color: "bg-blue-medium", colorOpacity: "bg-blue-medium/15" },
        "201": { label: "Частично принят аптекой", color: "bg-green-500", colorOpacity: "bg-green-500/15" },
        "213": { label: "Ожидает выдачи", color: "bg-green-500", colorOpacity: "bg-green-500/15" },
        "205": { label: "Истек срок хранения", color: "bg-gray-500", colorOpacity: "bg-gray-500/15" },
    };

    const current = statusMap[code] ?? { label: "Неизвестен", color: "bg-gray-300" };

    return (
        <div className="px-5 py-5 sm:px-6 sm:py-6 w-full flex flex-col gap-3 border-[1px] border-gray-50/45 rounded-[24px] shadow-md bg-white-500">
            <div className=" w-full flex flex-col gap-2">
                <div className=" w-full flex 1144:flex-row flex-col 1144:items-center 1144:justify-between gap-y-3">
                    <div className=" w-fit flex items-center gap-4">
                        <Link href={`/account/orders/${order.id}`} className=" 1144:text-[32px] text-[24px] font-bold leading-[100%]">Заказ №{order.id}</Link>
                        <Link href={`/account/orders/${order.id}`} className={cn(" 1144:inline-block hidden rounded-[99px] text-[16px] w-fit text-white-100 font-medium leading-[120%] px-4 py-2 h-[36px] items-center justify-center ", current.color)}>{current.label}</Link>
                        {/*<OrderBadge variant={order.status.code} device="desktop" />*/}
                    </div>
                    <div className=" 1144:w-fit w-full flex items-center justify-between">
                        <span className={cn(" 1144:hidden rounded-[99px] text-[16px] w-fit text-white-100 font-medium leading-[120%] px-4 py-2 h-[36px] items-center justify-center ", current.color)}>{current.label}</span>
                        {/*<OrderBadge variant={order.status.code} device="mobile" />*/}
                        <span className=" leading-[120%]">{formatDate(order.status.date)}</span>
                    </div>
                </div>
                <p className=" leading-[120%] lg:mt-0 mt-4 1144:text-[18px] font-medium">Самовывоз: {order.store.address}</p>
            </div>
            <div className="flex flex-col w-full">
                <div className="w-full h-fit bg-white-500 rounded-[16px] flex flex-col gap-2
                border-2 border-blue-lightGrayBlue overflow-hidden px-1 py-1">
                    <div className="sm:px-5 px-2 w-full max-h-[240px] flex md:items-center md:justify-between md:gap-[8px] relative
                    flex-col overflow-y-auto custom-scroll">
                            <ListItems
                                items={order.products}
                                render={(product) => <OrderProductCard key={product.id} product={product} />}
                            />
                    </div>

                    {/*{ order.products.length > 3 && (*/}
                    {/*    <Link href={`/account/orders/${order.id}`} className="flex flex-row justify-center items-center gap-[16px] py-[6px] bg-white-100 w-full">*/}
                    {/*        <p className="text-[15px] sm:text-[18px] font-medium leading-[120%]">Посмотреть все</p>*/}
                    {/*        <div className="w-[30px] h-[30px] sm:w-[30px] sm:h-[30px] flex rounded-[8px] items-center justify-center bg-blue-lightBlue">*/}
                    {/*            <ChevronDown className="text-primary-blue "/>*/}
                    {/*        </div>*/}
                    {/*    </Link>*/}
                    {/*)}*/}
                </div>
            </div>
            <p className="xs:hidden flex w-fit font-bold leading-[100%] text-[24px]">
                Итого: {order.total.price} ₽
            </p>
            <div className="flex flex-row w-full justify-between items-center gap-[12px] flex-wrap">
                <Link href={`/account/orders/${order.id}`}
                      className='py-[5px] max-h-[62px] font-medium leading-[120px] flex justify-center gap-3 items-center
                      text-black-100 w-full max-w-[260px] rounded-[16px] bg-gray-50 border-2 border-blue-lightGrayBlue'>
                    Подробнее о заказе
                    <Image src={ArrowIcon} alt='arrow'/>
                </Link>
                <p className="hidden xs:flex w-fit font-bold leading-[100%] text-[24px]">
                    Итого: {order.total.price} ₽
                </p>
            </div>
        </div>
    );
};
