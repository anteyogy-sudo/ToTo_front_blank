import { FavoriteButton } from "@/components/FavoriteButton";
import { CartButton } from "@/features/cart/components/cart-button";
// import bonusIcon from "@/assets/icons/bonus-icon.svg";
import {ProductProps} from "@/types/product.types";
import Link from "next/link";
import HowToOrderButton from "@/features/cart/components/how-to-order-button";
import ImageWithFallback from "@/utils/ImageWithFallBack";
import {formatText} from "@/utils/formatText";

interface Props {
    product: ProductProps;
}

export const BannerProductCard = ({ product }: Props) => {

    return (
        <div className="1144:flex hidden h-[442px] rounded-2xl flex-col items-center p-[3px] shadow-[0px_0px_20px_0px_rgba(0,0,0,0.08)]
                    max-w-[293px] w-full
                    [bg-linear-gradient(to_right,_#008CFF,_#B9FFCA,_#BCE1FF])] hover:scale-[102%] transition-transform duration-500">
            <div className="bg-white-500 w-full h-full py-[20px] px-4 rounded-2xl flex justify-between flex-col">
                <p className='text-[27px] text-black-100 font-bold leading-[100%] text-center px-[25px]'>Рекомендация месяца</p>
                <div className='flex rounded-2xl bg-white-500 flex-col items-center'>
                    {/*<div className=" w-full h-fit flex gap-1 flex-wrap md:pl-4 pl-3 absolute top-5 left-0 z-10 select-none">*/}
                    {/*    {!!product.bonus && (*/}
                    {/*        <div className=" w-fit py-1 px-3 flex items-center  gap-1 rounded-[99px] bg-primary-blue text-white-500 text-sm leading-[110%]">*/}
                    {/*            +{product.bonus}{" "}*/}
                    {/*            <Image*/}
                    {/*                src={bonusIcon}*/}
                    {/*                alt="bonus icon"*/}
                    {/*                width={16}*/}
                    {/*                height={16}*/}
                    {/*                priority*/}
                    {/*            />*/}
                    {/*        </div>*/}
                    {/*    )}*/}
                    {/*    {!!product.bonus ||*/}
                    {/*        (!!product.bonus && (*/}
                    {/*            <div className=" w-fit py-1 px-3 flex items-center gap-1 rounded-[99px] bg-blue-medium text-white-500 text-sm leading-[110%]">Спец цена</div>*/}
                    {/*        ))}*/}
                    {/*    {!!product.bonus && (*/}
                    {/*        <div className=" w-fit py-1 px-3 flex items-center gap-1 rounded-[99px] bg-primary-red text-white-500 text-sm leading-[110%]">-{product.bonus}%</div>*/}
                    {/*    )}*/}
                    {/*</div>*/}
                    <div className='flex w-[90%] justify-end mb-[-30px] z-20'><FavoriteButton productId={product.id} /></div>

                    <Link href={`/product/${product.id}`} className={"flex relative w-[215px] min-h-[160px]"}>
                        <ImageWithFallback src={product?.images?.[0]}
                                           title={product?.name}
                                           sizes="215px"
                                           fill
                                           alt={product?.name}
                                           draggable={false}
                                           className=' object-contain hover:scale-[115%] transition-tranform duration-500 select-none'
                        />
                    </Link>

                    <Link href={`/product/${product.id}`}
                          className="flex text-center text-primary-black-gray leading-[120%] font-normal hover:scale-[103%] transition-transform duration-300 ">
                        <span className="line-clamp-3 text-[18px] ">
                            {formatText(product.name)}
                        </span>
                    </Link>
                </div>
                <div className='flex h-fit rounded-2xl bg-white-500 flex-col items-center gap-2 2xl:gap-3'>
                    {
                        !!product.price && (
                            <Link href={`/product/${product.id}`} className="flex justify-around items-center text-[24px] w-full px-4 gap-4 leading-[120%] hover:scale-[105%] transition-transform duration-500">
                                <p className="font-bold ">
                                    От {product.price} ₽
                                </p>
                                {/*ToDo: FullPrice + Discount or Bonus*/}
                                { !!product.discount && (
                                    <span className="line-through text-primary-gray">{product.discount?.fullPrice} ₽</span>
                                ) }
                            </Link>
                        )
                    }

                    <div className=" w-full  flex items-center gap-4">
                        { !!product.price ?
                            (<CartButton id={product.id} inCarousel />) : (<HowToOrderButton/>)
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};
