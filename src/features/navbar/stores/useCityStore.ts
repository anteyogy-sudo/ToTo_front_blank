import { create } from "zustand";
import Cookies from "js-cookie";
import { CityProps } from "@/types/city.types";
import { usePharmacyStore } from "@/stores/usePharmacyStore";

type City = {
    id: CityProps["id"];
    name: string;
};

interface CityState {
    selectedCity: City | null;
    confirmedCity: City;
    isManualSelected: boolean;

    setCity: (city: City) => void;
    confirmCity: (city?: City) => void;
    onManualSelect: () => void;
    loadConfirmedCityFromCookie: () => void;
    initializeCityIntoCookie: (city: City) => void;
}

const CITY_COOKIE_OPTIONS = {
    expires: 365,
    path: "/",
    sameSite: "lax" as const,
};

const maskToken = (token: string | undefined) => {
    if (!token) return "no-access-token";
    if (token.length <= 10) return token;
    return `${token.slice(0, 6)}...${token.slice(-4)}`;
};

const getAccessToken = () => Cookies.get("access_token");

const logCitySelection = (source: string, city: City) => {
    const token = maskToken(getAccessToken());
    console.log(`[CitySelection:${source}] token=${token}`, {
        cityId: city.id,
        cityName: city.name,
    });
};

export const useCityStore = create<CityState>((set) => ({
    selectedCity: null,
    confirmedCity: {
        id: 34,
        name: "Вологда",
    },
    isManualSelected: false,

    setCity: (city) => set({ selectedCity: city }),

    onManualSelect: () => set({ isManualSelected: true }),

    initializeCityIntoCookie: (city) => {
        Cookies.set(
            "city",
            JSON.stringify({
                id: city.id,
                name: city.name,
                "selected-manually": false,
            }),
            CITY_COOKIE_OPTIONS
        );

        logCitySelection("initialize", city);
        set({ selectedCity: city, confirmedCity: city, isManualSelected: false });
    },

    confirmCity: (city) =>
        set((state) => {
            const cityToConfirm = city ?? state.selectedCity;
            if (!cityToConfirm) return {};

            Cookies.set(
                "city",
                JSON.stringify({
                    id: cityToConfirm.id,
                    name: cityToConfirm.name,
                    "selected-manually": state.isManualSelected,
                }),
                CITY_COOKIE_OPTIONS
            );

            logCitySelection("confirm", cityToConfirm);

            const { reset: resetPharmacy } = usePharmacyStore.getState();
            resetPharmacy();

            return {
                selectedCity: cityToConfirm,
                confirmedCity: cityToConfirm,
            };
        }),

    loadConfirmedCityFromCookie: () => {
        const cookie = Cookies.get("city");
        if (!cookie) return;

        try {
            const parsed = JSON.parse(cookie) as {
                id: City["id"];
                name: string;
                "selected-manually": boolean;
            };

            console.log("[CitySelection:loadFromCookie]", {
                token: maskToken(getAccessToken()),
                cityId: parsed.id,
                cityName: parsed.name,
                selectedManually: parsed["selected-manually"],
            });

            set({
                selectedCity: { id: parsed.id, name: parsed.name },
                confirmedCity: { id: parsed.id, name: parsed.name },
                isManualSelected: parsed["selected-manually"],
            });
        } catch (error) {
            console.error("Invalid city cookie:", error);
        }
    },
}));