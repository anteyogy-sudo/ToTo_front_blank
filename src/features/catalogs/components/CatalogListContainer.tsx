"use client";

/**
 * Контейнер каталога: читает фильтры из URL и пишет обратно через router.replace.
 *
 * Все дочерние компоненты (вкладки, селекторы, диалог, карточки) —
 * презентационные и тестируются отдельно (см. `CatalogListClient.test.tsx`).
 */

import { useCallback, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  CatalogFilterDialog,
  CatalogFilterTabs,
  CatalogResults,
  CatalogSortSelect,
  CatalogViewToggle,
  type ParamPatch,
} from "./CatalogListClient";
import { buildCatalogUrl, useCatalogFilters } from "../hooks/useCatalogFilters";
import {
  CATALOG_PRODUCTS,
  DEFAULT_CATEGORY,
  type CatalogCategory,
  type CatalogProduct,
  type CatalogSortValue,
  type CatalogView,
} from "../constants/catalog-list";

/** Ключи, относящиеся к фильтрам. Навигационные (catalog, page) не трогаем. */
const FILTER_KEYS = [
  "category", "brand", "q", "minPrice", "maxPrice",
  "recipe", "discount", "inStock", "view", "sort",
] as const;

export function CatalogListContainer({
  products = CATALOG_PRODUCTS,
}: {
  products?: CatalogProduct[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { filters, visible, activeCount } = useCatalogFilters(products);

  const [pending, startTransition] = useTransition();

  /**
   * Записывает набор параметров в URL.
   * `null` — удаляет ключ. Пустая строка — тоже удаляет.
   * Вызывает router.replace, чтобы не перезагружать страницу.
   */
  const setParam = useCallback(
    (patch: ParamPatch) => {
      const nextUrl = buildCatalogUrl(pathname, searchParams.toString(), patch);
      startTransition(() => router.replace(nextUrl, { scroll: false }));
    },
    [pathname, router, searchParams],
  );

  const handleCategoryChange = useCallback(
    (category: CatalogCategory) => {
      setParam({ category: category === DEFAULT_CATEGORY ? null : category });
    },
    [setParam],
  );

  const handleSortChange = useCallback(
    (sort: CatalogSortValue) => {
      setParam({ sort: sort === "default" ? null : sort });
    },
    [setParam],
  );

  const handleViewChange = useCallback(
    (view: CatalogView) => {
      setParam({ view });
    },
    [setParam],
  );

  const handleFilterApply = useCallback(
    (patch: ParamPatch) => {
      setParam(patch);
    },
    [setParam],
  );

  const handleReset = useCallback(() => {
    const patch = Object.fromEntries(FILTER_KEYS.map((key) => [key, null]));
    setParam(patch);
  }, [setParam]);

  return (
    <div className="flex flex-col gap-4">
      {/* Вкладки категорий */}
      <CatalogFilterTabs active={filters.category} onSelect={handleCategoryChange} />

      {/* Панель инструментов */}
      <div className="flex flex-wrap items-center gap-3">
        <CatalogFilterDialog
          filters={filters}
          onApply={handleFilterApply}
          onReset={handleReset}
        />
        <CatalogSortSelect value={filters.sort} onChange={handleSortChange} />
        <CatalogViewToggle view={filters.view} onChange={handleViewChange} />

        {/* Счётчик активных фильтров */}
        {activeCount > 0 && (
          <span className="ml-auto text-xs text-primary-gray">
            Активных фильтров: {activeCount}
          </span>
        )}
      </div>

      {/* Результаты */}
      <CatalogResults
        products={visible}
        view={filters.view}
        isLoading={pending}
        onReset={handleReset}
      />
    </div>
  );
}
