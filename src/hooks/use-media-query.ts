"use client";

import { useState, useEffect } from "react";

export function useMediaQuery(query: string): boolean {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const media = window.matchMedia(query);

        // Установить начальное значение
        setMatches(media.matches);

        // Обработчик изменений
        const handler = (event: MediaQueryListEvent) => {
            setMatches(event.matches);
        };

        // Сохраняем изменения
        media.addEventListener("change", handler);

        // Очистка
        return () => media.removeEventListener("change", handler);
    }, [query]);

    return matches;
}