/**
 * Одноразовый кодомод: красные утилиты Tailwind (красный по умолчанию) →
 * семантический токен `destructive`.
 *
 * Зачем: `:root --destructive: 0 84.2% 60.2%` побайтово равен Tailwind
 * `red-500` (#EF4444), поэтому замена пиксель-идентична в светлой теме
 * и становится корректной в тёмной (красный из коробки тёмную тему игнорирует).
 *
 * Трогаем только семейство `red-500`. Бледные оттенки red-100/200/300 и
 * тёмные red-600/700/800 НЕ трогаем: они одинаковы для любого бренда,
 * а их замена сдвинула бы контраст.
 *
 * Порядок важен: базовые классы покрывают и префиксные варианты, потому что
 * `hover:text-red-500` содержит `text-red-500`.
 */
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const REPLACEMENTS = [
  ["text-red-500", "text-destructive"],
  ["border-red-500", "border-destructive"],
  ["ring-red-500", "ring-destructive"],
  ["bg-red-500", "bg-destructive"],
];

const APPLY = process.argv.includes("--apply");

function walk(dir, out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fp = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== "node_modules" && !entry.name.startsWith(".")) walk(fp, out);
    } else if (/\.(tsx|ts|jsx|js)$/.test(entry.name)) {
      out.push(fp);
    }
  }
  return out;
}

let totalFiles = 0;
let totalHits = 0;

for (const fp of walk("src")) {
  const raw = readFileSync(fp, "utf8");
  let next = raw;
  let hits = 0;

  for (const [from, to] of REPLACEMENTS) {
    const parts = next.split(from);
    if (parts.length > 1) {
      hits += parts.length - 1;
      next = parts.join(to);
    }
  }

  if (hits > 0) {
    totalFiles += 1;
    totalHits += hits;
    console.log(`  ${String(hits).padStart(2)}x  ${fp.split("\\").join("/")}`);
    if (APPLY) writeFileSync(fp, next, "utf8");
  }
}

console.log(
  `\n${APPLY ? "Заменено" : "Нашлось"}: ${totalFiles} файлов, ${totalHits} вхождений` +
    (APPLY ? "" : "  (dry-run, добавь --apply)"),
);
