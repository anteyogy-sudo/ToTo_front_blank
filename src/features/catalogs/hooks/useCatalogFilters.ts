/**
 * Хук фильтрации товаров каталога.
 *
 * Читает URL-параметры, применяет чистую фильтрацию и сортировку,
 * предоставляет функцию мутации, которая собирает новый URL и передаёт
 * его через `router.replace` (без перезагрузки страницы).
 */
"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

import {
  CATALOG_BRANDS,
  CATALOG_CATEGORIES,
  CATALOG_PRODUCTS,
  CATALOG_SORT_OPTIONS,
  DEFAULT_CATEGORY,
  DEFAULT_SORT,
  DEFAULT_VIEW,
  compareProducts,
  isCatalogCategory,
  isCatalogSortValue,
  isCatalogView,
  sortProducts,
  type CatalogCategory,
  type CatalogProduct,
  type CatalogSortValue,
  type CatalogView,
} from "../constants/catalog-list";

export type CatalogFilters = {
  category: CatalogCategory;
  brand: string | null;
  search: string;
  recipe: "all" | "only" | "exclude";
  minPrice: number | null;
  maxPrice: number | null;
  discountOnly: boolean;
  inStockOnly: boolean;
  sort: CatalogSortValue;
  view: CatalogView;
};

export const DEFAULT_FILTERS: CatalogFilters = {
  category: DEFAULT_CATEGORY,
  brand: null,
  search: "",
  recipe: "all",
  minPrice: null,
  maxPrice: null,
  discountOnly: false,
  inStockOnly: false,
  sort: DEFAULT_SORT,
  view: DEFAULT_VIEW,
};

const RECIPE_VALUES = ["all", "only", "exclude"] as const;
const ALL_BRANDS = ["all", ...CATALOG_BRANDS];

function parsePrice(raw: string | null): number | null {
  if (raw === null || raw.trim() === "") return null;
  const n = Number(raw);
  return Number.isFinite(n) && n >= 0 ? n : null;
}

function parseBoolean(raw: string | null): boolean {
  return raw === "1" || raw === "true";
}

export function filtersFromParams(sp: URLSearchParams): CatalogFilters {
  return {
    category: isCatalogCategory(sp.get("category"))
      ? (sp.get("category") as CatalogCategory)
      : DEFAULT_CATEGORY,
    brand: ALL_BRANDS.includes(sp.get("brand") ?? "")
      ? (sp.get("brand") as string)
      : null,
    search: sp.get("q") ?? "",
    recipe: RECIPE_VALUES.includes((sp.get("recipe") ?? "") as "all")
      ? (sp.get("recipe") as "all" | "only" | "exclude")
      : "all",
    minPrice: parsePrice(sp.get("minPrice")),
    maxPrice: parsePrice(sp.get("maxPrice")),
    discountOnly: parseBoolean(sp.get("discount")),
    inStockOnly: parseBoolean(sp.get("inStock")),
    sort: isCatalogSortValue(sp.get("sort"))
      ? (sp.get("sort") as CatalogSortValue)
      : DEFAULT_SORT,
    view: isCatalogView(sp.get("view")) ? (sp.get("view") as CatalogView) : DEFAULT_VIEW,
  };
}

/** Чистая фильтрация: возвращает копию массива с отфильтрованными товарами. */
export function filterProducts(
  products: CatalogProduct[],
  filters: CatalogFilters,
): CatalogProduct[] {
  const query = filters.search.trim().toLowerCase();

  return products.filter((product) => {
    if (filters.category !== "all" && product.category !== filters.category) return false;
    if (filters.brand && filters.brand !== "all" && product.brand !== filters.brand) return false;
    if (query && !product.name.toLowerCase().includes(query)) return false;
    if (filters.recipe === "only" && !product.recipe) return false;
    if (filters.recipe === "exclude" && product.recipe) return false;
    if (filters.discountOnly && !product.discount) return false;
    if (filters.inStockOnly && product.stock <= 0) return false;
    if (filters.minPrice !== null && product.price < filters.minPrice) return false;
    if (filters.maxPrice !== null && product.price > filters.maxPrice) return false;
    return true;
  });
}

/** Сколько активных фильтров/сортировок выбрано (для счётчика в диалоге). */
export function countActiveFilters(filters: CatalogFilters): number {
  let n = 0;
  if (filters.category !== "all") n++;
  if (filters.brand && filters.brand !== "all") n++;
  if (filters.search.trim()) n++;
  if (filters.recipe !== "all") n++;
  if (filters.minPrice !== null) n++;
  if (filters.maxPrice !== null) n++;
  if (filters.discountOnly) n++;
  if (filters.inStockOnly) n++;
  return n;
}

/**
 * Чистая сборка следующего URL каталога. Никакого роутера — обычная строка,
 * поэтому логику «значение null удаляет параметр» можно тестировать напрямую.
 */
export function buildCatalogUrl(
  pathname: string,
  currentQuery: string,
  patch: Record<string, string | null>,
): string {
  const params = new URLSearchParams(currentQuery);

  for (const [key, value] of Object.entries(patch)) {
    if (value === null || value === "") params.delete(key);
    else params.set(key, value);
  }

  // Порядок фиксированный, чтобы одинаковые состояния давали одинаковую ссылку.
  params.sort();

  const query = params.toString();
  return query ? `${pathname}?${query}` : pathname;
}

/**
 * Хук, объединяющий чтение URL, фильтрацию и функцию мутации.
 *
 * @param products — массив товаров. По умолчанию берётся заглушечный список из `catalog-list`.
 */
export function useCatalogFilters(
  products: CatalogProduct[] = CATALOG_PRODUCTS,
) {
  const searchParams = useSearchParams();

  const filters = useMemo<CatalogFilters>(
    () => filtersFromParams(new URLSearchParams(searchParams.toString())),
    [searchParams],
  );

  const visible = useMemo(() => {
    const filtered = filterProducts(products, filters);
    return sortProducts(filtered, filters.sort);
  }, [products, filters]);

  const activeCount = useMemo(
    () => countActiveFilters(filters),
    [filters],
  );

  return { filters, visible, activeCount };
}
