"use client";
import IconBonus from "@/assets/icons/IconBonus.svg";
import { Button } from "@/components/ui/button";
import ProductDescription from "@/features/product/components/ProductDescription";
import ProductMap from "@/features/product/components/ProductMap";
import { useFetchProductDescriptionQuery } from "@/features/product/hooks/queries/useFetchProductDescriptionQuery";
import { useFetchProductQuery } from "@/features/product/hooks/queries/useFetchProductQuery";
import Image from "next/image";
import { ProductLikeButton } from "./ProductLikeButton";
import IconGeo from '@/assets/icons/IconGeoBlue.svg'
import {ProductsOfTheDay} from "@/features/products/components/ProductsOfTheDay";
import {useFetchProductStockQuery} from "@/features/product/hooks/queries/useFetchProductStockQuery";
import {CartButton} from "@/features/cart/components/cart-button";
import { Breadcrumbs } from "@/features/products/components/Breadcrumbs";
import { useSearchParams } from "next/navigation";
import { ImageCarousel } from "./ImageCarousel";
import bonusIcon from "@/assets/icons/bonus-icon.svg";
import HowToOrderButton from "@/features/cart/components/how-to-order-button";
import ImageWithFallback from "@/utils/ImageWithFallBack";
import React, {useState} from "react";
import {formatText} from "@/utils/formatText";
import {ListItems} from "@/components/ListItems";
import {ProductProps} from "@/types/product.types";

const Product = ({ id }: { id: string }) => {
    const { data: product, status: statusProduct } = useFetchProductQuery(id);
    const { data: description } = useFetchProductDescriptionQuery(id);
    const searchParams = useSearchParams();
    const [selectedPharmacy, setSelectedPharmacy] = useState<number>(0);

    const GetStockOnMap = () => {
        const { data: stock, status: stockStatus } = useFetchProductStockQuery(id);
        if (!product?.data?.price) return;
        return(
            <ProductMap product={product.data}
                        price={product.data.price}
                        stock={stock} productId={id}
                        selectedPharmacy={selectedPharmacy}
                        setSelectedPharmacy={setSelectedPharmacy}
            />
        )
    }

    // Функция директории
    const getBreadcrumbItems = () => {
        const items = [];

        // Ссылка на главную страницу
        items.push({
            label: "Главная",
            href: "/",
        });

        // Получаем параметры из URL для построения ссылки на каталог
        const categoryFromUrl = searchParams.get('category');
        const catalogFromUrl = searchParams.get('catalog');
        const groupIdFromUrl = searchParams.get('group_id');
        const catalogIdFromUrl = searchParams.get('catalog_id');

        // Ссылка на каталог с сохранением всех параметров
        if (categoryFromUrl || catalogFromUrl || groupIdFromUrl || catalogIdFromUrl) {
            const catalogParams = new URLSearchParams();

            if (groupIdFromUrl) catalogParams.set('group_id', groupIdFromUrl);
            if (catalogFromUrl) catalogParams.set('catalog', catalogFromUrl);
            if (categoryFromUrl) {
                try {
                    const decodedCategory = decodeURIComponent(categoryFromUrl);
                    catalogParams.set('category', decodedCategory);
                } catch {
                    catalogParams.set('category', categoryFromUrl);
                }
            }

            // Формируем правильный путь к каталогу
            let catalogHref;
            if (catalogIdFromUrl) {
                catalogHref = `/catalog/${catalogIdFromUrl}?${catalogParams.toString()}`;
            } else {
                catalogHref = `/catalog?${catalogParams.toString()}`;
            }

            let catalogLabel: string | React.ReactNode;

            if (catalogFromUrl && categoryFromUrl) {
                try {
                    const decodedCatalog = decodeURIComponent(catalogFromUrl);
                    const decodedCategory = decodeURIComponent(categoryFromUrl);
                    catalogLabel = (
                        <span>
                        {decodedCatalog}
                            <span className="text-gray-500 mx-2">|</span>
                            {decodedCategory}
                    </span>
                    );
                } catch {
                    catalogLabel = (
                        <span>
                        {catalogFromUrl}
                            <span className="text-gray-500 mx-2">|</span>
                            {categoryFromUrl}
                    </span>
                    );
                }
            } else if (catalogFromUrl) {
                // Если только каталог
                try {
                    catalogLabel = decodeURIComponent(catalogFromUrl);
                } catch {
                    catalogLabel = catalogFromUrl;
                }
            } else if (categoryFromUrl) {
                // Если только категория
                try {
                    catalogLabel = decodeURIComponent(categoryFromUrl);
                } catch {
                    catalogLabel = categoryFromUrl;
                }
            } else {
                catalogLabel = "Каталог";
            }

            items.push({
                label: catalogLabel,
                href: catalogHref
            });
        } else {
            // Если нет конкретных параметров категории, ведем на общий каталог
            items.push({
                label: "Каталог",
                href: "/catalog"
            });
        }

        // Текущий товар (без ссылки)
        if (product?.data.name) {
            items.push({
                label: formatText(product.data.name),
            });
        }

        return items;
    };

    const breadcrumbItems = getBreadcrumbItems();

    const openConfirmDialog = () => {
        const element = document.getElementById('product-map');
        if (element) {
            element.scrollIntoView({behavior: 'smooth', block: 'start'});
        }
    };

    const price = product?.data.price ?? 0;
    const fullPrice = product?.data.discount?.fullPrice ?? 0;
    const discountAmount = Math.max(fullPrice - price, 0);

    const showDiscountBadge =
        !!product?.data.discount &&
        !product?.data.discount.isBonus &&
        discountAmount > 0;

    const showRecipeBadge = !!product?.data.isRecipe;

    const showBonusBadge =
        !!product?.data.discount?.isBonus &&
        discountAmount > 0;

    const product_meta = [
        {name: "Артикул", meta: product?.data?.meta?.art},
        {name: "Страна", meta: product?.data?.meta?.country},
        {name: "Лекарственная форма", meta: product?.data?.meta?.form},
        {name: "Производитель", meta: product?.data?.meta?.producer},
        {name: "Продавец", meta: product?.data?.meta?.vendor},
        {name: "Действующие вещества", meta: product?.data?.meta?.activeSubstance},
        {name: "Порядок отпуска", meta: product?.data?.isRecipe ? "По рецепту" : "Без рецепта"}
    ];

    const ProductBadges = ({
                               showDiscountBadge,
                               showRecipeBadge,
                               showBonusBadge,
                               discountAmount,
                           }: {
        showDiscountBadge: boolean;
        showRecipeBadge: boolean;
        showBonusBadge: boolean;
        discountAmount: number;
    }) => {
        if (!showDiscountBadge && !showRecipeBadge && !showBonusBadge) return null;

        return (
            <div className="absolute left-2 top-2 z-20 flex flex-col gap-2 select-none pointer-events-none">
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
        );
    };

    return (
        <div className="flex flex-col my-6 gap-2">
            <div className="flex flex-col py-8 gap-2 bg-white-500 px-10">
                <Breadcrumbs items={breadcrumbItems} />

                <h1 className="w-full max-1144:text-center font-bold text-[32px] text-black-100 leading-[100%]">
                    { product?.data?.name && (
                        formatText(product.data.name)
                    )}
                </h1>

                <div className="w-full py-6 flex 1144:flex-row 1144:justify-between flex-col 1144:gap-4 gap-3">

                    {/* First block - Фото товара */}
                    {statusProduct === "pending" ? (
                        <div className="w-full 1144:max-w-[389px] h-[379px] aspect-square bg-loading-skeleton rounded-2xl animate-pulse" />
                    ) : (
                        <div className="relative h-full">
                            <ProductBadges
                                showDiscountBadge={showDiscountBadge}
                                showRecipeBadge={showRecipeBadge}
                                showBonusBadge={showBonusBadge}
                                discountAmount={discountAmount}
                            />
                            <ImageCarousel
                                images={product?.data.images || []}
                                className="w-full"
                            />
                        </div>
                    )}

                    {/* Second block - Основная информация */}
                    <div className="flex flex-col w-full gap-3 max-w-[600px] max-xl:mx-auto justify-center items-center rounded-[46px] p-8 h-fit ">
                        <div className="flex flex-col gap-3 w-full">
                            <h2 className='font-bold text-[20px] 1144:block hidden pb-6 leading-[120%] text-black-100'>Основная информация</h2>
                            { statusProduct === 'pending' ? (
                                // Skeleton
                                <div className='flex flex-col gap-4'>
                                    <div className=" w-full h-[30px] aspect-square bg-loading-skeleton animate-pulse"></div>
                                    <div className=" w-full h-[30px] aspect-square bg-loading-skeleton animate-pulse"></div>
                                    <div className=" w-full h-[30px] aspect-square bg-loading-skeleton animate-pulse"></div>
                                    <div className=" w-full h-[30px] aspect-square bg-loading-skeleton animate-pulse"></div>
                                    <div className=" w-full h-[30px] aspect-square bg-loading-skeleton animate-pulse"></div>
                                </div>
                            ) : (
                                // Список meta
                                <ListItems
                                    items={product_meta}
                                    render={(item, index) => (
                                        item.meta && (
                                            <div key={index} className="flex items-center gap-1 text-balance">
                                                <p className="flex text-black-700 font-normal text-[16px] leading-[120%] whitespace-nowrap">{item.name}</p>
                                                <div className="flex-grow border-b-[1px] border-dashed border-[#12121266]" />
                                                <p className="text-end w-fit text-black-700 font-normal text-[16px] leading-[120%] ">{item.meta}</p>
                                            </div>
                                        )
                                    )}
                                />
                            )}
                        </div>
                        { !product?.data?.price && statusProduct === "success" && (
                            <div className="flex flex-row gap-2 w-full items-center">
                                <HowToOrderButton />
                                <div className="flex items-center justify-center min-w-[56px] max-w-[80px] rounded-[16px] bg-blue-lightBlue">
                                    <ProductLikeButton id={Number(id)} />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Third block - В наличии, цена, в корзину, в избранное */}
                    { statusProduct === "pending" && (
                        <div className="1144:min-w-[320px] 1144:max-w-[320px] h-fit rounded-[46px] w-full p-9 flex flex-col gap-1">
                            <div className='1144:flex hidden flex-col gap-4 items-end'>
                                <div className=" w-full h-[62px] rounded-[16px] aspect-square bg-loading-skeleton animate-pulse"></div>
                                <div className=" w-full h-[40px] aspect-square bg-loading-skeleton animate-pulse"></div>
                                <div className=" w-full h-[64px] aspect-square bg-loading-skeleton animate-pulse"></div>
                                <div className=" w-full h-[64px] aspect-square bg-loading-skeleton animate-pulse"></div>
                                <div className=" w-full h-[64px] aspect-square bg-loading-skeleton animate-pulse"></div>
                            </div>
                        </div>
                    )}
                    { product?.data?.price && (
                        <div className="1144:min-w-[320px] 1144:max-w-[320px] h-fit 1144:border border-[#E3E4EE] rounded-[46px] w-full p-9 flex flex-col gap-6
                        1144:shadow-[10px_10px_20px_0px_rgba(98,97,110,0.1),10px_-10px_8px_0px_rgba(146,146,146,0.1)]">
                            { (product?.data?.availableAt || product?.data?.availableAt !== 0) && (
                                <div className='flex gap-2'>
                                    <Image src={IconGeo} alt='geo' className="text-green-leaf" />
                                    <p className="font-bold text-[18px]">
                                        Есть в {product?.data?.availableAt} аптеках
                                    </p>
                                </div>
                            )}

                            { product?.data?.discount && (
                                <div className="flex justify-between">
                                    <p className="text-[32px] text-primary-gray leading-[120%] line-through">
                                        от {product?.data?.discount?.fullPrice} {product?.data.discount?.isRelative ? '%' : '₽'}
                                    </p>
                                    <p className="text-[14px] text-primary-gray leading-[120%]">Цена без скидки</p>
                                </div>
                            )}


                            <div className="flex flex-col gap-2">
                                <p className="font-bold text-[40px] leading-[100%] text-black-500">от {product.data.price} ₽</p>
                                {showBonusBadge && (
                                    <p className="text-primary-blue font-normal text-[14px] leading-[110%] flex gap-2">
                                        <Image
                                            src={IconBonus}
                                            alt="bonus icon"
                                            width={16}
                                            height={16}
                                        />
                                        Вернем {discountAmount} бонусов
                                    </p>
                                )}

                                <p className='text-[14px] block leading-[110%] text-primary-black-gray'>
                                    Цена действует при заказе на сайте
                                </p>

                                <div className="flex flex-row gap-2 w-full">
                                    {/*<div className="w-full md:hidden">*/}
                                    {/*    <CartButton id={product?.data.id} variant="reserveCompact" />*/}
                                    {/*</div>*/}

                                    {/*<div className="hidden w-full md:block">*/}
                                    {/*    <CartButton id={product?.data.id} variant="reserve" />*/}
                                    {/*</div>*/}

                                    <CartButton id={product?.data.id} variant="reserveCompact" />

                                    <div className="min-w-[56px] max-w-[80px]">
                                        <ProductLikeButton id={Number(id)} />
                                    </div>
                                </div>
                            </div>


                            <Button
                                className="w-full h-[64px] bg-white-500 text-primary-blue border-primary-blue border-[1px] rounded-[16px] font-bold text-[18px] p-6"
                                onClick={openConfirmDialog}>
                                Купить в один клик
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            {/* Две колонки */}
            {description?.data && product && (
                <div className="w-full 2xl:px-0 1144:px-6 py-6">
                    <div className="flex flex-col 1144:flex-row gap-6">
                        {/* Левая колонка описание */}
                        <div className="1144:w-4/5 xl:w-5/6">
                            <div className="bg-white-500 rounded-2xl scrollbar-custom max-h-[calc(100vh-200px)] overflow-y-auto">
                                <ProductDescription
                                    description={description.data}
                                    isRecipe={product?.data.isRecipe}
                                />
                            </div>
                        </div>

                        {/* Правая колонка карточка товара */}
                        <div className="block 1144:w-1/4 xl:w-1/5">
                            <div className="sticky top-24 bg-white-500 rounded-2xl shadow-lg p-5">
                                <div className="flex flex-col items-center text-center">
                                    {/* Изображение */}
                                    <div className="relative w-40 h-40 mb-4">
                                        <ProductBadges
                                            showDiscountBadge={showDiscountBadge}
                                            showRecipeBadge={showRecipeBadge}
                                            showBonusBadge={showBonusBadge}
                                            discountAmount={discountAmount}
                                        />
                                        <ImageWithFallback
                                            src={product?.data.images?.[0]}
                                            title={product?.data.name}
                                            alt={product?.data.name}
                                            fill
                                            sizes="160px"
                                            className="object-contain object-center rounded-lg"
                                            draggable={false}
                                        />
                                    </div>
                                    {/* Название товара */}
                                    <h4 className="font-bold text-sm text-gray-900 mb-4 line-clamp-2">
                                        {formatText(product.data.name)}
                                    </h4>
                                    {/* Кнопки вертикально */}
                                    <div className="w-full space-y-3">
                                        {product.data.price ? (
                                            <>
                                                <div className="w-full md:hidden">
                                                    <CartButton id={product.data.id} variant="reserveCompact" />
                                                </div>

                                                <div className="hidden w-full md:block">
                                                    <CartButton id={product.data.id} variant="reserve" />
                                                </div>

                                                <Button
                                                    onClick={openConfirmDialog}
                                                    className="w-full h-12 bg-white text-primary-blue border-primary-blue border rounded-lg font-semibold text-base"
                                                >
                                                    Купить в один клик
                                                </Button>
                                            </>
                                        ) : (
                                            <HowToOrderButton />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}


            { product?.data?.price && (
                <GetStockOnMap />
            )}

            <div className='my-[40px]'>
                <ProductsOfTheDay />
            </div>
        </div>
    );
};

export default Product;