"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import ArrowDown from "@/assets/icons/chevron-down.svg";
import { cn } from "@/lib/utils";
import Image from "next/image";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
    React.ElementRef<typeof AccordionPrimitive.Item>,
    React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
    <AccordionPrimitive.Item
        ref={ref}
        className={cn("border-b border-gray-200 last:border-b-0", className)}
        {...props}
    />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
    React.ElementRef<typeof AccordionPrimitive.Trigger>,
    React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> & {
    icon?: "plus-minus" | "arrow" | "custom";
    customIcon?: React.ReactNode;
}
>(({ className, children, icon = "plus-minus", customIcon, ...props }, ref) => (
    <AccordionPrimitive.Header className="flex">
        <AccordionPrimitive.Trigger
            ref={ref}
            className={cn(
                "group flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline text-left",
                className
            )}
            {...props}
        >
            {children}
            {icon === "plus-minus" && (
                <div className="relative w-6 h-6 ml-4 shrink-0">
                    {/* Плюс */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-6 h-0.5 bg-current transition-all duration-300 group-data-[state=open]:opacity-0 group-data-[state=open]:rotate-90" />
                        <div className="absolute w-0.5 h-6 bg-current transition-all duration-300 group-data-[state=open]:opacity-0 group-data-[state=open]:rotate-90" />
                    </div>
                    {/* Минус */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-6 h-0.5 bg-current transition-all duration-300 opacity-0 rotate-90 group-data-[state=open]:opacity-100 group-data-[state=open]:rotate-0" />
                    </div>
                </div>
            )}
            {icon === "arrow" && (
                <Image
                    src={ArrowDown}
                    alt="arrow icon"
                    width={24}
                    height={24}
                    className="transition-transform duration-300 group-data-[state=open]:rotate-180"
                />
            )}
            {icon === "custom" && customIcon}
        </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
    React.ElementRef<typeof AccordionPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
    <AccordionPrimitive.Content
        ref={ref}
        className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
        {...props}
    >
        <div className={cn("pb-4 pt-0", className)}>{children}</div>
    </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };