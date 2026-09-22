"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

interface DualRangeSliderProps extends React.ComponentProps<typeof SliderPrimitive.Root> {
    labelPosition?: "top" | "bottom";
    label?: (value: number | undefined) => React.ReactNode;
}

const DualRangeSlider = React.forwardRef<React.ElementRef<typeof SliderPrimitive.Root>, DualRangeSliderProps>(
    ({ className, label, labelPosition = "top", ...props }, ref) => {
        const initialValue = Array.isArray(props.value) ? props.value : [props.min, props.max];

        return (
            <SliderPrimitive.Root
                ref={ref}
                className={cn("relative flex w-full touch-none select-none items-center", className)}
                {...props}
            >
                {/* Неактивный ползунок серая линия */}
                <SliderPrimitive.Track className="relative h-[2px] w-full grow overflow-hidden rounded-full bg-gray-300">
                    {/* Активный ползунок синяя линия */}
                    <SliderPrimitive.Range className="absolute h-full bg-primary-blue" />
                </SliderPrimitive.Track>
                {/* Минимальное и максимальное значение */}
                {initialValue.map((value, index) => (
                    <React.Fragment key={index}>
                        <SliderPrimitive.Thumb className="relative block h-4 w-4 rounded-full bg-primary-blue transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-blue focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer">
                            {label && (
                                <span
                                    className={cn(
                                        "absolute flex w-full justify-center",
                                        labelPosition === "top" && "-top-7",
                                        labelPosition === "bottom" && "top-4"
                                    )}
                                >
                  {label(value)}
                </span>
                            )}
                        </SliderPrimitive.Thumb>
                    </React.Fragment>
                ))}
            </SliderPrimitive.Root>
        );
    }
);
DualRangeSlider.displayName = "DualRangeSlider";

export { DualRangeSlider };