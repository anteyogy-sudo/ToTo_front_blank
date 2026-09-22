import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { loadYmaps, YmapsApi } from "@/lib/ymaps";
import { useState } from "react";

export const useConnectYmaps = () => {
    const [reactifiedApi, setReactifiedApi] = useState<YmapsApi>();

    useIsomorphicLayoutEffect(() => {
        let cancelled = false;

        loadYmaps().then((api) => {
            if (!cancelled) setReactifiedApi(api);
        });

        return () => {
            cancelled = true;
        };
    }, []);

    return { reactifiedApi };
};
