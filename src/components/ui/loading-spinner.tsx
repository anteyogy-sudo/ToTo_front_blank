import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface Props {
  size?: string | number | undefined;
  className?: string;
}

export const LoadingSpinner = ({ size = 32, className }: Props) => {
  return (
    <Loader2
      size={size}
      width={size}
      height={size}
      style={{ width: `${size}px`, height: `${size}px` }}
      className={cn(" animate-spin text-primary-blue", className)}
    />
  );
};
