"use client"
import React from 'react';
import Link from "next/link";
import Image from "next/image";
import chevron from "@/assets/icons/chevron-down.svg";
import {AccountSectionTitle} from "@/features/account/components/account-section-title";
import {useFetchMyOrdersQuery} from "@/features/account/orders/hooks/queries/useFetchOrdersByIdQuery";
import {OrderCardSkeleton} from "@/features/account/orders/components/OrderCardSkeleton";
import {OrderBadge} from "@/features/account/orders/components/order-badge";
import {ListItems} from "@/components/ListItems";
import {OrderProductCard} from "@/features/account/orders/components/OrderProductCard";
import ArrowIcon from "@/assets/icons/Arrow.svg";
import {formatDate} from "@/utils/formatDate";
import {CancelOrderButton} from "@/features/account/orders/components/CancelOrderButton";
import {RepeatOrderButton} from "@/features/account/orders/components/RepeatOrderButton";
import {PharmacyInfo} from "@/features/pharmacy/PharmacyInfo";

interface OrderProps {
    id: number;
}
const Order = ({id}: OrderProps) => {
    const {data: order, status} = useFetchMyOrdersQuery(id)

    if (status === 'pending') { return  ( <OrderCardSkeleton />) }

    return (
        <div className="flex flex-col gap-5 w-full h-fit p-5 rounded-2xl bg-white-500 overflow-hidden">
            <div className="w-full flex justify-between max-sm:flex-col flex-row gap-1">
                <div className="flex items-center gap-4 justify-start flex-wrap">
                    <Link href='/account/orders' className=" w-12 h-12 aspect-square rounded-[8px] bg-primary-light-white flex items-center justify-center">
                        <Image src={chevron} alt="arrow icon" width={24} height={24} priority className="rotate-90"/>
                    </Link>
                    <AccountSectionTitle>Заказ №{id}</AccountSectionTitle>
                    { order?.status && (
                        <OrderBadge variant={order.status?.code} device="desktop" />
                    )}
                </div>
                <div className="flex flex-row justify-between gap-4 items-center">
                    { order && (
                        <>
                            <OrderBadge variant={order.status?.code} device="mobile" />
                            <span className="flex leading-[120%]">{formatDate(order.status?.date)}</span>
                        </>
                    )}
                </div>
            </div>

            <div className='flex flex-col gap-[14px] flex-wrap'>
                <p className='font-medium text-[18px] leading-[120%] text-black-100'><b>Способ доставки:</b> Самовывоз</p>
                { order && order.status.code === 213 && (
                    <p className='font-medium text-[18px] leading-[120%] text-black-100'><b>Самовывоз до:</b> {formatDate(order.storeUntil)}</p>
                )}
                { order && (
                    <p className='font-medium text-[18px] leading-[120%] text-black-100'><b>Дата заказа:</b> {formatDate(order.created)}</p>
                )}
                <div className="flex flex-col w-fit text-[17px] font-medium leading-[100%] text-black-100">
                    <PharmacyInfo phone={order?.store?.phone} schedule={order?.store?.schedule} address={order?.store?.address} inscriptions={true} />
                </div>
                { order && !!order.products && order.products.length > 0 && (
                    <div className='flex flex-col gap-2'>
                        <h4 className="text-[28px] font-bold">Состав заказа:</h4>
                        <div className=" w-full h-fit bg-white-500 rounded-2xl flex flex-col gap-6 px-5 py-2 border-[2px] border-blue-lightGrayBlue">
                            <div className=" w-full flex md:items-center md:justify-between md:gap-[8px] flex-col ">
                                <ListItems items={order.products}
                                    render={(product) => (
                                        <OrderProductCard key={product.id} product={product} />
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                )}

                <p className="flex w-fit font-bold text-[22px] text-nowrap">Итого: {order?.total.price} ₽</p>

                <div className="flex md:flex-row flex-col items-center justify-between w-full max-1144:gap-2 gap-4 1144:h-[52px] max-1144:flex-wrap">
                    <CancelOrderButton id={id} statusCode={order?.status.code} />

                    <RepeatOrderButton products={order?.products} />

                    <Link href={`/account/orders`} className='h-full flex font-medium gap-2 px-4 justify-center items-center text-black-100 w-full text-nowrap py-1 rounded-[16px] bg-primary-light-white'>
                        К списку заказов
                        <Image src={ArrowIcon} alt='arrow'/>
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default Order;
