import { FALLBACK_API_URL } from "@/configs/axios";

export const imagePath = (path?: string | null) => {
    if (!path) return "";

    if (path.startsWith("https://")) {
        return path;
    }

    return `${FALLBACK_API_URL}/storage/${path.replace(/^\/+/, "")}`;
};