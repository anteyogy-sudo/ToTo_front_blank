/**
 * Перекраска статичных SVG-ассетов под нужный бренд.
 *
 *   node scripts/tint-svg.mjs --brand zoo            показать, что изменится
 *   node scripts/tint-svg.mjs --brand zoo --apply    применить
 *
 * Зачем отдельный скрипт. Иконки вида `import Icon from "@/assets/x.svg"`
 * подключаются как URL и рендерятся через <Image src={Icon} /> / <img src>.
 * Браузер грузит такой SVG отдельным файлом, поэтому CSS-переменные
 * (var(--brand)) внутрь него не проникают — цвет должен быть «запечён»
 * в сам файл. Отсюда два легальных способа темизации иконок:
 *
 *   1. Запечь цвет на этапе сборки клона (этот скрипт). Работает с <Image>,
 *      не требует новых зависимостей, результат детерминирован.
 *   2. Перевести иконки в React-компоненты через @svgr/webpack и красить
 *      fill/stroke в currentColor. Даёт переключение темы в рантайме,
 *      но трогает все места импорта и требует настройки webpack-правила.
 *
 * Палитра берётся из src/app/globals.css: блоки `.brand-antey` и `.brand-zoo`
 * остаются единственным источником значений, дублировать hex здесь не нужно.
 */
import fs from "node:fs";
import path from "node:path";
import { BRAND_VARS } from "./brand-colors.mjs";

const ROOT = process.cwd();
const GLOBALS = path.join(ROOT, "src", "app", "globals.css");
const ASSET_DIRS = ["src/assets", "public"].map((dir) => path.join(ROOT, dir));

/** HSL-триплет из globals.css ("207 100% 33%") -> hex вида #005ca7 */
function hslTripletToHex(triplet) {
  const [hRaw, sRaw, lRaw] = triplet.trim().split(/\s+/);
  const h = parseFloat(hRaw) / 360;
  const s = parseFloat(sRaw) / 100;
  const l = parseFloat(lRaw) / 100;

  const channel = (offset) => {
    const k = (offset + h * 12) % 12;
    const a = s * Math.min(l, 1 - l);
    return l - a * Math.max(-1, Math.min(k - 3, Math.min(9 - k, 1)));
  };

  return (
    "#" +
    [channel(0), channel(8), channel(4)]
      .map((value) => Math.round(value * 255).toString(16).padStart(2, "0"))
      .join("")
  );
}

/** Читает значения бренд-переменных из блока `.brand-<id>` в globals.css */
function readBrandPalette(brandId) {
  const css = fs.readFileSync(GLOBALS, "utf8");
  const start = css.indexOf(`.brand-${brandId}`);
  if (start === -1) {
    throw new Error(`Блок .brand-${brandId} не найден в ${path.relative(ROOT, GLOBALS)}`);
  }
  const block = css.slice(start, css.indexOf("}", start));

  const variables = new Map();
  for (const match of block.matchAll(/(--brand[a-z0-9-]*)\s*:\s*([^;]+);/g)) {
    variables.set(match[1], match[2].trim());
  }
  return variables;
}

/** Строит карту «hex текущего бренда -> hex выбранного бренда» */
function buildRecolorMap(brandId) {
  const palette = readBrandPalette(brandId);
  const map = new Map();

  for (const [sourceHex, variable] of Object.entries(BRAND_VARS)) {
    const triplet = palette.get(variable);
    if (!triplet) continue;
    const targetHex = hslTripletToHex(triplet);
    if (targetHex !== sourceHex) map.set(sourceHex, targetHex);
  }
  return map;
}

function collectSvgFiles(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) collectSvgFiles(full, out);
    else if (entry.name.toLowerCase().endsWith(".svg")) out.push(full);
  }
  return out;
}

/** Красит только каналы цвета, чтобы не задеть path-данные в `d` */
const COLOR_ATTRIBUTER = /\b(fill|stroke|stop-color)\s*=\s*(["'])#([0-9a-fA-F]{6})\2/g;

function tint(source, recolorMap) {
  let count = 0;
  const after = source.replace(COLOR_ATTRIBUTER, (whole, attribute, quote, hex) => {
    const target = recolorMap.get("#" + hex.toLowerCase());
    if (!target) return whole;
    count++;
    return `${attribute}=${quote}${target}${quote}`;
  });
  return { after, count };
}

const apply = process.argv.includes("--apply");
const brandFlag = process.argv.indexOf("--brand");
const brandId = brandFlag === -1 ? "zoo" : process.argv[brandFlag + 1];

const recolorMap = buildRecolorMap(brandId);

if (recolorMap.size === 0) {
  console.log(`Бренд .brand-${brandId} совпадает с исходным — перекраска не нужна.`);
} else {
  console.log(`Целевой бренд: .brand-${brandId}, заменяемых оттенков: ${recolorMap.size}`);
  for (const [from, to] of recolorMap) console.log(`  ${from} -> ${to}`);
}

let files = [];
for (const dir of ASSET_DIRS) files = collectSvgFiles(dir, files);

let touchedFiles = 0;
let touchedColors = 0;

for (const file of files) {
  const before = fs.readFileSync(file, "utf8");
  const { after, count } = tint(before, recolorMap);
  if (count === 0) continue;
  touchedFiles++;
  touchedColors += count;
  console.log(`${apply ? "FIXED    " : "would fix"} ${path.relative(ROOT, file)} (${count})`);
  if (apply) fs.writeFileSync(file, after, "utf8");
}

console.log(
  `\nSVG: проверено ${files.length}, с изменёнными цветами ${touchedFiles}, всего замен ${touchedColors}`,
);
if (!apply) console.log("Это предпросмотр. Для записи добавьте --apply");
