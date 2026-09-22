"use client";

import { ListItems } from "@/components/ListItems";
import { useUserStore } from "@/stores/useUserStore";
import { substringText } from "@/utils/substring-text";
// import Image from "next/image";
import { ACCOUNT_SIDEBAR_LINKS } from "../constants/account-sidebar.constants";
import { AccountSidebarLink } from "./AccountSidebarLink";
import { LogoutButton } from "./LogoutButton";

export const AccountSidebar = () => {
  const { user, status } = useUserStore();

  return (
    <aside className=" lg:max-w-[320px] lg:min-w-[320px] h-fit lg:w-fit w-full py-6 px-4 flex flex-col gap-6 bg-white-500 shadow-sm rounded-2xl">
      {/*<div className=" w-full flex md:flex-col items-center gap-y-2 gap-x-6">*/}
      {/*  <Image src={avatar} alt="avatar" width={80} height={80} priority />*/}
      {/*  <span className=" md:hidden font-bold text-[20px] leading-[120%]">*/}
      {/*    {status === "pending"*/}
      {/*      ? "Loading..."*/}
      {/*      : status === "success" && user*/}
      {/*      ? `${user?.first_name} ${user?.last_name}`*/}
      {/*      : "Error"}*/}
      {/*  </span>*/}
      {/*  <button className=" md:inline-block hidden w-fit text-primary-gray leading-[120%] font-medium">*/}
      {/*    Изменить фото*/}
      {/*  </button>*/}
      {/*</div>*/}
      <section className=" w-full flex flex-col gap-4">
        <article className="md:block hidden px-4">
          {status === "pending" ? (
            <div className=" w-full h-8 rounded-sm bg-loading-skeleton animate-pulse"></div>
          ) : status === "error" ? (
            <p>error</p>
          ) : (
            <p className=" max-w-64 font-bold text-[24px] leading-[110%]">
              {substringText(`${user?.first_name ? user?.first_name : ''} ${user?.last_name ?  user?.last_name : ""}`, 18)}
            </p>
          )}
        </article>
        <article className=" w-full flex flex-col gap-1">
          <ListItems
            items={ACCOUNT_SIDEBAR_LINKS}
            render={(link, index) => (
              <AccountSidebarLink
                key={index}
                link={link}
                className={link.device === "mobile" ? "md:hidden" : ""}
              />
            )}
          />
        </article>
      </section>
      <section className=" w-full md:flex hidden flex-col gap-4">
        <article className=" max-w-64 px-4">
          <p className=" font-bold text-[24px] leading-[110:]">
            Дополнительная информация
          </p>
        </article>
        <article className=" w-full flex flex-col gap-1">
          <ListItems
            items={ACCOUNT_SIDEBAR_LINKS.filter(
              (link) => link.device === "mobile"
            )}
            render={(link, index) => (
              <AccountSidebarLink key={index} link={link} />
            )}
          />
        </article>
      </section>

      <LogoutButton />
    </aside>
  );
};
