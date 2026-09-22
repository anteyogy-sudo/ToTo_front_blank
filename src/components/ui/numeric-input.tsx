import { InputHTMLAttributes } from "react";
import { Input } from "./input";
import { cn } from "@/lib/utils";

type Props = InputHTMLAttributes<HTMLInputElement>;

export const NumericInput = ({ className, onInput, ...props }: Props) => {
  return (
    <Input
      type="text"
      className={cn(className)}
      inputMode="numeric"
      pattern="[0-9]*"
      onInput={(e) => {
        const target = e.target as HTMLInputElement;
        // Only keep digits
        target.value = target.value.replace(/[^\d]/g, "");
        onInput?.(e);
      }}
      {...props}
    />
  );
};
