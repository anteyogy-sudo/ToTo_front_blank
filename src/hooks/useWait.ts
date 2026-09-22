import { wait } from "@/utils/wait";
import { useState } from "react";
import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect";

export const useWait = (ms?: number) => {
  const [isWaiting, setIsWaiting] = useState<boolean>(true);

  useIsomorphicLayoutEffect(() => {
    const handleWait = async () => {
      await wait(ms);
      setIsWaiting(false);
    };

    handleWait();
  }, []);

  return isWaiting;
};
