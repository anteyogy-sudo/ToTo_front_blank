"use client";

import { Container } from "@/components/Container";
import { ListItems } from "@/components/ListItems";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useCityStore } from "@/features/navbar/stores/useCityStore";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { createArray } from "@/utils/create-array";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { useFetchFilterableProductsMutation } from "../hooks/mutations/useFetchFilterableProductsMutation";
import { CatalogFilters } from "./CatalogFilters";
import { CatalogProductCard } from "./CatalogProductCard";
import { DesktopSorting } from "./DesktopSorting";
import { MobileFilterButton } from "./MobileFilterButton";
import { MobileSorting } from "./MobileSorting";
import { NoDataMessage } from "@/components/NoDataMessage";
import { Pagination } from "@/components/Pagination";
import { ProductCard } from "@/features/products/components/ProductCard";
import CatalogListIcon from "@/icons/CatalogListIcon";
import CatalogRowIcon from "@/icons/CatalogRowIcon";
import { useCatalogStore } from "@/features/catalogs/store/useCatalogStore";
import NotFound2 from '@/assets/resources/catalogs/NotFound2.svg';
import NotFound from '@/assets/resources/NoSearch.svg';
import { useRouter, useSearchParams, usePathname } from "next/navigation";

// Интерфейс для пропсов компонента
interface Props {
    catalog_id: number;
}

// Компонент для отображения каталога товаров с фильтрами, сортировкой и поиском

export const Catalogs = ({ catalog_id }: Props) => {
    // Хук для получения товаров с фильтрацией - обновленная версия
    const {
        mutateAsync: fetchProductsMutation,
        data: products,
        isPending,
        error
    } = useFetchFilterableProductsMutation(catalog_id);

    // Состояние для вида отображения сетка или список
    const { view, setView } = useCatalogStore((state) => state);
    const router = useRouter();

    // Состояние для сброса фильтров
    const [resetFilterHandler, setResetFilterHandler] = useState(0);

    // Удаляем локальное состояние загрузки, используем isPending из хука
    const [hasInitialized, setHasInitialized] = useState(false);

    // Хук для работы с городом
    const { confirmedCity, loadConfirmedCityFromCookie } = useCityStore();
    const searchParams = useSearchParams();

    // Загружаем город из cookie при монтировании компонента
    useIsomorphicLayoutEffect(() => {
        loadConfirmedCityFromCookie();
    }, []);

    // Получаем параметры из URL
    const catalog_name = searchParams.get("catalog"); // Название каталога
    const category_name = searchParams.get("category"); // Название категории
    const pathname = usePathname();
    const discount_id = searchParams.get("discount_id"); // ID акции/скидки

    const search_query = searchParams.get("query"); // Поисковый запрос
    const currentPage = parseInt(searchParams.get("page") || "1", 10);

    // Состояние для пагинации
    const [lastPage, setLastPage] = useState<number | null>(null);
    const hasSetLastPage = useRef(false);

    // Функция для выполнения запроса товаров
    const onMutate = async () => {
        try {
            await fetchProductsMutation();
            setHasInitialized(true);
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    // Запускаем запрос когда город подтвержден
    useIsomorphicLayoutEffect(() => {
        if (confirmedCity?.id && !hasInitialized) {
            console.log('Initial fetch with city:', confirmedCity.id);
            onMutate().catch(console.error);
        }
    }, [confirmedCity?.id, hasInitialized]);

    const prevSearchParamsRef = useRef<string>(searchParams.toString());

    useIsomorphicLayoutEffect(() => {
        const currentSearchParams = searchParams.toString();

        if (prevSearchParamsRef.current !== currentSearchParams && confirmedCity && hasInitialized) {
            console.log('Search params changed, refetching:', currentSearchParams);
            onMutate().catch(console.error);
        }

        prevSearchParamsRef.current = currentSearchParams;
    }, [searchParams, confirmedCity, hasInitialized]);

    useIsomorphicLayoutEffect(() => {
        if (
            products?.meta?.last_page &&
            products.meta.last_page !== lastPage
        ) {
            setLastPage(products.meta.last_page);
            hasSetLastPage.current = true;
        }
    }, [products?.meta?.last_page]);

    // Обработчик пагинации
    const onChangePage = async (page: number) => {
        window.scrollTo({ top: 0, behavior: 'smooth' });

        const params = new URLSearchParams(searchParams.toString());
        params.set('page', page.toString());

        router.replace(`?${params.toString()}`, { scroll: false });
    };


    // Перенаправление на главную страницу
    const redirectHomePage = () => {
        router.push("/");
    }

    // Обработчик сброса фильтров
    const handleRemoveFilter = () => {
        // Очищаем параметры фильтров в URL
        const params = new URLSearchParams();

        // Сохраняем основные параметры
        if (catalog_id) params.set('category_id', catalog_id.toString());
        if (catalog_name) params.set('catalog', catalog_name);
        if (category_name) params.set('category', category_name);
        if (confirmedCity?.id) params.set('city', confirmedCity.id.toString());
        if (search_query) params.set('query', search_query);
        if (discount_id) params.set('discount_id', discount_id);

        // Устанавливаем первую страницу
        params.set('page', '1');

        // Обновляем URL
        router.replace(`?${params.toString()}`, { scroll: false });

        // Сбрасываем счетчик фильтров
        setResetFilterHandler((prev) => prev + 1);
    };

    // Устанавливаем вид отображения список для страниц с акциями
    useIsomorphicLayoutEffect(() => {
        if (discount_id) {
            setView('list');
        }
    }, [discount_id, setView]);

    if (discount_id) {
        return null;
    }

    if (pathname.startsWith('/promotion/') && pathname !== '/promotion') {
        return null;
    }
    // Обработка случаев когда товары не найдены
    if (!isPending && !error && (!products?.data || products.data.length === 0) && hasInitialized) {
        const isFirstPage = !searchParams.get("page") || searchParams.get("page") === "1";

        // Поиск по всему сайту без каталога и акций
        if (isFirstPage && !catalog_id && !discount_id) {
            return (
                <div className="min-h-[600px] bg-white-500 w-full md:py-10 py-2 ">
                    <Image src={NotFound} className='mx-auto max-w-[377px] lg:scale-[1.6] w-full h-full ' alt='not found'/>
                    <div className=" flex flex-col items-center md:gap-[50px] gap-[19px]">
                        {/* Сообщение для поиска */}
                        <p className='text-primary-blue font-medium md:text-[22px] text-[18px] leading-[100%]'>
                            {search_query ? (
                                <>По вашему запросу <span className='font-extrabold'>&ldquo;{search_query}&rdquo;</span> ничего не найдено</>
                            ) : (
                                <>По вашему запросу <span className='font-extrabold'>ничего</span> не найдено</>
                            )}
                        </p>
                        <button onClick={redirectHomePage} className='md:max-w-[317px] max-w-[279px] w-full md:h-[62px] h-[48px] rounded-[16px] flex justify-center bg-primary-blue text-white-500 items-center font-bold text-[18px] leading-[120%]'>
                            На главную
                        </button>
                    </div>
                </div>
            );
        }

        // Товары не найдены в конкретном каталоге с фильтрами
        if (isFirstPage && catalog_id && !discount_id && resetFilterHandler === 0) {
            return (
                <Container className="flex gap-6 min-h-[600px] bg-white-500 w-full md:py-10 py-2 pr-5">
                    {/* Боковая панель с фильтрами */}
                    <div className="w-fit h-fit 1144:flex hidden border-r border-gray-200 pr-6">
                        <CatalogFilters
                            category_id={catalog_id}
                            onMutate={onMutate}
                            resetFilterHandler={resetFilterHandler}
                            setResetFilterHandler={setResetFilterHandler}
                        />
                    </div>

                    {/* Сообщение об отсутствии товаров */}
                    <div className="flex-1 flex items-center justify-center">
                        <div className="flex flex-col items-center gap-[24px]">
                            <Image src={NotFound2} className="mx-auto max-w-[377px] w-full h-full" alt="not found"/>
                            <div className="flex flex-col items-center md:gap-[42px] gap-[16px]">
                                <div className="flex flex-col md:gap-[22px] gap-[14px] items-center">
                                    <p className="text-primary-blue font-medium md:text-[22px] text-[18px] leading-[100%]">По выбранным фильтрам <span className="font-extrabold">ничего</span> не найдено</p>
                                    <p className="font-medium text-primary-blue md:text-[22px] text-[18px]">Попробуйте изменить свой запрос</p>
                                </div>
                                <button onClick={handleRemoveFilter} className="md:max-w-[369px] max-w-[279px] w-full md:h-[62px] h-[48px] rounded-[16px] flex justify-center bg-primary-blue text-white-500 items-center font-bold text-[18px] leading-[120%]">
                                    Очистить фильтры
                                </button>
                            </div>
                        </div>
                    </div>
                </Container>
            );
        }

        // Товары не найдены на странице пагинации
        return (
            <div className="w-full h-fit p-10 flex items-center justify-center">
                <NoDataMessage message="На этой странице товаров не найдено." />
            </div>
        );
    }

    // Основной рендер компонента с товарами
    return (
        <Container className="flex flex-col gap-10 pr-5">
            <header className="w-full h-fit flex flex-col gap-2">
                <div className="w-full h-fit flex items-center justify-between">
                    <div className="1144:w-fit w-full h-fit flex items-center 1144:justify-start justify-between gap-6 font-bold">
                        {/* Отображение для поискового запроса */}
                        {search_query ? (
                            <h2 className="1144:text-[40px] text-[24px] leading-[100%]">
                                Результаты по запросу{" "}
                                <span className="text-primary-blue">{search_query}</span>
                                {isPending ? (
                                    <LoadingSpinner size={24} />
                                ) : error ? (
                                    <p>error</p>
                                ) : (
                                    <span className="text-primary-gray"> {products?.meta?.total || 0} товаров</span>
                                )}
                            </h2>
                        ) : (
                            <>
                                {
                                    category_name && <h2 className="1144:text-[40px] text-[24px] leading-[100%]">{category_name}</h2>
                                }

                                {
                                    !category_name && catalog_name && <h2 className="1144:text-[40px] text-[24px] leading-[100%]">{catalog_name}</h2>
                                }
                                <div className="1144:text-[32px] 1144:flex hidden text-[24px] leading-[100%] w-fit h-fit items-center gap-2 text-primary-gray">
                                    {isPending ? (
                                        <LoadingSpinner size={24} />
                                    ) : error ? (
                                        <p>error</p>
                                    ) : (
                                        <span>{products?.meta?.total || 0}</span>
                                    )}{" "}
                                    товаров
                                </div>
                            </>
                        )}
                    </div>

                    {/* Сортировка и переключение вида для десктопной версии */}
                    <div className="1144:flex hidden items-center gap-4">
                        <DesktopSorting hideNameSort={catalog_id === 0} />
                        {/* Переключение вида отображения для десктопа */}
                        {
                            !discount_id && (
                                <div className='flex'>
                                    <div onClick={() => setView('grid')} className='cursor-pointer'>
                                        <CatalogListIcon selected={view === 'grid'}/>
                                    </div>
                                    <div onClick={() => setView('list')} className='cursor-pointer'>
                                        <CatalogRowIcon selected={view === 'list'}/>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>

                {/* Показываем только если нет поискового запроса */}
                {!search_query && (
                    <div className='flex justify-start'>
                        <div>
                            {
                                (catalog_name || category_name) && (
                                    <div className="w-fit flex items-center gap-2">
                                        {
                                            catalog_name && (
                                                <span className="leading-[120%] text-primary-gray">{catalog_name}</span>
                                            )
                                        }

                                        {
                                            (catalog_name && category_name) && (
                                                <div className="px-[6px] pt-[1px] bg-blue-blueGray" />
                                            )
                                        }

                                        {
                                            category_name && (
                                                <span className="font-medium leading-[120%]">{category_name}</span>
                                            )
                                        }
                                    </div>
                                )
                            }
                        </div>
                    </div>
                )}

                {/* Мобильные фильтры, сортировка, вид отображения */}
                <div className="1144:hidden flex w-full h-fit items-center justify-between gap-4 mt-2">
                    <div className='flex gap-4'>
                        <MobileFilterButton category_id={catalog_id} onMutate={onMutate} />
                        <MobileSorting hideNameSort={catalog_id === 0} />
                    </div>
                    {
                        !discount_id && (
                            <div className='1144:hidden block'>
                                <div className='flex'>
                                    <div onClick={() => setView('grid')} className='cursor-pointer'>
                                        <CatalogListIcon selected={view === 'grid'}/>
                                    </div>
                                    <div onClick={() => setView('list')} className='cursor-pointer'>
                                        <CatalogRowIcon selected={view === 'list'}/>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </header>

            {/* Основной контент с фильтрами и товарами */}
            <div className="w-full flex gap-6">
                {/* Боковая панель с фильтрами только для десктопа */}
                <div className="w-fit h-fit 1144:flex hidden">
                    <CatalogFilters
                        category_id={catalog_id}
                        onMutate={onMutate}
                        resetFilterHandler={resetFilterHandler}
                        setResetFilterHandler={setResetFilterHandler}
                    />
                </div>

                {/* Отображение состояния загрузки, ошибки или товаров */}
                {isPending && !hasInitialized ? (
                    <>
                        {
                            view === "list" ? (
                                <div className="w-full h-fit flex flex-col gap-4">
                                    <ListItems
                                        items={createArray(10)}
                                        render={(item) => (
                                            <div key={item} className="w-full h-[200px] rounded-2xl bg-loading-skeleton animate-pulse" />
                                        )}
                                    />
                                </div>
                            ) : (
                                <div className="w-full h-fit grid lg:grid-cols-3 md:grid-cols-2 grid-cols-2 1144:gap-4 gap-2">
                                    <ListItems
                                        items={createArray(10)}
                                        render={(item) => (
                                            <div
                                                key={item}
                                                className="w-full h-[400px] rounded-2xl bg-loading-skeleton animate-pulse"
                                            />
                                        )}
                                    />
                                </div>
                            )
                        }
                    </>
                ) : error ? (
                    // Сообщение об ошибке
                    <div className="w-full text-center py-10">
                        <h3 className="text-xl font-semibold text-destructive">Ошибка при загрузке товаров</h3>
                        <p className="text-gray-600 mt-2">Попробуйте обновить страницу</p>
                    </div>
                ) : !products?.data || !products.data.length ? (
                    // Сообщение об отсутствии данных
                    <div className="w-full h-fit p-10 flex items-center justify-center">
                        <NoDataMessage message=" " />
                    </div>
                ) : (
                    // Отображение товаров
                    <>
                        {
                            view === "list" ? (
                                // Вид списка
                                <div className="w-full flex flex-col gap-4">
                                    <ListItems
                                        items={products?.data || []}
                                        render={(product) => <CatalogProductCard key={product.id} product={product} />}
                                    />
                                </div>
                            ) : (
                                // Вид сетки
                                <div className="w-full h-fit grid lg:grid-cols-3 md:grid-cols-2 grid-cols-2 1144:gap-4 gap-2">
                                    <ListItems
                                        items={products?.data || []}
                                        render={(product) => <ProductCard key={product.id} product={product} />}
                                    />
                                </div>
                            )
                        }
                    </>
                )}
            </div>

            {/* Пагинация */}
            {lastPage && lastPage > 1 && products?.meta && (
                <Pagination
                    lastPage={lastPage}
                    activePage={currentPage}
                    onPageChange={onChangePage}
                />
            )}
        </Container>
    );
};