"use client";

import buttonCartIcon from "@/assets/icons/button-cart.svg";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ProductProps } from "@/types/product.types";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/stores/useCartStore";
import React from "react";

interface Props {
  id: ProductProps["id"];
  inCarousel?: boolean;
  variant?: "default" | "secondary" | "reserve" | "reserveCompact";
  stockProduct?: number;
  compact?: boolean;
}

export const CartButton = ({ id, inCarousel = false, variant = "default", stockProduct, compact = false }: Props) => {
  const add = useCartStore(state => state.add);
  const remove = useCartStore(state => state.remove);
  const changeAmount = useCartStore(state => state.changeAmount);
  const items = useCartStore(state => state.items);

  const existingItem = items.find((item) => item.id === id);
  const amount = existingItem?.amount ?? 0;

  const handleAdd = () => {
    add(id, 1);
  };

  const handleIncrement = () => {
    if (stockProduct && amount >= stockProduct) return;
    changeAmount(id, +1);
  };

  const handleDecrement = () => {
      if(amount === 1) {
          remove(id);
      } else {
          changeAmount(id, -1);
      }

  };

  //ToDo: Проверить что это за скелетон и убрать
  //
  // --- - - - SKELETON - - - ---
  //
  // if (!hasMounted) {
  //   return (
  //     <div
  //       className={cn(
  //         "w-full px-3 1144:h-12 h-12 py-2 bg-loading-skeleton animate-pulse rounded-md",
  //         inCarousel && "1144:h-12"
  //       )}
  //     ></div>
  //   );
  // }

// Адаптивная мобильная версия
// amount == 0
if (variant === "reserveCompact") {
    if (amount === 0) {
        return (
            <Button onClick={handleAdd}
                className={cn(
                    "flex w-full min-w-0 h-[51px] bg-primary-blue rounded-[8px] scale-[103%] transition-transform duration-300 items-center justify-center gap-1.5",
                    "px-2 xs:px-3 sm:px-4 text-white-500 font-normal text-[15px] xs:text-[15px] sm:text-[15px] md:text-[15px] leading-none"
                )}
            >
                <Image
                    src={buttonCartIcon}
                    alt="button cart icon"
                    width={18}
                    className="shrink-0"
                />
                <span className="min-w-0 truncate whitespace-nowrap">
                    В корзину
                </span>
            </Button>
        );
    }

    // amount > 0
    return (
        <div
            className={cn(
                "w-full min-w-0 h-[51px] font-medium text-white-500 flex items-stretch",
                "bg-primary-blue rounded-[8px] overflow-hidden data-[disabled=true]:opacity-50",
                "data-[disabled=true]:pointer-events-none select-none hover:scale-[103%] transition-transform duration-300"
            )}
        >
            <button onClick={handleDecrement} type="button"
                    className="flex items-center justify-center h-full shrink-0 w-10 xs:w-9 sm:w-9"
            >
                <Minus className="w-5 h-5 shrink-0" />
            </button>

            <Link href="/cart"
                  className="flex flex-col items-center justify-center flex-1 min-w-0 h-full text-center bg-[#00945E] text-white border-x border-white px-1 xs:px-2 sm:px-2"
            >
                <span className="w-full min-w-0 truncate text-[15px] xs:text-[12px] sm:text-[12px] leading-[110%] font-medium">
                    {amount} шт.
                </span>
            </Link>

            <button onClick={handleIncrement} type="button"
                    className="flex items-center justify-center h-full shrink-0 w-10 xs:w-9 sm:w-9"
            >
                <Plus className="w-5 h-5 shrink-0" />
            </button>
        </div>
    );
}

//Средняя версия кнопки
// amount == 0
if (variant === "reserve") {
    if (amount === 0) {
        return (
            <Button onClick={handleAdd}
                className={cn(
                    "w-full min-w-0 font-normal text-white-500 h-[51px] sm:h-[51px]",
                    "bg-primary-blue rounded-[8px] hover:opacity-90 transition-opacity duration-500 px-2 xs:px-3 sm:px-4",
                    "text-[13px] xs:text-[14px] sm:text-[15px] md:text-[17px] flex items-center justify-center gap-1.5"
                )}
            >
                <Image
                    src={buttonCartIcon}
                    alt="button cart icon"
                    width={compact ? 20 : 24}
                    className="shrink-0"
                />
                <span className="min-w-0 truncate whitespace-nowrap">
                    В корзину
                </span>
            </Button>
        );
    }

    // amount > 0
    return (
        <div
            className={cn(
                "w-full min-w-0 font-medium text-white-500 flex items-stretch bg-primary-blue rounded-[8px]",
                "overflow-hidden data-[disabled=true]:opacity-50 data-[disabled=true]:pointer-events-none",
                "select-none hover:scale-[103%] transition-transform duration-300",
                compact ? "h-10" : "h-[51px]",
                inCarousel && "1144:h-[51px]"
            )}
        >
            <button onClick={handleDecrement} type="button"
                    className="h-full flex items-center justify-center shrink-0 w-10 xs:w-11 sm:w-11"
            >
                <Minus className={cn(compact ? "w-5 h-5" : "1144:w-6 w-5")} />
            </button>

            <Link
                href="/cart"
                className={cn(
                    "flex-1 min-w-0 h-full flex flex-col items-center justify-center text-center",
                    "bg-[#00945E] text-white border-x border-white overflow-hidden",
                    compact ? "px-2" : "px-2 xs:px-3 sm:px-4 md:px-6"
                )}
            >
                <span className={cn("w-full min-w-0 truncate leading-[120%]",
                    compact ? "text-xs" : "text-[13px] xs:text-[14px] sm:text-[14px]")}
                >
                    {amount} шт.
                </span>

                {!compact && (
                    <span className="w-full min-w-0 truncate whitespace-nowrap text-[11px] xs:text-[12px] sm:text-[12px] leading-[120%] font-medium">
                        В корзину
                    </span>
                )}
            </Link>


            <button type="button"
                    onClick={handleIncrement}
                    className="h-full flex items-center justify-center shrink-0 w-10 xs:w-11 sm:w-11"
            >
                <Plus className={cn(compact ? "w-5 h-5" : "1144:w-6 w-5")} />
            </button>
        </div>
    );
}

//Обычная версия кнопки
// amount == 0
if (amount === 0) {
    return (
        <Button onClick={handleAdd}
            className={cn(
                "w-full font-normal text-[17px]",
                compact ? "h-10 text-sm" : "h-[51px]",
                inCarousel && "1144:h-[51px]",
                variant === "secondary" &&
                "rounded-[8px] bg-blue-lightBlue border border-primary-blue text-primary-blue"
            )}
        >
          {variant === "secondary" ? (
              "Добавить в корзину"
          ) : (
              <>
                  <Image src={buttonCartIcon} alt="button cart icon" width={compact ? 20 : 24} />
                  <span className="pr-[8px]">В корзину</span>
              </>
          )}
        </Button>
    );
}

// amount > 0
return (
    <div
        className={cn(
            "w-full font-medium text-white-500 flex items-center bg-primary-blue rounded-[8px] overflow-hidden",
            "data-[disabled=true]:opacity-50 data-[disabled=true]:pointer-events-none select-none hover:scale-[103%]",
            "transition-transform duration-300",
            compact ? "h-10" : "h-[51px]",
            inCarousel && "1144:h-[51px]",
            variant === "secondary" &&
            "bg-blue-lightBlue text-primary-blue min-h-[56px] border border-primary-blue rounded-[8px] h-[51px]"
        )}
    >
        <button onClick={handleDecrement} type="button"
            className={cn(
                "h-full flex items-center justify-center shrink-0 transition-opacity",
                compact ? "w-10" : "w-[52px]"
            )}
        >
            <Minus className={cn(compact ? "w-5 h-5" : "1144:w-6 w-5")} />
        </button>

        <Link
            href="/cart"
            className={cn(
                "flex-1 min-w-0 h-full flex flex-col items-center justify-center text-center",
                "bg-[#00945E] text-white border-x border-white",
                compact ? "px-2" : "px-2 xs:px-3 sm:px-4 md:px-6",
                "overflow-hidden"
            )}
        >
                <span
                    className={cn(
                        "w-full min-w-0 truncate leading-[120%]",
                        compact ? "text-xs" : "text-[14px] xs:text-[15px] sm:text-[16px]"
                    )}
                >
                    {amount} шт.
                </span>

            {!compact && (
                <span className="w-full min-w-0 truncate whitespace-nowrap text-[12px] xs:text-[13px] sm:text-[14px] leading-[120%] font-medium">
                    В корзину
                </span>
            )}
        </Link>

        <button onClick={handleIncrement} type="button"
            className={cn(
                "h-full flex items-center justify-center shrink-0 transition-opacity",
                compact ? "w-10" : "w-[52px]"
            )}
        >
            <Plus className={cn(compact ? "w-5 h-5" : "1144:w-6 w-5")} />
        </button>
    </div>
);
};