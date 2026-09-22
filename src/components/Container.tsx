import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface Props {
  className?: string;
  children: ReactNode;
}

export const Container = ({ className, children }: Props) => {
  return <section className={cn("max-w-base mx-auto w-full h-fit 3xl:px-0 xl:px-10 1144:px-10 1144:py-[22px] xs:p-5 p-5", className)}>{children}</section>;
};
