"use client";

import { useInitializeUser } from "@/hooks/queries/useInitializeUserQuery";
import {ReactNode} from "react";

export const UserInitializer = ({ children }: { children: ReactNode }) => {
  useInitializeUser();

  return children;
};
