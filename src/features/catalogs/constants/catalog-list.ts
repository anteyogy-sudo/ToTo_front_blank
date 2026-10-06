/**
 * Данные и доменные константы страницы каталога.
 *
 * Держим отдельно от компонентов: хук фильтрации, тесты и сама страница
 * импортируют одно и то же, поэтому список категорий и варианты сортировки
 * физически не могут разойтись.
 */

export type CatalogProduct = {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  stock: number;
  category: string;
  brand: string;
  recipe: boolean;
  discount: boolean;
};

/**
 * Порядок важен: он задаёт порядок вкладок на экране.
 * `all` — единственная вкладка, которая не попадает в URL.
 */
export const CATALOG_CATEGORIES = [
  "all",
  "vitamin-c",
  "magnesia",
  "ointments",
  "drops",
  "blood-pressure",
] as const;

export type CatalogCategory = (typeof CATALOG_CATEGORIES)[number];

export const CATALOG_CATEGORY_LABELS: Record<CatalogCategory, string> = {
  all: "Все",
  "vitamin-c": "Витамин C",
  magnesia: "Магнии",
  ointments: "Мази",
  drops: "Капли",
  "blood-pressure": "ВВД",
};

export const DEFAULT_CATEGORY: CatalogCategory = "all";

export const CATALOG_SORT_OPTIONS = [
  { value: "default", label: "По популярности" },
  { value: "price-asc", label: "Сначала дешёвые" },
  { value: "price-desc", label: "Сначала дорогие" },
  { value: "name", label: "По названию" },
] as const;

export type CatalogSortValue = (typeof CATALOG_SORT_OPTIONS)[number]["value"];

/** Значение по умолчанию не попадает в URL. */
export const DEFAULT_SORT: CatalogSortValue = "default";

/** Режим отображения тоже живёт в URL, чтобы ссылка оставалась делимой. */
export const CATALOG_VIEWS = ["grid", "list"] as const;
export type CatalogView = (typeof CATALOG_VIEWS)[number];
export const DEFAULT_VIEW: CatalogView = "grid";

export function isCatalogView(value: string | null): value is CatalogView {
  return value !== null && (CATALOG_VIEWS as readonly string[]).includes(value);
}

export const CATALOG_PRODUCTS: CatalogProduct[] = [
  {
    id: 1,
    name: "Витамин C 900, таблетки №50",
    price: 545,
    oldPrice: 620,
    stock: 12,
    category: "vitamin-c",
    brand: "Эвалар",
    recipe: false,
    discount: true,
  },
  {
    id: 2,
    name: "Цитрин, шипучие таблетки №20",
    price: 320,
    stock: 5,
    category: "vitamin-c",
    brand: "Фармстандарт",
    recipe: false,
    discount: false,
  },
  {
    id: 3,
    name: "Магне B6, таблетки №30",
    price: 689,
    stock: 8,
    category: "magnesia",
    brand: "Эвалар",
    recipe: false,
    discount: false,
  },
  {
    id: 4,
    name: "Магний хелат, капсулы №60",
    price: 890,
    stock: 0,
    category: "magnesia",
    brand: "Солгар",
    recipe: false,
    discount: false,
  },
  {
    id: 5,
    name: "Троксевазин, гель 2% 40 г",
    price: 215,
    stock: 20,
    category: "ointments",
    brand: "Гинтек",
    recipe: false,
    discount: false,
  },
  {
    id: 6,
    name: "Гепариновая мазь 25 г",
    price: 189,
    stock: 3,
    category: "ointments",
    brand: "Новая волна",
    recipe: false,
    discount: false,
  },
  {
    id: 7,
    name: "Визин Аллерджи, капли 8 мл",
    price: 456,
    stock: 6,
    category: "drops",
    brand: "ГСК",
    recipe: false,
    discount: false,
  },
  {
    id: 8,
    name: "Ремантадин, таблетки 70 мг №20",
    price: 728,
    oldPrice: 810,
    stock: 2,
    category: "drops",
    brand: "Химфарм",
    recipe: false,
    discount: false,
  },
  {
    id: 9,
    name: "Энап Н, таблетки №28",
    price: 356,
    stock: 9,
    category: "blood-pressure",
    brand: "КРКА",
    recipe: true,
    discount: false,
  },
  {
    id: 10,
    name: "Лизин, таблетки №30",
    price: 412,
    stock: 0,
    category: "blood-pressure",
    brand: "Озон",
    recipe: true,
    discount: false,
  },
];

/** Уникальные производители в алфавитном порядке — для выпадающего списка. */
export const CATALOG_BRANDS: string[] = [
  ...new Set(CATALOG_PRODUCTS.map((product) => product.brand)),
].sort((a, b) => a.localeCompare(b, "ru"));

/**
 * Компаратор для выбранного режима сортировки.
 * Для `default` возвращает 0 — исходный порядок (приоритет у антипригарных) сохраняется.
 */
export function compareProducts(
  a: CatalogProduct,
  b: CatalogProduct,
  sort: CatalogSortValue,
): number {
  switch (sort) {
    case "price-asc":
      return a.price - b.price;
    case "price-desc":
      return b.price - a.price;
    case "name":
      return a.name.localeCompare(b.name, "ru");
    default:
      return 0;
  }
}

/** Сортирует копию массива; для `default` возвращает исходный массив без изменений. */
export function sortProducts(
  products: CatalogProduct[],
  sort: CatalogSortValue,
): CatalogProduct[] {
  if (sort === DEFAULT_SORT) return products;
  return [...products].sort((a, b) => compareProducts(a, b, sort));
}

export function isCatalogCategory(value: string | null): value is CatalogCategory {
  return value !== null && (CATALOG_CATEGORIES as readonly string[]).includes(value);
}

export function isCatalogSortValue(value: string | null): value is CatalogSortValue {
  return (
    value !== null &&
    CATALOG_SORT_OPTIONS.some((option) => option.value === value)
  );
}
