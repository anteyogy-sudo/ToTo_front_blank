"use client";

import Image from "next/image";
import hamburger from "@/assets/icons/hamburger.svg";
import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { CrossIcon } from "@/icons/cross";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  open: boolean;
};

export const HamburgerButton = ({ open, className, ...props }: Props) => {
  return (
    <button className={cn(className)} {...props}>
      {open ? (
        <CrossIcon />
      ) : (
        <Image
          src={hamburger}
          alt="hamburger menu icon"
          width={24}
          height={24}
          priority
        />
      )}
    </button>
  );
};
