"use client";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react"

const Checkbox = React.forwardRef<
  // ToDo: ElementRef is deprecated - need to fix
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & {
    variant?: "rounded" | "square";
  }
>(({ className, variant = "square", ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer min-w-6 min-h-6 h-fit shrink-0 border border-primary-gray focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary-blue data-[state=checked]:border-primary-blue data-[state=checked]:text-primary-foreground",
      variant === "square"
        ? "rounded-sm data-[state=checked]:bg-primary-blue"
        : "rounded-full data-[state=checked]:bg-transparent bg-transparent",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      {variant === "square" && (
        <>
          <Check className="w-[90%]" />
        </>
      )}
      {variant === "rounded" && (
        <div className=" w-4 h-4 bg-primary-blue rounded-full"></div>
      )}
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
