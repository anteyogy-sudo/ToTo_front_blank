/**
 * Единая точка переключения бренда.
 *
 * Значение читается на билде из NEXT_PUBLIC_BRAND, поэтому класс бренда
 * попадает в HTML на сервере и не вызывает мигания при гидратации.
 * Палитра каждого бренда живёт в src/app/globals.css (.brand-antey / .brand-zoo),
 * логотипы и тексты — в BRAND_CONFIG ниже.
 */
export type BrandId = "antey" | "zoo";

const RAW_BRAND = process.env.NEXT_PUBLIC_BRAND ?? "antey";

export const BRAND: BrandId = RAW_BRAND === "zoo" ? "zoo" : "antey";

/** Класс на <html>, который включает палитру и ассеты выбранного бренда. */
export const BRAND_CLASS = `brand-${BRAND}`;

export const isAntey = BRAND === "antey";
export const isZoo = BRAND === "zoo";

/**
 * Не-цветовая часть бренда: названия, тексты и внешние ссылки.
 * Цвета здесь не дублируются — они целиком живут в CSS-переменных
 * (.brand-antey / .brand-zoo), и менять их нужно только там.
 *
 * Значения "zoo" — заглушки: заменить на реальные данные зоомагазина,
 * иначе клон будет ссылаться на приложения и соцсети «Антея».
 */
export interface BrandConfig {
    /** Полное название, для <title>, meta и юридических текстов. */
    fullName: string;
    /** Краткое название в интерфейсе («Скачайте приложение {shortName}»). */
    shortName: string;
    email: string;
    /** Внутренняя страница «О нас». */
    aboutPath: string;
    stores: {
        googlePlay: string;
        ruStore: string;
        appStore: string;
        appGallery?: string;
    };
    social: {
        vk: string;
        dzen: string;
    };
}

const BRANDS: Record<BrandId, BrandConfig> = {
    antey: {
        fullName: "Аптека Антей",
        shortName: "Антей",
        email: "pk.antey@linkdoc.ru",
        aboutPath: "/pharmacy-antey",
        stores: {
            googlePlay: "https://play.google.com/store/apps/details?id=aptekaantey.ru.antey&hl=ru",
            ruStore: "https://www.rustore.ru/catalog/app/ru.antey",
            appStore: "https://apps.apple.com/us/app/аптека-антей/id6760655657",
            appGallery: "https://appgallery.huawei.ru/app/C113974529",
        },
        social: {
            vk: "https://vk.com/aptekaantey",
            dzen: "https://dzen.ru/aptekaantey",
        },
    },
    zoo: {
        fullName: "Зоомагазин",
        shortName: "Зоомагазин",
        email: "TODO@example.ru",
        aboutPath: "/about",
        stores: {
            googlePlay: "TODO",
            ruStore: "TODO",
            appStore: "TODO",
            appGallery: "TODO",
        },
        social: {
            vk: "TODO",
            dzen: "TODO",
        },
    },
};

/** Конфигурация текущего бренда. */
export const BRAND_CONFIG: BrandConfig = BRANDS[BRAND];

