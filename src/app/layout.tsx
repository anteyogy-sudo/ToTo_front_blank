import "./globals.css";
import type {Metadata} from "next";
import {cn} from "@/lib/utils";
import localFont from "next/font/local";
import Script from "next/script";
import {QueryClientWrapper} from "@/wrappers/QueryClientWrapper";
import {ReactNode} from "react";

const apiKey = process.env.YANDEX_API_KEY || "841198fb-e942-4b66-bdff-19bd7c578805";

export const metadata: Metadata = {
    title: "Test",
    description: "Test",
    robots: {
        index: false,
        follow: false,
    },
    verification: {
        yandex: '9470462c27ca0e62',
    }
};

const pt_root_ui = localFont({
    src: [
        { path: "./fonts/PT Root UI_Light.woff2", weight: "300", },
        { path: "./fonts/PT Root UI_Regular.woff2", weight: "400", },
        { path: "./fonts/PT Root UI_Medium.woff2", weight: "500", },
        { path: "./fonts/PT Root UI_Bold.woff2", weight: "700", },
    ],
    variable: "--font-pt-root-ui",
});

export default function RootLayout({ children, }: {
    children: ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                {/* Ссылки для оптимизации загрузки страницы */}
                <link rel="preconnect" href="https://cdn.diginetica.net/" />
                <link rel="preconnect" href="https://tracking.diginetica.net/" />
                <link rel="preconnect" href="https://tracking-app.diginetica.net/" />
            </head>
            <body
                className={cn("antialiased mx-auto bg-white-100 ", pt_root_ui.className)}
                style={{ margin: "0 auto !important", padding: "0 !important", overflow: "auto !important" }}
            >
                <QueryClientWrapper>
                    <Script
                        id="diginetica-script"
                        strategy="afterInteractive"
                        dangerouslySetInnerHTML={{
                            __html: `
                      (function() {
                        var digiScript = document.createElement('script');
                        digiScript.src = '//cdn.diginetica.net/8594/client.js';
                        digiScript.defer = true;
                        digiScript.async = true;
                        document.head.appendChild(digiScript);
                      })();
                    `,
                        }}
                    />
                        {children}
                    <Script
                        src={`https://api-maps.yandex.ru/v3/?apikey=${apiKey}&lang=ru_RU`}
                        strategy="afterInteractive"
                    />
                </QueryClientWrapper>
            </body>
        </html>
    );
}