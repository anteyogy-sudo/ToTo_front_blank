"use client";

import userIcon from "@/assets/icons/user-icon.svg";
import { useAuthDialogStore } from "@/stores/useAuthDialogStore";
import { useUserStore } from "@/stores/useUserStore";
import { TriangleAlert } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import LoginDialog from "./LoginDialog";
import { ensureAccessTokenCookie } from "@/utils/access-token";
import { MouseEvent } from "react";

type Props = {
    onNavigate?: () => void;
};

export const AuthButton = ({ onNavigate }: Props) => {
  const { user, status, token } = useUserStore();
  const { isOpenLoginDialog, setIsOpenLoginDialog } = useAuthDialogStore();

  const openLoginDialog = () => setIsOpenLoginDialog(true);
  const onCloseLoginDialog = () => setIsOpenLoginDialog(false);

  const handleAccountClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!ensureAccessTokenCookie(token)) {
      event.preventDefault();
      openLoginDialog();
      return;
    }
    onNavigate?.();
  };

  if (status === "pending") {
    return (
      <button
        type="button"
        disabled
        className="w-fit flex flex-col justify-between items-center text-center opacity-60 cursor-not-allowed h-[50px]"
      >
        <Image
          src={userIcon}
          alt="loading"
          width={32}
          height={32}
          priority
          className="animate-pulse"
        />
        <span className="w-fit select-none opacity-0 text-sm font-medium animate-pulse">
          {!user ? "Войти" : "Аккаунт"}
        </span>
      </button>
    );
  }

  if (status === "error") {
    return (
      <div className="text-primary-red w-fit flex flex-col items-center text-center">
        <TriangleAlert size={32} />
        <span className="text-sm font-medium">Ошибка</span>
      </div>
    );
  }

  if (user) {
    return (
      <Link href="/account"
            onClick={handleAccountClick}
            className="cursor-pointer w-fit flex flex-col justify-between items-center text-center h-[50px] hover:opacity-80 text-primary-gray hover:text-primary-blue transition-colors duration-300">
        <Image src={userIcon} alt="account" width={32} height={32} priority />
        <span className="min-w-[52px] w-fit text-sm font-medium">{user.first_name}</span>
      </Link>
    );
  }

  return (
    <>
      <button type="button"
              onClick={() => {onNavigate?.(); openLoginDialog(); }}
              className="w-fit flex flex-col items-center text-center h-[50px] hover:opacity-80 text-primary-gray hover:text-primary-blue transition-colors duration-300">
        <Image src={userIcon} alt="login" width={32} height={32} priority />
        <span className="w-fit text-sm font-medium">Войти</span>
      </button>

      <LoginDialog open={isOpenLoginDialog} onClose={onCloseLoginDialog} />
    </>
  );
};
