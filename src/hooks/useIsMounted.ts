import { useState } from "react";
import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect";

export const useIsMounted = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useIsomorphicLayoutEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted;
};
