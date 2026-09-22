"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AccountSidebarLinkProps } from "../constants/account-sidebar.constants";

interface Props {
  link: AccountSidebarLinkProps;
  className?: string;
}

export const AccountSidebarLink = ({ link, className }: Props) => {
  const pathname = usePathname();

  return (
    <Link
      href={link.href}
      className={cn(
        " h-[62px] w-full flex items-center gap-3 font-medium text-[18px] leading-[120%] px-4 transition-all text-balance",
        link.href === pathname &&
          "bg-[#12121208] text-primary-blue rounded-2xl",
        className
      )}
    >
      <Image src={link.icon} alt="cube icon" width={24} height={24} priority />{" "}
      {link.device === "mobile" ? (
        <span className=" max-w-[220px] text-[18px] text-balance " >{link.label}</span>
      ) : (
        link.label
      )}
    </Link>
  );
};
