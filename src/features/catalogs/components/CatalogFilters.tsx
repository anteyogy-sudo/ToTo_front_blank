"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DualRangeSlider } from "@/components/ui/dual-range-slider";
import { NumericInput } from "@/components/ui/numeric-input";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction, useState, useEffect, useMemo } from "react";
import { MAX_PRICE } from "../constants/filter.constants";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { useProductFiltersQuery } from "../hooks/queries/useProductFiltersQuery";
import { useCityStore } from "@/features/navbar/stores/useCityStore";
import Search from "@/assets/icons/search/search.svg";

interface Props {
    category_id: number;
    onMutate(): Promise<void>;
    onClose?: () => void;
    setResetFilterHandler?: Dispatch<SetStateAction<number>>;
    resetFilterHandler?: number;
}

// Новые фильтры
// list filterId[] = selectedOptionId (список)
// bool filterId = true / false (для фильтров где нужно да/нет)
// range filterId_min / filterId_max (цена)
type BackendFilterType = "range" | "list" | "bool";

type BackendFilterBase = {
    id: string;
    label: string;
    type: BackendFilterType;
};

type RangeFilter = BackendFilterBase & {
    type: "range";
    data: {
        min: number;
        max: number;
    };
};

type ListFilter = BackendFilterBase & {
    type: "list";
    data: Array<{
        id: string | number;
        label: string;
    }>;
};

type BoolFilter = BackendFilterBase & {
    type: "bool";
};

type BackendFilter = RangeFilter | ListFilter | BoolFilter;

const isRangeFilter = (filter: BackendFilter): filter is RangeFilter => filter.type === "range";
const isListFilter = (filter: BackendFilter): filter is ListFilter => filter.type === "list";
const isBoolFilter = (filter: BackendFilter): filter is BoolFilter => filter.type === "bool";

// Берем числа, если значения нет, используем fallback
const parseNumberParam = (value: string | null | undefined, fallback: number) => {
    if (value === null || value === undefined || value === "") return fallback;

    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
};

// Берем true / false из bool фильтра
const parseBooleanParam = (value: string | null) => value === "true" || value === "1";

// Используем filterId в list фильтре и читаем старый вариант filterId
const getListParamValues = (searchParams: URLSearchParams, filterId: string) => {
    const bracketKey = `${filterId}[]`;
    const values = searchParams.getAll(bracketKey);

    if (values.length > 0) return values;

    const legacy = searchParams.get(filterId);
    return legacy ? legacy.split(",").filter(Boolean) : [];
};

export const CatalogFilters = ({ category_id, onMutate, onClose, setResetFilterHandler, resetFilterHandler }: Props) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const searchParamsString = searchParams.toString();
    const { confirmedCity } = useCityStore();

    // В поиск передаем фильтры
    const queryParam = searchParams.get("query") ?? "";
    // Получаем из URL группу в каталоге
    const groupIdRaw = searchParams.get("group_id");
    const groupId = groupIdRaw ? Number(groupIdRaw) : undefined;
    // Город обязателен
    const cityId = confirmedCity?.id ?? 0;

    // Запрос на API products/filters и показываем нужные фильтры
    const { data: filters, isLoading: filtersLoading, error: filtersError } = useProductFiltersQuery({
        cityId,
        categoryId: category_id,
        groupId,
        query: queryParam || undefined,
    });

    const normalizedFilters = useMemo(
        () => (filters ?? []) as BackendFilter[],
        [filters]
    );

    // Цена
    const rangeFilter = useMemo(
        () => normalizedFilters.find((filter) => filter.type === "range") as RangeFilter | undefined,
        [normalizedFilters]
    );

    const initialRange = useMemo(() => {
        const min = rangeFilter?.data.min ?? 0;
        const max = rangeFilter?.data.max ?? MAX_PRICE;
        const rangeId = rangeFilter?.id ?? "price";

        const params = new URLSearchParams(searchParamsString);
        const minFromUrl = parseNumberParam(params.get(`${rangeId}_min`), min);
        const maxFromUrl = parseNumberParam(params.get(`${rangeId}_max`), max);

        // Границы цены
        return [
            Math.max(min, Math.min(minFromUrl, max)),
            Math.min(max, Math.max(maxFromUrl, min)),
        ] as [number, number];
    }, [rangeFilter, searchParamsString]);

    // rangeValues выбранный диапазон
    // listSelections выбранные элементы  list фильтра
    // boolSelections выбранное значение bool фильтра
    const [rangeValues, setRangeValues] = useState<[number, number]>(initialRange);
    const [listSelections, setListSelections] = useState<Record<string, string[]>>({});
    const [boolSelections, setBoolSelections] = useState<Record<string, boolean>>({});

    // Поиск внутри list фильтров (поисковая строка)
    const [listSearches, setListSearches] = useState<Record<string, string>>({});

    useEffect(() => {
        setRangeValues(initialRange);
    }, [initialRange]);

    // Фильтры с бэкенда
    useEffect(() => {
        const params = new URLSearchParams(searchParamsString);
        const nextListSelections: Record<string, string[]> = {};
        const nextBoolSelections: Record<string, boolean> = {};

        normalizedFilters.forEach((filter) => {
            if (isListFilter(filter)) {
                nextListSelections[filter.id] = getListParamValues(params, filter.id);
            }

            if (isBoolFilter(filter)) {
                nextBoolSelections[filter.id] = parseBooleanParam(params.get(filter.id));
            }
        });

        setListSelections(nextListSelections);
        setBoolSelections(nextBoolSelections);
    }, [normalizedFilters, searchParamsString]);

    // list фильтр
    const handleListChange = (filterId: string, optionId: string) => {
        setListSelections((prev) => {
            const current = prev[filterId] ?? [];

            return {
                ...prev,
                [filterId]: current.includes(optionId)
                    ? current.filter((value) => value !== optionId)
                    : [...current, optionId],
            };
        });
    };

    // bool фильтр
    const handleBoolChange = (filterId: string, checked: boolean) => {
        setBoolSelections((prev) => ({
            ...prev,
            [filterId]: checked,
        }));
    };

    // Счетчик выбранных фильтров
    const getAppliedFiltersCount = () => {
        let count = 0;

        // Диапазон цены с выбранными значениями
        if (rangeFilter) {
            const rangeMin = rangeFilter.data.min;
            const rangeMax = rangeFilter.data.max;
            if (rangeValues[0] > rangeMin || rangeValues[1] < rangeMax) count += 1;
        }

        // Если один list фильтр активный
        Object.values(listSelections).forEach((selected) => {
            if (selected.length > 0) count += 1;
        });

        // Если true bool фильтр, то он активный
        Object.values(boolSelections).forEach((value) => {
            if (value) count += 1;
        });

        return count;
    };

    // Базовые фильтры
    const buildBaseParams = () => {
        const currentParams = new URLSearchParams(window.location.search);
        const nextParams = new URLSearchParams();

        // Не трогаем поиск, категорию и группу
        ["query", "group_id", "category_id", "category", "catalog"].forEach((key) => {
            const value = currentParams.get(key);
            if (value !== null) nextParams.set(key, value);
        });

        return nextParams;
    };

    // Оставляем базовые параметры страницы после сброса
    const onClear = async () => {
        if (typeof window === "undefined") return;

        const nextParams = buildBaseParams();
        const pathname = window.location.pathname;
        const nextUrl = nextParams.toString() ? `${pathname}?${nextParams.toString()}` : pathname;

        setRangeValues(initialRange);
        setListSelections({});
        setBoolSelections({});

        router.replace(nextUrl, { scroll: false });
        await onMutate();
        onClose?.();
    };

    // Применяем фильтры и записываем их в URL
    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (typeof window === "undefined") return;

        const nextParams = buildBaseParams();
        const pathname = window.location.pathname;

        nextParams.set("page", "1");

        const submittedMin = Math.min(rangeValues[0], rangeValues[1]);
        const submittedMax = Math.max(rangeValues[0], rangeValues[1]);

        normalizedFilters.forEach((filter) => {
            if (isRangeFilter(filter)) {
                nextParams.set(`${filter.id}_min`, String(submittedMin));
                nextParams.set(`${filter.id}_max`, String(submittedMax));
            }
        });

        // list фильтры
        Object.entries(listSelections).forEach(([filterId, selectedValues]) => {
            nextParams.delete(`${filterId}[]`);
            nextParams.delete(filterId);

            selectedValues.forEach((selectedValue) => {
                nextParams.append(`${filterId}[]`, selectedValue);
            });
        });

        // bool фильтры
        Object.entries(boolSelections).forEach(([filterId, checked]) => {
            nextParams.set(filterId, checked ? "true" : "false");
        });

        const nextUrl = nextParams.toString() ? `${pathname}?${nextParams.toString()}` : pathname;

        router.replace(nextUrl, { scroll: false });
        await onMutate();
        onClose?.();
    };

    useIsomorphicLayoutEffect(() => {
        if (resetFilterHandler !== undefined && resetFilterHandler > 0) {
            void onClear();
            setResetFilterHandler?.(0);
        }
    }, [resetFilterHandler]);

    const appliedFiltersCount = getAppliedFiltersCount();

    if (filtersLoading) {
        return (
            <div className="xl:min-w-[384px] xl:max-w-[384px] 1144:min-w-[360px] 1144:max-w-[360px] min-w-[327px] max-w-[327px] w-fit h-fit 1144:p-6 p-4 flex flex-col gap-6 bg-white-500 rounded-2xl">
                Загрузка фильтров
            </div>
        );
    }

    if (filtersError) {
        return (
            <div className="xl:min-w-[384px] xl:max-w-[384px] 1144:min-w-[360px] 1144:max-w-[360px] min-w-[327px] max-w-[327px] w-fit h-fit 1144:p-6 p-4 flex flex-col gap-6 bg-white-500 rounded-2xl">
                Не удалось загрузить фильтры
            </div>
        );
    }

    return (
        <form
            onSubmit={onSubmit}
            noValidate
            className="xl:min-w-[384px] xl:max-w-[384px] 1144:min-w-[360px] 1144:max-w-[360px] min-w-[327px] max-w-[327px] w-fit h-fit 1144:p-6 p-4 flex flex-col gap-6 bg-white-500 rounded-2xl"
        >
            <div className="w-full flex flex-col gap-8">
                <div className="1144:flex hidden w-full items-center justify-between">
                    <div className="w-fit flex items-center gap-4">
                        <p className="text-[24px] font-bold leading-[100%]">Фильтры</p>
                        <span className="font-semibold text-primary-gray leading-[24px] text-[24px]">
                            {appliedFiltersCount}
                        </span>
                    </div>
                    <button
                        type="button"
                        className="1144:flex hidden w-fit underline text-primary-black-gray text-[18px] leading-[120%]"
                        onClick={onClear}
                    >
                        Сбросить
                    </button>
                </div>

                <div className="w-full flex flex-col gap-6">
                    {/* Блок цены отображается всегда */}
                    {rangeFilter && (
                        <div className="w-full flex flex-col gap-4">
                            <p className="leading-[120%] text-[20px] font-medium">{rangeFilter.label}</p>

                            <div className="w-full flex items-center gap-4">
                                <NumericInput
                                    className="w-full h-[44px] rounded-2xl bg-primary-light-white border-none shadow-sm text-[18px] leading-[120%]"
                                    placeholder={`${rangeFilter.data.min} ₽`}
                                    value={rangeValues[0]}
                                    onChange={(e) => {
                                        const inputValue = e.target.value === "" ? NaN : Number(e.target.value);
                                        if (Number.isFinite(inputValue)) {
                                            setRangeValues([inputValue, rangeValues[1]]);
                                        }
                                    }}
                                />

                                <div className="px-[6px] pt-[1px] bg-blue-blueGray" />

                                <NumericInput
                                    className="w-full h-[44px] rounded-2xl bg-primary-light-white border-none shadow-sm text-[18px] leading-[120%]"
                                    placeholder={`${rangeFilter.data.max} ₽`}
                                    value={rangeValues[1]}
                                    onChange={(e) => {
                                        const inputValue = e.target.value === "" ? NaN : Number(e.target.value);
                                        if (Number.isFinite(inputValue)) {
                                            setRangeValues([rangeValues[0], inputValue]);
                                        }
                                    }}
                                />
                            </div>

                            <DualRangeSlider
                                min={rangeFilter.data.min}
                                max={rangeFilter.data.max}
                                step={1}
                                value={rangeValues}
                                onValueChange={(value) => setRangeValues([value[0], value[1]])}
                            />
                        </div>
                    )}

                    {/* Остальные фильтры */}
                    {normalizedFilters
                        .filter((filter) => filter.type !== "range")
                        .map((filter) => {
                            // bool чекбокс
                            if (isBoolFilter(filter)) {
                                return (
                                    <div key={filter.id} className="w-full h-fit flex items-center justify-between pr-[12px] 1144:pr-[21px]">
                                        <label
                                            htmlFor={filter.id}
                                            className="1144:text-[20px] text-[18px] font-medium leading-[120%] cursor-pointer"
                                        >
                                            {filter.label}
                                        </label>

                                        <Checkbox
                                            variant="rounded"
                                            id={filter.id}
                                            checked={boolSelections[filter.id] ?? false}
                                            onCheckedChange={(checked) =>
                                                handleBoolChange(filter.id, Boolean(checked))
                                            }
                                        />
                                    </div>
                                );
                            }

                            // list фильтры
                            if (isListFilter(filter)) {
                                const searchValue = listSearches[filter.id] ?? "";

                                const filteredOptions = filter.data.filter((option) =>
                                    option.label.toLowerCase().includes(searchValue.toLowerCase())
                                );

                                return (
                                    <div key={filter.id} className="w-full flex flex-col gap-3">
                                        <p className="1144:text-[20px] text-[18px] font-medium leading-[120%]">
                                            {filter.label}
                                        </p>

                                        <div className="relative w-full">
                                            <Image
                                                src={Search}
                                                alt="search"
                                                width={20}
                                                height={20}
                                                className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
                                            />

                                            <input
                                                type="text"
                                                placeholder="Поиск"
                                                value={searchValue}
                                                onChange={(e) =>
                                                    setListSearches((prev) => ({
                                                        ...prev,
                                                        [filter.id]: e.target.value,
                                                    }))
                                                }
                                                className="w-full h-[44px] pl-12 pr-4 rounded-xl bg-primary-light-white border border-primary-blue shadow-sm text-[16px] focus:outline-none focus:border-primary-blue"
                                            />
                                        </div>

                                        <div className="flex flex-col gap-3 max-h-[145px] 1144:max-h-[215px] overflow-y-auto pr-3 scrollbar-custom">
                                            {filteredOptions.length > 0 ? (
                                                filteredOptions.map((option) => {
                                                    const optionId = String(option.id);
                                                    const checked = (listSelections[filter.id] ?? []).includes(optionId);

                                                    return (
                                                        <div
                                                            key={optionId}
                                                            className="w-full h-fit flex items-center justify-between gap-3"
                                                        >
                                                            <label
                                                                htmlFor={`${filter.id}-${optionId}`}
                                                                className="1144:text-[18px] text-[16px] font-normal leading-[120%] cursor-pointer"
                                                            >
                                                                {option.label}
                                                            </label>

                                                            <Checkbox
                                                                variant="rounded"
                                                                id={`${filter.id}-${optionId}`}
                                                                checked={checked}
                                                                onCheckedChange={() =>
                                                                    handleListChange(filter.id, optionId)
                                                                }
                                                            />
                                                        </div>
                                                    );
                                                })
                                            ) : (
                                                <p className="py-3 text-center text-[16px] text-primary-gray">
                                                    Ничего не найдено
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                );
                            }

                            return null;
                        })}
                </div>
            </div>

            <div className="w-full flex flex-col gap-4 items-center text-center">
                <Button className="w-full text-primary-blue bg-blue-lightBlue shadow-none rounded-2xl h-[44px] text-base font-medium leading-[120%]">
                    Применить
                </Button>
                <button
                    type="button"
                    className="1144:hidden flex w-fit underline text-primary-black-gray text-[18px] leading-[120%]"
                    onClick={onClear}
                >
                    Сбросить фильтры
                </button>
            </div>
        </form>
    );
};