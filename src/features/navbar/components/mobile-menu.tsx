"use client";

import { ListItems } from "@/components/ListItems";
import { NAVBAR_LINKS } from "@/constants/navbar.constant";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { useWindowDimension } from "@/hooks/useWindowDimension";
import Link from "next/link";
import { useMobileMenuStore } from "../stores/useMobileMenuStore";
import { useFetchCatalogsQuery } from "@/features/navbar/hooks/queries/useFetchCatalogsQuery";
import {UseFetchActiveOrdersQuery} from "@/features/account/orders/hooks/queries/useFetchActiveOrdersQuery";
import {PHONE_MAIN} from "@/constants/global.constants";

export const MobileMenu = () => {
  const { width } = useWindowDimension();
  const { open, setOpen } = useMobileMenuStore();

  // ToDo: Почему они вызываются отсюда, втф
  const { data: catalogs } = useFetchCatalogsQuery({ enabled: true });
  const { data: lastOrder } = UseFetchActiveOrdersQuery();

  useIsomorphicLayoutEffect(() => {
    if (width > 1144) {
      setOpen(false);
    }
  }, [width]);


  const lastOrderCheck = lastOrder?.data?.[0]

    if(!open){
        return
    }

  return (
    <div
      data-open={open}
      className={`w-full h-fit 1144:hidden flex flex-col gap-4 absolute left-0 ${lastOrderCheck ? 'data-[open=true]:top-[154px] top-[154px]' : 'data-[open=true]:top-[139px] top-[139px]'} data-[open=true]:opacity-100 opacity-0 -top-full bg-white-500 px-6 py-4 z-50 shadow-sm transition-all duration-100 ease-in-out`}
    >
      <ul className=" w-fit h-fit flex flex-col gap-4">
        <ListItems
          items={NAVBAR_LINKS["row-2"]}
          render={(link, index) => (
            <li key={index} onClick={() => setOpen(false)}>
              <Link href={link.href} className=" leading-[120%]">
                {link.name}
              </Link>
            </li>
          )}
        />
      </ul>

      <div className=" w-fit h-fit flex flex-col text-sm gap-1 text-primary-gray">
        <a href={"tel:"+PHONE_MAIN} className="hover:underline leading-none">{PHONE_MAIN}</a>
        <span className=" leading-none">Пн-Пт, 09:00-18:00</span>
      </div>
    </div>
  );
};
