/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // unoptimized: true,
        remotePatterns: [
            { hostname: "mp2.aptekaantey.ru", protocol: "https" },
            { hostname: "sklad.ms", protocol: "https" },
            { hostname: 'cdn.aptekaantey.ru', protocol: 'https' },
            { hostname: 'api.netvol.org', protocol: 'https' },
        ],
    },
    env: {
        API_URL: process.env.API_URL,
        YANDEX_API_KEY: process.env.YANDEX_API_KEY,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
};

export default nextConfig;
