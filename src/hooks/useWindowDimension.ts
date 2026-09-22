import { useState } from "react";
import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect";

export const useWindowDimension = () => {
  const [size, setSize] = useState<{ width: number; height: number }>({ width: 1440, height: 0 });

  useIsomorphicLayoutEffect(() => {
    const controller = new AbortController();

    const getWindowDimension = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setSize({ width, height });
    };

    getWindowDimension();

    window.addEventListener("resize", getWindowDimension, controller);

    return () => {
      controller.abort();
    };
  }, []);

  return size;
};
