"use client";

import logout from "@/assets/icons/logout.svg";
import { useUserStore } from "@/stores/useUserStore";
import Image from "next/image";

export const LogoutButton = () => {
  const { logoutFn } = useUserStore();

  const onLogout = () => {
    if (typeof window === "undefined") {
      console.error("Window is not defined");
      return;
    }
    logoutFn();
    window.location.replace("/");
  };

  return (
      <button
          onClick={onLogout}
          className=" max-w-[113px] px-4 flex items-center gap-1 font-medium text-[18px] leading-[120%] text-primary-blue"
      >
        <Image src={logout} alt="logout icon" width={24} height={24} priority />
        Выйти
      </button>
  );
};
