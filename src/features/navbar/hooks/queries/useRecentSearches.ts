// Хук для работы с последними запросами
"use client";

import { useState, useEffect } from "react";

export const useRecentSearches = () => {
    const [recentSearches, setRecentSearches] = useState<string[]>([]);

    useEffect(() => {
        // Загружаем последние запросы из localStorage
        const stored = localStorage.getItem("recentSearches");
        if (stored) {
            setRecentSearches(JSON.parse(stored));
        }
    }, []);

    const addRecentSearch = (query: string) => {
        if (!query.trim()) return;

        setRecentSearches(prev => {
            // Убираем дубликаты и ограничиваем до 3 элементов
            const filtered = prev.filter(item => item !== query);
            const newSearches = [query, ...filtered].slice(0, 3);

            // Сохраняем в localStorage
            localStorage.setItem("recentSearches", JSON.stringify(newSearches));
            return newSearches;
        });
    };

    //Кнопка очистить
    const removeRecentSearch = (query: string) => {
        setRecentSearches(prev => {
            const newSearches = prev.filter(item => item !== query);
            localStorage.setItem("recentSearches", JSON.stringify(newSearches));
            return newSearches;
        });
    };

    const clearRecentSearches = () => {
        setRecentSearches([]);
        localStorage.removeItem("recentSearches");
    };

    return {
        recentSearches,
        addRecentSearch,
        removeRecentSearch,
        clearRecentSearches
    };
};