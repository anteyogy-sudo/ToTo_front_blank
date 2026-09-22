import { OrderProductProps } from "@/types/order.types";
import {FavoriteButton} from "@/components/FavoriteButton";
import {Separator} from "@/components/ui/separator";
import Link from "next/link";
import ImageWithFallback from "@/utils/ImageWithFallBack";
import React from "react";


interface Props {
    product: OrderProductProps;
}

export const OrderProductCard = ({ product }: Props) => {
    return (
        <>
            <div className=" w-[98%] flex md:items-center md:justify-between py-1">
                <div className=" w-full h-fit flex md:flex-row flex-col md:items-center md:justify-between md:gap-2">
                    <div className=" w-fit flex md:flex-row flex-col items-center gap-4">
                        <div className=" w-fit flex items-center gap-[16px]">
                            <Link
                                href={`/product/${product.id}`}
                                className=" w-[70px] h-[70px] relative"
                            >
                                <ImageWithFallback src={product?.images?.[0]}
                                                   alt={product?.name}
                                                   title={product?.name}
                                                   fill
                                                   className="w-full h-full object-contain"
                                />
                            </Link>
                            <Link href={`/product/${product.id}`}
                                  className=" md:text-[18px] w-full leading-[120%]"
                            >
                                {product.name}
                            </Link>
                        </div>
                    </div>

                    <div className=" md:w-fit w-full flex items-center md:justify-normal justify-between gap-[10px]">
                        <div className=" w-fit flex items-center gap-4">
                        <span className=" w-full flex items-center justify-center font-medium leading-[120%] whitespace-nowrap">
                            {product.amount} шт
                        </span>
                        </div>

                        <div className=" w-fit md:w-[112px] flex md:flex-col gap-[3px] items-center justify-center">
                        <span className=" flex md:text-[20px] text-[18px] font-bold leading-[120%] items-center justify-center">
                            {product.price} ₽
                        </span>
                        </div>
                    </div>
                </div>
                <div className='relative lg:block hidden  ml-6 w-[20px] h-[20px]'>
                    <FavoriteButton className='!right-0 !top-0' productId={product.id} />
                </div>
            </div>

            <Separator className=" last:hidden" />
        </>
    );
};