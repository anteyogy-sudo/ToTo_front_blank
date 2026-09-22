"use client";

import chevron from "@/assets/icons/chevron-down.svg";
import { ListItems } from "@/components/ListItems";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Image from "next/image";
import { AccountSectionTitle } from "../../components/account-section-title";
import { OrderCard } from "./OrderCard";
import { OrderCardSkeleton } from "./OrderCardSkeleton";
import {useState} from "react";
import {Pagination} from "@/components/Pagination";
import Link from "next/link";
import { useFetchMyOrders } from "@/features/account/orders/hooks/queries/useFetchMyOrders";
import { useFetchActiveOrders } from "@/features/account/orders/hooks/queries/useFetchActiveOrders";
import {useUserStore} from "@/stores/useUserStore";

export const MyOrders = () => {
  const [selectedStatus, setSelectedStatus] = useState<"all" | "active">("all");
  const [page, setPage] = useState(1);
  const { token } = useUserStore();

  const { data: myOrders, isFetching: isFetchingAll, isPending: isPendingAll, error: errorAll } = useFetchMyOrders(page);
  const { data: activeOrders, isFetching: isFetchingActive, isPending: isPendingActive } = useFetchActiveOrders();

  const isLoading = isFetchingAll || isFetchingActive || isPendingAll || isPendingActive;

  if (!token || isLoading) {
    return (
        <div className="w-full h-fit p-6 rounded-2xl flex flex-col gap-10 bg-white-500">
          <div className="w-full flex 1144:flex-row flex-col 1144:items-center 1144:justify-between gap-y-10">
            <div className="w-fit flex items-center gap-4">
              <Link href='/account' className="w-12 h-12 aspect-square rounded-[8px] bg-primary-light-white flex items-center justify-center">
                <Image src={chevron} alt="arrow icon" width={24} height={24} priority className="rotate-90"/>
              </Link>
              <AccountSectionTitle>Мои заказы</AccountSectionTitle>
            </div>
          </div>
          <ListItems items={[1, 2, 3]} render={(item) => <OrderCardSkeleton key={item} />} />
        </div>
    );
  }

  const orders = selectedStatus === "active"
      ? activeOrders?.data || []
      : myOrders?.data || [];

  return (
      <div className="w-full flex flex-col gap-4">
        <div className="flex flex-col w-full h-fit max-sm:p-4 p-6 rounded-2xl gap-4 bg-white-500">
          <div className=" w-full flex 1144:flex-row flex-col 1144:items-center 1144:justify-between gap-y-4">
            <div className=" w-fit flex items-center gap-4">
              <Link href='/account' className=" w-12 h-12 aspect-square rounded-[8px] bg-primary-light-white flex items-center justify-center">
                <Image src={chevron} alt="arrow icon" width={24} height={24} priority className="rotate-90"/>
              </Link>
              <AccountSectionTitle>Мои заказы</AccountSectionTitle>
            </div>

            <Select onValueChange={(value) => setSelectedStatus(value as "all" | "active")}>
              <SelectTrigger className="1144:max-w-[200px] w-full outline-none rounded-2xl bg-primary-light-white h-[48px] border-none justify-between 1144:justify-center gap-2 text-[18px] font-medium leading-[120%]">
                <SelectValue placeholder="Статус заказа" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">Все заказы</SelectItem>
                  <SelectItem value="active">Активные заказы</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        { errorAll ? (
            <p className="text-2xl font-bold text-red-500">Ошибка во время загрузки заказов</p>
        ) : orders.length ? (
            <div className=" flex flex-col w-full gap-6">
              <ListItems items={orders} render={(order) =>
                  <OrderCard key={order.id} order={order} />}
              />
            </div>
        ) : (
            <p className="text-primary-gray text-2xl font-bold">У вас ещё нет заказов</p>
        )}

        {selectedStatus === "all" && myOrders?.meta?.last_page && myOrders?.meta?.last_page > 1 && (
            <Pagination lastPage={myOrders.meta.last_page} activePage={page} onPageChange={setPage} />
        )}
      </div>
  );
};
