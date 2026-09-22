"use client";

import Image from "next/image";
import { ProductProps } from "@/types/product.types";
import Link from "next/link";
import { CartButton } from "@/features/cart/components/cart-button";
import NoPhoto from "@/assets/icons/NoPhoto.svg";
import bonusIcon from "@/assets/icons/bonus-icon.svg";
import { FavoriteButton } from "@/components/FavoriteButton";
import HowToOrderButton from "@/features/cart/components/how-to-order-button";
import { useSearchParams, useParams } from "next/navigation";

interface Props {
    product: ProductProps;
    className?: string;
}

export const CatalogProductCard = ({ product, className }: Props) => {
    const searchParams = useSearchParams();
    const params = useParams();

    // Получаем параметры из URL для передачи в ссылку товара
    const categoryFromUrl = searchParams.get('category');
    const catalogFromUrl = searchParams.get('catalog');
    const groupIdFromUrl = searchParams.get('group_id');

    // Получаем catalog_id из параметров пути
    const catalogIdFromPath = params.id as string;

    const price = product.price ?? 0;
    const fullPrice = product.discount?.fullPrice ?? 0;
    const discountAmount = Math.max(fullPrice - price, 0);

    const showDiscountBadge = !!product.discount && !product.discount.isBonus && discountAmount > 0;
    const showRecipeBadge = product.isRecipe;
    const showBonusBadge = !!product.discount?.isBonus && discountAmount > 0;

    const showOldPrice = !!product.discount && fullPrice > price;

    const getProductUrl = () => {
        const queryParams: Record<string, string> = {};

        if (categoryFromUrl) queryParams.category = categoryFromUrl;
        if (catalogFromUrl) queryParams.catalog = catalogFromUrl;
        if (groupIdFromUrl) queryParams.group_id = groupIdFromUrl;

        if (catalogIdFromPath) {
            queryParams.catalog_id = catalogIdFromPath;
        }

        return {
            pathname: `/product/${product.id}`,
            query: queryParams,
        };
    };

    const productUrl = getProductUrl();

    return (
        <div
            className={`w-full md:h-fit min-h-[102px] py-3 flex items-center justify-between md:gap-6 gap-2 rounded-2xl bg-white-500 shadow-sm md:pr-6 pr-3 relative ${className || ""}`}
        >
            <FavoriteButton
                className="!left-[9px] !top-[14px]"
                productId={product.id}
                position="left"
            />

            <Link href={productUrl} className="md:min-w-[200px] min-w-[70px] aspect-square relative">
                <Image
                    src={product.images?.[0] || NoPhoto}
                    alt={product.name}
                    fill
                    className="w-full h-full object-contain py-4"
                    sizes="(max-width: 768px) 70px, 200px"
                    priority={false}
                />
            </Link>

            <Link href={productUrl} className="w-full h-fit flex flex-col md:gap-4 gap-1">
                <div className="flex flex-col gap-1">
                    {showDiscountBadge && (
                        <div className="w-fit py-1 px-3 flex items-center gap-1 rounded-[99px] bg-[#E53527] text-white-500 text-sm leading-[110%]">
                            -{discountAmount} ₽
                        </div>
                    )}

                    {showRecipeBadge && (
                        <div className="w-fit py-1 px-3 flex items-center gap-1 rounded-[99px] bg-[#CA2D74] text-white-500 text-sm leading-[110%]">
                            По рецепту
                        </div>
                    )}

                    {showBonusBadge && (
                        <div className="w-fit py-1 px-3 flex items-center gap-1 rounded-[99px] bg-[#005CA7] text-white-500 text-sm leading-[110%]">
                            +{discountAmount}
                            <Image
                                src={bonusIcon}
                                alt="bonus icon"
                                width={16}
                                height={16}
                                style={{ width: "auto", height: "auto" }}
                            />
                        </div>
                    )}
                </div>

                <p className="md:font-bold md:text-[24px] text-[14px] font-normal md:text-black-100 md:leading-[100%] text-[#8E9AAB] leading-[110%]">
                    {product.name}
                </p>
            </Link>

            {price ? (
                <div className="md:min-w-[200px] min-w-[127px] h-fit flex items-center flex-col md:gap-4 gap-1 text-center">
                    <div className="w-fit flex items-center md:gap-2 gap-1">
                        <p className="font-bold md:text-[24px] text-[15px] leading-[100%] md:text-primary-blue text-black-100">
                            От {price} ₽
                        </p>

                        {showOldPrice && (
                            <span className="text-primary-gray md:text-[24px] text-[15px] line-through">
                                {fullPrice} ₽
                            </span>
                        )}
                    </div>

                    <div className="w-full md:hidden">
                        <CartButton id={product.id} variant="reserveCompact" />
                    </div>

                    <div className="hidden w-full md:block">
                        <CartButton id={product.id} variant="reserve" />
                    </div>
                </div>
            ) : (
                <div className="lg:min-w-[200px] min-w-[100px] h-fit items-center flex-col gap-4 text-center">
                    <HowToOrderButton />
                </div>
            )}
        </div>
    );
};