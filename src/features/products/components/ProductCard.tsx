import bonusIcon from "@/assets/icons/bonus-icon.svg";
import { FavoriteButton } from "@/components/FavoriteButton";
import { CartButton } from "@/features/cart/components/cart-button";
import { cn } from "@/lib/utils";
import { ProductProps } from "@/types/product.types";
import Image from "next/image";
import Link from "next/link";
import HowToOrderButton from "@/features/cart/components/how-to-order-button";
import ImageWithFallback from "@/utils/ImageWithFallBack";
import {formatText} from "@/utils/formatText";

interface Props {
    product: ProductProps;
    className?: string;
    cartVariant?: "default" | "secondary" | "reserve";
}

export const ProductCard = ({ product, className, cartVariant = "reserve"}: Props) => {
    const specialPrice = product.discount && product.discount?.amount;
    const salePercent = product.discount && product.bonus;

    const price = product.price ?? 0;
    const fullPrice = product.discount?.fullPrice ?? 0;
    const discountAmount = Math.max(fullPrice - price, 0);

    const showDiscountBadge =
        !!product.discount &&
        !product.discount.isBonus &&
        discountAmount > 0;

    const showRecipeBadge = product.isRecipe;

    const showBonusBadge =
        !!product.discount?.isBonus &&
        discountAmount > 0;

    const getPriceWithoutSale = () => {
        const priceWithSale = product.price;
        const discountPercent = product.bonus;

        if (!priceWithSale || !discountPercent) return priceWithSale;

        const priceWithoutSale = priceWithSale / (1 - discountPercent / 100);
        return Math.round(priceWithoutSale);
    };

    const getPriceWithoutSpelacPrice = () => {
        if (product.price && product.discount?.amount) {
            return product.price + product.discount?.amount;
        }
    };

    return (
        <div
            className={cn(
                "flex flex-col gap-4 w-full shadow-custom-product h-full rounded-2xl bg-white-500 items-center overflow-hidden relative px-4 py-[18px]",
                className
            )}
        >
            <div className="absolute top-5 left-5 z-20 flex flex-col gap-2 select-none pointer-events-none">
                {showDiscountBadge && (
                    <div className="w-fit py-1 px-3 flex items-center gap-1 rounded-[99px] bg-primary-red text-white-500 text-sm leading-[110%]">
                        -{discountAmount} ₽
                    </div>
                )}

                {showRecipeBadge && (
                    <div className="w-fit py-1 px-3 flex items-center gap-1 rounded-[99px] bg-primary-pink text-white-500 text-sm leading-[110%]">
                        По рецепту
                    </div>
                )}

                {showBonusBadge && (
                    <div className="w-fit py-1 px-3 flex items-center gap-1 rounded-[99px] bg-primary-blue text-white-500 text-sm leading-[110%]">
                        +{discountAmount}{" "}
                        <Image
                            src={bonusIcon}
                            alt="bonus icon"
                            width={16}
                            height={16}
                            priority
                        />
                    </div>
                )}
            </div>

            {/* Кнопка избранное */}
            <div className="absolute top-2.5 right-2.5 z-10">
                <FavoriteButton productId={product.id} />
            </div>

            {/* Контейнер с квадратной формой */}
            <Link
                href={"/product/" + product.id}
                className="relative select-none flex items-center justify-center w-[192px] min-h-[180px]"
            >
                <div className="relative w-full h-full p-3">
                    <ImageWithFallback
                        src={product?.images?.[0]}
                        title={product?.name}
                        alt={product?.name}
                        fill
                        sizes="192px"
                        className="object-contain object-center transition-transform hover:scale-[120%] duration-500 bg-white rounded-lg p-5"
                        draggable={false}
                    />
                </div>
            </Link>

            <div className="w-full h-full flex flex-col justify-between">
                <Link href={"/product/" + product.id}
                      className="mb-2 w-full text-primary-black-gray md:text-[17px] text-sm font-normal leading-[120%]
                      whitespace-normal break-words hover:scale-x-[103%] hover:text-primary-blue transition duration-500"
                >
                    {formatText(product.name)}
                </Link>

                <div className="flex flex-col lg:min-w-[200px] min-w-[100px] w-full items-center gap-[10px]">
                    {!!product.price && (
                        <Link href={"/product/" + product.id}
                              className="w-full flex items-center gap-4">
                            <p className="md:text-[20px] text-[21px] font-bold leading-[120%] hover:scale-x-[105%] transition-transform duration-500">
                                От {product.price} ₽
                            </p>
                            {(!!specialPrice || !!salePercent) && (
                                <span className="md:text-[20px] text-[18px] leading-[120%] line-through text-primary-gray">
                                    {specialPrice ? getPriceWithoutSpelacPrice() : getPriceWithoutSale()} ₽
                                </span>
                            )}
                        </Link>
                    )}

                    {!!product.price ? (
                        <>
                            <div className="w-full md:hidden">
                                <CartButton id={product.id} variant="reserveCompact" />
                            </div>
                            <div className="hidden w-full md:block">
                                <CartButton id={product.id} variant={cartVariant} />
                            </div>
                        </>
                    ) : (
                        <HowToOrderButton />
                    )}
                </div>
            </div>
        </div>
    );
};