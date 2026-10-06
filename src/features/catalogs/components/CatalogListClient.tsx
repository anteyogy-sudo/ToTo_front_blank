"use client";

/**
 * Каталог: состояние фильтров, сортировки и режима отображения живёт в URL.
 *
 * Компоненты ниже презентационные — принимают данные и колбэки через props.
 * Связка с URL сделана отдельным контейнером `CatalogListClient`, поэтому
 * любой кусок интерфейса можно тестировать без роутера.
 */

import * as React from "react";
import { LayoutGrid, List, Search, SlidersHorizontal, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

import {
  CATALOG_BRANDS,
  CATALOG_CATEGORIES,
  CATALOG_CATEGORY_LABELS,
  CATALOG_SORT_OPTIONS,
  DEFAULT_CATEGORY,
  DEFAULT_SORT,
  DEFAULT_VIEW,
  type CatalogCategory,
  type CatalogProduct,
  type CatalogSortValue,
  type CatalogView,
} from "../constants/catalog-list";
import {
  DEFAULT_FILTERS,
  countActiveFilters,
  type CatalogFilters,
} from "../hooks/useCatalogFilters";

/** Любое число параметров — «дописываем/удаляем» относительно текущего URL. */
export type ParamPatch = Record<string, string | null>;

/* ────────────────────────── Вкладки категорий ────────────────────────── */

export function CatalogFilterTabs({
  active,
  onSelect,
}: {
  active: CatalogCategory;
  onSelect: (category: CatalogCategory) => void;
}) {
  return (
    <div
      role="tablist"
      aria-label="Категории"
      className="flex gap-2 overflow-x-auto pb-1"
    >
      {CATALOG_CATEGORIES.map((category) => {
        const isActive = category === active;
        return (
          <Button
            key={category}
            type="button"
            role="tab"
            aria-selected={isActive}
            data-state={isActive ? "active" : "inactive"}
            variant={isActive ? "default" : "outline"}
            className="shrink-0 rounded-2xl"
            onClick={() => onSelect(category)}
          >
            {CATALOG_CATEGORY_LABELS[category]}
          </Button>
        );
      })}
    </div>
  );
}

/* ───────────────────────────── Сортировка ───────────────────────────── */

export function CatalogSortSelect({
  value,
  onChange,
}: {
  value: CatalogSortValue;
  onChange: (value: CatalogSortValue) => void;
}) {
  return (
    <Select value={value} onValueChange={(next) => onChange(next as CatalogSortValue)}>
      <SelectTrigger
        className="w-[200px] rounded-2xl"
        aria-label="Сортировка"
      >
        <SelectValue placeholder="Сортировка" />
      </SelectTrigger>
      {/* Список собирается только из CATALOG_SORT_OPTIONS: пункт «Все»
          физически не может сюда попасть. */}
      <SelectContent>
        {CATALOG_SORT_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

/* ──────────────────────── Режим отображения ─────────────────────────── */

export function CatalogViewToggle({
  view,
  onChange,
}: {
  view: CatalogView;
  onChange: (view: CatalogView) => void;
}) {
  const options: Array<{ value: CatalogView; label: string; icon: React.ReactNode }> = [
    { value: "grid", label: "Плитка", icon: <LayoutGrid className="h-4 w-4" /> },
    { value: "list", label: "Список", icon: <List className="h-4 w-4" /> },
  ];

  return (
    <div role="group" aria-label="Режим отображения" className="flex gap-1">
      {options.map((option) => {
        const isActive = option.value === view;
        return (
          <Button
            key={option.value}
            type="button"
            variant={isActive ? "default" : "outline"}
            size="icon"
            aria-pressed={isActive}
            aria-label={option.label}
            className="rounded-2xl"
            onClick={() => onChange(option.value)}
          >
            {option.icon}
          </Button>
        );
      })}
    </div>
  );
}

/* ─────────────────────────── Диалог фильтров ─────────────────────────── */

type DraftFilters = {
  search: string;
  minPrice: string;
  maxPrice: string;
  brand: string;
  recipe: CatalogFilters["recipe"];
  discountOnly: boolean;
  inStockOnly: boolean;
};

function draftFromFilters(filters: CatalogFilters): DraftFilters {
  return {
    search: filters.search,
    minPrice: filters.minPrice === null ? "" : String(filters.minPrice),
    maxPrice: filters.maxPrice === null ? "" : String(filters.maxPrice),
    brand: filters.brand ?? "all",
    recipe: filters.recipe,
    discountOnly: filters.discountOnly,
    inStockOnly: filters.inStockOnly,
  };
}

function draftToPatch(draft: DraftFilters): ParamPatch {
  return {
    q: draft.search.trim() || null,
    minPrice: draft.minPrice.trim() || null,
    maxPrice: draft.maxPrice.trim() || null,
    brand: draft.brand === "all" ? null : draft.brand,
    recipe: draft.recipe === "all" ? null : draft.recipe,
    discount: draft.discountOnly ? "1" : null,
    inStock: draft.inStockOnly ? "1" : null,
  };
}

export function CatalogFilterDialog({
  filters,
  onApply,
  onReset,
}: {
  filters: CatalogFilters;
  onApply: (patch: ParamPatch) => void;
  onReset: () => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [draft, setDraft] = React.useState<DraftFilters>(() => draftFromFilters(filters));

  // При каждом открытии подставляем актуальное состояние из URL.
  React.useEffect(() => {
    if (open) setDraft(draftFromFilters(filters));
  }, [open, filters]);

  const activeCount = countActiveFilters({ ...filters, category: DEFAULT_CATEGORY });

  const patchDraft = (patch: Partial<DraftFilters>) =>
    setDraft((prev) => ({ ...prev, ...patch }));

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="rounded-2xl">
          <SlidersHorizontal className="h-4 w-4" />
          Фильтры
          {activeCount > 0 && (
            <span className="ml-1 rounded-full bg-primary-blue px-2 text-xs text-white-500">
              {activeCount}
            </span>
          )}
        </Button>
      </DialogTrigger>

      <DialogContent className="rounded-3xl">
        <DialogHeader>
          <DialogTitle>Фильтры</DialogTitle>
          <DialogDescription>
            Сузите ассортимент по названию, цене, бренду и наличию.
          </DialogDescription>
        </DialogHeader>

        <form
          className="flex flex-col gap-5"
          onSubmit={(event) => {
            event.preventDefault();
            onApply(draftToPatch(draft));
            setOpen(false);
          }}
        >
          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium">Поиск по названию</span>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary-gray" />
              <Input
                name="q"
                value={draft.search}
                placeholder="Например, магний"
                className="rounded-2xl pl-9"
                onChange={(event) => patchDraft({ search: event.target.value })}
              />
            </div>
          </label>

          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium">Цена, ₽</span>
            <div className="flex items-center gap-2">
              <Input
                name="minPrice"
                inputMode="numeric"
                value={draft.minPrice}
                placeholder="от"
                aria-label="Цена от"
                className="rounded-2xl"
                onChange={(event) =>
                  patchDraft({ minPrice: event.target.value.replace(/[^\d]/g, "") })
                }
              />
              <Input
                name="maxPrice"
                inputMode="numeric"
                value={draft.maxPrice}
                placeholder="до"
                aria-label="Цена до"
                className="rounded-2xl"
                onChange={(event) =>
                  patchDraft({ maxPrice: event.target.value.replace(/[^\d]/g, "") })
                }
              />
            </div>
          </div>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium">Бренд</span>
            <Select
              value={draft.brand}
              onValueChange={(next) => patchDraft({ brand: next })}
            >
              <SelectTrigger className="rounded-2xl" aria-label="Бренд">
                <SelectValue placeholder="Любой бренд" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все бренды</SelectItem>
                {CATALOG_BRANDS.map((brand) => (
                  <SelectItem key={brand} value={brand}>
                    {brand}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </label>

          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium">Рецептурные препараты</span>
            <Select
              value={draft.recipe}
              onValueChange={(next) =>
                patchDraft({ recipe: next as DraftFilters["recipe"] })
              }
            >
              <SelectTrigger className="rounded-2xl" aria-label="Рецептурные препараты">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Не важно</SelectItem>
                <SelectItem value="only">Только рецептурные</SelectItem>
                <SelectItem value="exclude">Без рецептурных</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between gap-4">
            <span className="text-sm font-medium">Только со скидкой</span>
            <Switch
              name="discount"
              checked={draft.discountOnly}
              aria-label="Только со скидкой"
              onCheckedChange={(checked) => patchDraft({ discountOnly: checked })}
            />
          </div>

          <div className="flex items-center justify-between gap-4">
            <span className="text-sm font-medium">Только в наличии</span>
            <Switch
              name="inStock"
              checked={draft.inStockOnly}
              aria-label="Только в наличии"
              onCheckedChange={(checked) => patchDraft({ inStockOnly: checked })}
            />
          </div>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setDraft(draftFromFilters(DEFAULT_FILTERS));
                onReset();
                setOpen(false);
              }}
            >
              Сбросить
            </Button>
            <Button type="submit">Применить</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

/* ─────────────────────────── Карточка товара ─────────────────────────── */

export function CatalogProductCard({
  product,
  view,
}: {
  product: CatalogProduct;
  view: CatalogView;
}) {
  const outOfStock = product.stock === 0;

  return (
    <article
      className={cn(
        "flex gap-3 rounded-2xl border border-blue-light-gray bg-surface p-4",
        view === "grid" ? "flex-col" : "flex-row items-start justify-between",
      )}
    >
      <div className="flex min-w-0 flex-col gap-1">
        <h3 className="text-ink line-clamp-2 text-sm font-medium">{product.name}</h3>
        <p className="text-xs text-primary-gray">{product.brand}</p>
      </div>

      <div className="flex shrink-0 flex-col gap-1">
        <span className="font-semibold">
          {product.price.toLocaleString("ru-RU")} ₽
        </span>
        {product.oldPrice !== undefined && (
          <span className="text-xs text-primary-gray line-through">
            {product.oldPrice.toLocaleString("ru-RU")} ₽
          </span>
        )}
        <span className={cn("text-xs", outOfStock ? "text-destructive" : "text-green-500")}>
          {outOfStock ? "Нет в наличии" : `В наличии: ${product.stock}`}
        </span>
        {product.recipe && (
          <span className="text-xs text-primary-gray">Рецептурный</span>
        )}
      </div>
    </article>
  );
}

/* ─────────────────────── Каркас загрузки и пустота ───────────────────── */

export function CatalogSkeleton({ view }: { view: CatalogView }) {
  return (
    <div
      role="status"
      aria-label="Загрузка товаров"
      className={cn(
        "gap-3",
        view === "grid" ? "grid grid-cols-2 md:grid-cols-3" : "flex flex-col",
      )}
    >
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="h-28 animate-pulse rounded-2xl bg-surface"
        />
      ))}
    </div>
  );
}

export function CatalogEmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-blue-light-gray bg-surface p-10 text-center">
      <X className="h-6 w-6 text-primary-gray" />
      <p className="text-ink font-medium">По этим фильтрам ничего не найдено</p>
      <p className="text-sm text-primary-gray">
        Попробуйте изменить запрос или сбросить фильтры.
      </p>
      <Button type="button" variant="outline" className="rounded-2xl" onClick={onReset}>
        Сбросить фильтры
      </Button>
    </div>
  );
}

/* ───────────────────────────── Сетка товаров ─────────────────────────── */

export function CatalogResults({
  products,
  view,
  isLoading,
  onReset,
}: {
  products: CatalogProduct[];
  view: CatalogView;
  isLoading: boolean;
  onReset: () => void;
}) {
  if (isLoading) return <CatalogSkeleton view={view} />;
  if (products.length === 0) return <CatalogEmptyState onReset={onReset} />;

  return (
    <div
      className={cn(
        "gap-3",
        view === "grid" ? "grid grid-cols-2 md:grid-cols-3" : "flex flex-col",
      )}
    >
      {products.map((product) => (
        <CatalogProductCard key={product.id} product={product} view={view} />
      ))}
    </div>
  );
}
