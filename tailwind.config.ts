import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/icons/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/shared/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/widgets/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/configs/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        "4xl": "1920px",
        "3xl": "1720px",
        "2xl": "1435px",
        xl: "1280px",
        "1144": "1144px",
        lg: "1024px",
        md: "768px",
        sm: "640px",
        xs: "560px",
        "2xs": "440px",
        "3xs": "360px",
      },
      maxWidth: {
        "375": "375px",
        "480": "480px",
        "640": "640px",
        "768": "768px",
        "950": "950px",
        "1024": "1024px",
        "1280": "1280px",
        "1440": "1440px",
        "1920": "1920px",
        "base": "1440px",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "#121212",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        "loading-skeleton": "#8E9AAB33",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          blue: "hsl(var(--brand) / <alpha-value>)",
          gray: "#8E9AAB",
          "light-white": "#F9F9F9",
          "black-gray": "#64676A",
          "black-gray2": "#525252",
          red: "hsl(var(--brand-accent) / <alpha-value>)",
          pink: "hsl(var(--brand-accent-2) / <alpha-value>)",
          yellow: "hsl(var(--brand-warning) / <alpha-value>)",
          softBlue: "hsl(var(--brand-soft) / <alpha-value>)",
          purple: "hsl(var(--brand-shine-d) / <alpha-value>)",
          dark: "hsl(var(--brand-dark) / <alpha-value>)",
          bright: "hsl(var(--brand-bright) / <alpha-value>)",
        },
        /* Поверхности и текст, зависящие от бренда */
        surface: "hsl(var(--brand-surface) / <alpha-value>)",
        surfaceHover: "hsl(var(--brand-hover) / <alpha-value>)",
        ink: "hsl(var(--brand-ink-soft) / <alpha-value>)",
        black: {
          "100": "#121212",
          "200": "#12121233",
          "400": "#12121266",
          "500": "#000000",
          "700": "#121212B2",
        },
        gray: {
          400: "#8E8E93",
          dark: "#64676A"
        },
        green: {
          500: "hsl(var(--brand-success) / <alpha-value>)",
          leaf: "hsl(var(--brand-leaf) / <alpha-value>)",
          mint: "hsl(var(--brand-success-soft) / <alpha-value>)",
        },
        blue: {
          lightBlue: "hsl(var(--brand-tint) / <alpha-value>)",
          light: "hsl(var(--brand-tint-2) / <alpha-value>)",
          medium: "hsl(var(--brand-medium) / <alpha-value>)",
          blueGray: "#8E9AAB",
          soft: "hsl(var(--brand-frost) / <alpha-value>)",
          strong: "hsl(var(--brand-strong) / <alpha-value>)",
          ghostBlue: "#F6F7FA",
          "light-gray": "hsl(var(--brand-line) / <alpha-value>)",
          lightGrayBlue: "hsl(var(--brand-line-2) / <alpha-value>)",
          lightGrayBlue2: "hsl(var(--brand-tint-3) / <alpha-value>)"
        },
        white: {
          "100": "#F9F9F9",
          "500": "#FFFFFF",
        },
        gold: {
          "500": "#D1B573",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          blue: "hsl(var(--brand-tint) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'promo': 'linear-gradient(to right, hsl(var(--brand-promo-a)), hsl(var(--brand-promo-b)), hsl(var(--brand-promo-c)))',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
        boxShadow: {
            'custom-1': '-8.17px -7px 35px 0px #00000014',
            'custom-2': '11.67px 11.67px 58.33px 0px #00000014',
            'custom-product': '0px 0px 15px 0px #13141414',
            'double': '10px 10px 20px 0px #62616E1A, -10px -10px 8px 0px #9292921A',
        },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;

