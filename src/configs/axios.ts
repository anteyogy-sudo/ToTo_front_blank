import axios from "axios";

export const FALLBACK_API_URL = process.env.API_URL || "https://mp2.aptekaantey.ru";

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || FALLBACK_API_URL,
    withCredentials: true,
    withXSRFToken: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    timeout: 60000,
});

export function getCookie(name: string): string | null {
    if (typeof document === 'undefined') {
        return null;
    }

    const matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([$?*|{}\]\\\/+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : null;
}

api.interceptors.request.use(
    (config) => {
        const token = getCookie("access_token");
        // console.log("Axios request to:", config.url, "token present:", !!token);

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            config.headers["X-Guest"] = "true";
        }

        if (config.signal) {
            console.log("Request with AbortController signal");
        }

        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => {
        // console.log("API Response Success:", response.config.url, response.status, response.data);
        return response;
    },
    (error) => {
        if (axios.isCancel(error)) {
            console.log('Request canceled:', error.message);
            return Promise.reject(error);
        }

        console.error("API Response Error:", error.config?.url, error.response?.status);
        if (error.response) {
            console.error("Error data:", error.response.data);
        }

        return Promise.reject(error);
    }
);