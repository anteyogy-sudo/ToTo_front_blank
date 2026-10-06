This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Бренд-палитра

Вся фирменная расцветка вынесена в единственное место — блок `:root, .brand-antey`
в [`src/app/globals.css`](src/app/globals.css). Чтобы перекрасить сайт, менять компоненты не нужно.

Значения хранятся как HSL-триплеты без запятых (`207 100% 33%`), а не как `hsl(...)`.
Это нужно, чтобы Tailwind мог подставлять альфа-канал: `bg-primary-blue/15`,
`hover:bg-opacity-90` и т. п. Формат токена в [`tailwind.config.ts`](tailwind.config.ts):
`hsl(var(--brand) / <alpha-value>)`.

### Как сменить расцветку

Расцветка включается классом на `<html>`. Класс берётся из `NEXT_PUBLIC_BRAND`:

```bash
npm run dev:antey          # или dev:zoo
npm run build:antey        # или build:zoo
```

Либо вручную через `.env.local`:

```bash
NEXT_PUBLIC_BRAND=zoo
```

В [`src/app/globals.css`](src/app/globals.css) есть два блока палитр —
`.brand-antey` и `.brand-zoo`. Чтобы перекрасить бренд, достаточно поменять
значения в нужном блоке, компоненты трогать не нужно.

Проверить, что нигде не осталось «старых» hex:

```bash
npm run brand:audit        # код возврата 1, если остались остатки
node scripts/brand-colors.mjs --apply   # массово заменить найденные hex на токены
```

Не-цветовая часть бренда (названия, email, ссылки на приложения и соцсети)
живёт в `BRAND_CONFIG` ([`src/configs/brand.ts`](src/configs/brand.ts)).

### Токены и классы

| Переменная | Назначение | Класс Tailwind |
| --- | --- | --- |
| `--brand` | основной цвет: кнопки, активные состояния, обводки фокуса | `primary-blue` |
| `--brand-dark` | hover / нажатое состояние | `primary-dark` |
| `--brand-strong` | насыщенный акцент, градиенты | `blue-strong` |
| `--brand-medium` | светлые бейджи статусов | `blue-medium` |
| `--brand-soft` | приглушённый сине-фиолетовый | `primary-softBlue` |
| `--brand-bright` | светлые акценты поверх тёмного | `primary-bright` |
| `--brand-tint`, `--brand-tint-2`, `--brand-tint-3` | светлые фоны брендового оттенка | `blue-lightBlue`, `blue-light`, `blue-lightGrayBlue2` |
| `--brand-line`, `--brand-line-2` | обводки разделителей | `blue-light-gray`, `blue-lightGrayBlue` |
| `--brand-frost` | почти белый брендовый фон | `blue-soft` |

Переменные `--brand-sky`, `--brand-deep`, `--brand-night`, `--brand-ink`, `--brand-navy`,
`--brand-royal`, `--brand-azure`, `--brand-glow`, `--brand-mist`, `--brand-haze`,
`--brand-haze-2`, `--brand-violet`, `--brand-plum`, `--brand-orchid`, `--brand-mid`,
`--brand-stop-a…e` — стоп-цвета декоративных градиентов (промо-баннер приложения,
заглушка `/maintenance`, экран «как оформить заказ»). Готовых классов под них нет,
используются как arbitrary-значения: `from-[hsl(var(--brand-night))]`,
`style={{ background: "linear-gradient(90deg, hsl(var(--brand-navy)), hsl(var(--brand)))" }}`.

### Правила для нового кода

- Не пишите фирменный цвет literal-ом: вместо `bg-[#005CA7]` — `bg-primary-blue`.
- Полупрозрачный фирменный: `bg-primary-blue/15`, а не hex с альфа-каналом.
- В inline-градиентах используйте `hsl(var(--brand-…))`, а не hex.
- Статичные `.svg` из `public/` CSS-переменные не наследуют — такие файлы перекрашиваются
  вручную (например, логотип в шапке инлайнен в `src/components/Logo.tsx` именно поэтому).
- Цвета, которые брендом не являются, токенами не заменяются: `#E53527` (ошибка/акция),
  `#00945E`/`#0DB85C` (успех/готовность), `#FAB600` (янтарный статус), серые `#8E9AAB`, `#64676A` и т. п.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
