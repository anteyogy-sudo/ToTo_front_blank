"use client";

import type { ErrorBoundaryProps } from "react-error-boundary";
import { ErrorBoundary } from "react-error-boundary";

export const ErrorBoundaryWrapper = ({
  children,
  ...props
}: ErrorBoundaryProps) => {
  return <ErrorBoundary {...props}>{children}</ErrorBoundary>;
};
