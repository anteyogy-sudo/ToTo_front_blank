"use client";

import { ListItems } from "@/components/ListItems";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

interface Producer {
    id: number;
    label: string;
}

interface Props {
    selectedProducers: string[];
    handleChangeProducers: (producerId: string) => void;
    producers: Producer[];
    isLoading?: boolean;
    error?: boolean;
}

export const ProducersAccordion = ({
                                       selectedProducers,
                                       handleChangeProducers,
                                       producers,
                                       isLoading = false,
                                       error = false,
                                   }: Props) => {
    return (
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="manufacturer">
                <AccordionTrigger
                    icon="arrow"
                    className="hover:no-underline 1144:text-[20px] text-[18px] font-medium leading-[120%] py-0"
                >
                    Производитель
                </AccordionTrigger>
                <AccordionContent className="pt-4 pb-0 flex flex-col gap-2">
                    {isLoading ? (
                        <LoadingSpinner size={24} />
                    ) : error ? (
                        <p className="text-destructive">Ошибка загрузки</p>
                    ) : producers.length === 0 ? (
                        <p className="text-gray-500">Нет производителей</p>
                    ) : (
                        <ListItems
                            items={producers}
                            render={(producer) => (
                                <div
                                    key={producer.id}
                                    className="w-full flex items-center justify-between gap-2 h-fit"
                                >
                                    <label
                                        htmlFor={`producer-${producer.id}`}
                                        className="leading-[120%] text-base cursor-pointer"
                                    >
                                        {producer.label}
                                    </label>
                                    <Checkbox
                                        id={`producer-${producer.id}`}
                                        checked={selectedProducers.includes(String(producer.id))}
                                        onCheckedChange={() => handleChangeProducers(String(producer.id))}
                                    />
                                </div>
                            )}
                        />
                    )}
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};