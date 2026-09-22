"use client";

import {ChangeEvent, ComponentProps, forwardRef} from "react";
import { IMaskInput } from "react-imask";
import { cn } from "@/lib/utils";

type Props = ComponentProps<typeof IMaskInput>;

export const MaskedInput = forwardRef<HTMLInputElement, Props>(
    ({ className, onAccept, ...props }, ref) => {
        return (
            <IMaskInput
                {...props}
                inputRef={ref}
                onAccept={(value, mask) => {
                    if (props.onChange) {
                        props.onChange({
                            target: { value },
                        } as ChangeEvent<HTMLInputElement>);
                    }

                    onAccept?.(value, mask);
                }}
                className={cn(
                    "flex h-9 w-full rounded-md border border-input bg-transparent px-4 py-1 text-base",
                    className
                )}
            />
        );
    }
);

MaskedInput.displayName = "MaskedInput";