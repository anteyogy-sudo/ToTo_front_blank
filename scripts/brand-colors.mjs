/**
 * Миграция цвета на бренд-токены и аудит остатков.
 *
 *   node scripts/brand-colors.mjs --dry-run   показать, что изменится
 *   node scripts/brand-colors.mjs --apply     применить изменения
 *   node scripts/brand-colors.mjs --audit     найти остатки захардкоженного бренд-цвета
 *
 * Заменяются только точные цвета в явных контекстах: Tailwind arbitrary
 * значения вида [#005CA7], quoted-значения цвета и цвета внутри CSS-строк.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SRC = path.join(process.cwd(), "src");

/** hex -> имя CSS-переменной бренда */
export const BRAND_VARS = {
  "#005ca7": "--brand",
  "#004a8a": "--brand-dark",
  "#0081d3": "--brand-strong",
  "#6cb0e0": "--brand-medium",
  "#9bacd7": "--brand-soft",
  "#5eb7ff": "--brand-bright",
  "#0094c4": "--brand-sky",
  "#056fc4": "--brand-deep",
  "#eef7ff": "--brand-tint",
  "#f3faff": "--brand-tint-2",
  "#e7f4ff": "--brand-tint-3",
  "#cddaec": "--brand-line",
  "#d3e8f8": "--brand-line-2",
  "#fcfdff": "--brand-frost",
  "#12379c": "--brand-night",
  "#04087c": "--brand-ink",
  "#17386e": "--brand-navy",
  "#2255b6": "--brand-royal",
  "#4c86f2": "--brand-azure",
  "#a6d7ec": "--brand-glow",
  "#cef0ff": "--brand-mist",
  "#e6f0ff": "--brand-haze",
  "#bcd8ff": "--brand-haze-2",
  "#391a94": "--brand-violet",
  "#9b4bdb": "--brand-plum",
  "#f9eaff": "--brand-orchid",
  "#005ea8": "--brand-mid",
  "#0043a7": "--brand-stop-a",
  "#024e8b": "--brand-stop-b",
  "#024eab": "--brand-stop-c",
  "#0533a6": "--brand-stop-d",
  "#094e85": "--brand-stop-e",
  // Акценты и статусы. Без них tint-svg.mjs не перекрашивает красные
  // надписи логотипа (#e53527), зелёные иконки (#00945e) и жёлтые
  // индикаторы (#fab600), а --audit по ним ложно рапортует «чисто».
  "#e53527": "--brand-accent",
  "#ca2d74": "--brand-accent-2",
  "#0db85c": "--brand-success",
  "#fab600": "--brand-warning",
  "#e4f6ef": "--brand-success-soft",
  "#00945e": "--brand-leaf",
  // Промо-градиент карточки «Рекомендация месяца» и подсветка строки поиска.
  // Без них --audit считает файл чистым, а tint-svg оставит их антеевскими.
  "#008cff": "--brand-promo-a",
  "#b9ffca": "--brand-promo-b",
  "#bce1ff": "--brand-promo-c",
  "#ecf3f5": "--brand-hover",
};

/** hex -> готовый класс Tailwind вместо arbitrary-значения */
const CLASS_BY_HEX = {
  "#005ca7": "primary-blue",
  "#004a8a": "primary-dark",
  "#0081d3": "blue-strong",
  "#6cb0e0": "blue-medium",
  "#9bacd7": "primary-softBlue",
  "#eef7ff": "blue-lightBlue",
  "#f3faff": "blue-light",
  "#e7f4ff": "blue-lightGrayBlue2",
  "#cddaec": "blue-light-gray",
  "#d3e8f8": "blue-lightGrayBlue",
  "#fcfdff": "blue-soft",
  "#e53527": "primary-red",
  "#ca2d74": "primary-pink",
  "#0db85c": "green-500",
  "#fab600": "primary-yellow",
  "#e4f6ef": "green-mint",
  "#00945e": "green-leaf",
};

const IGNORE_DIRS = new Set(["node_modules", ".next", ".git"]);

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (IGNORE_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (/\.tsx?$/.test(entry.name)) out.push(full);
  }
  return out;
}

/**
 * Список классов выводим из CLASS_BY_HEX, а не пишем словами: иначе новое
 * соответствие в таблице молча оставляет невалидный класс вида `bg-[primary-red]`.
 * Сортировка по убыванию длины нужна, чтобы `blue-lightGrayBlue2` не
 * обрезался альтернативой `blue-light`.
 */
const CLASS_NAMES = [...new Set(Object.values(CLASS_BY_HEX))]
  .sort((a, b) => b.length - a.length)
  .join("|");

/** hover:bg-[#005CA7] -> hover:bg-primary-blue */
function replaceArbitraryClasses(source) {
  const withNames = source.replace(/\[#[0-9a-fA-F]{6}\]/g, (whole) => {
    const cls = CLASS_BY_HEX[whole.slice(1, -1).toLowerCase()];
    return cls ? `[${cls}]` : whole;
  });
  const cleaned = withNames.replace(new RegExp(`\[(${CLASS_NAMES})\]`, "g"), "$1");
  // [hsl(var(--brand))] тоже разворачиваем в именованный класс: только он
  // поддерживает модификаторы прозрачности (/15, bg-opacity-*)
  return cleaned.replace(/\[hsl\(var\((--[a-z0-9-]+)\)\)\]/g, (whole, variable) => {
    const byVar = ARBITRARY_BY_VAR[variable];
    return byVar ? byVar : whole;
  });
}

/** var-имя -> класс Tailwind, обратно к CLASS_BY_HEX */
const ARBITRARY_BY_VAR = Object.fromEntries(
  Object.entries(CLASS_BY_HEX).map(([hex, cls]) => [BRAND_VARS[hex], cls])
);

/** fill="#005CA7" / const c = "#005CA7" -> var(--brand) */
function replaceQuotedColors(source) {
  return source.replace(/(["'`])#[0-9a-fA-F]{6}\1/g, (whole, quote) => {
    const variable = BRAND_VARS[whole.slice(1, -1).toLowerCase()];
    return variable ? quote + "var(" + variable + ")" + quote : whole;
  });
}

/** цвета внутри linear-gradient() и прочих CSS-строк */
function replaceCssColors(source) {
  return source.replace(/#[0-9a-fA-F]{6}(?![0-9a-fA-F])/g, (whole) => {
    const variable = BRAND_VARS[whole.toLowerCase()];
    return variable ? "hsl(var(" + variable + "))" : whole;
  });
}

function migrate(file) {
  const before = fs.readFileSync(file, "utf8");
  const isIcon = /[\\/]icons[\\/]/.test(file);
  let after = replaceArbitraryClasses(before);
  after = replaceQuotedColors(after);
  after = replaceCssColors(after);
  if (isIcon) {
    // в SVG-атрибутах hsl() не нужен, достаточно переменной
    after = after.replace(/(fill|stroke|stopColor)="hsl\(var\((--[a-z0-9-]+)\)\)"/g, '$1="var($2)"');
  }
  return { before, after };
}

/** CLI запускается только при прямом вызове, чтобы скрипты могли импортировать BRAND_VARS. */
function main() {
  const files = walk(SRC);
  const mode = process.argv[2] ?? "--dry-run";

  if (mode === "--audit") {
    let total = 0;
    for (const file of files) {
      const content = fs.readFileSync(file, "utf8");
      const hits = (content.match(/#[0-9a-fA-F]{6}(?![0-9a-fA-F])/g) ?? [])
        .filter((hex) => BRAND_VARS[hex.toLowerCase()]);
      if (hits.length) {
        total += hits.length;
        console.log(path.relative(process.cwd(), file) + ": " + [...new Set(hits)].join(" "));
      }
    }
    console.log("\nОстатков бренд-цвета в ts/tsx: " + total);
    process.exit(total > 0 ? 1 : 0);
  }

  let changed = 0;
  for (const file of files) {
    const { before, after } = migrate(file);
    if (before === after) continue;
    changed++;
    const beforeLines = before.split("\n");
    const afterLines = after.split("\n");
    const touched = afterLines.filter((line, i) => line !== beforeLines[i]).length;
    console.log((mode === "--apply" ? "FIXED    " : "would fix") + " " + path.relative(process.cwd(), file) + " (" + touched + ")");
    if (mode === "--apply") fs.writeFileSync(file, after, "utf8");
  }
  console.log("\nФайлов затронуто: " + changed);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main();
}
