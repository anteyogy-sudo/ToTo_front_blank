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

interface Composition {
    id: number;
    label: string;
}

interface Props {
    selectedCompositions: string[];
    handleChangeCompositions: (compositionId: string) => void;
    compositions: Composition[];
    isLoading?: boolean;
    error?: boolean;
}

export const CompositionsAccordion = ({
                                          selectedCompositions,
                                          handleChangeCompositions,
                                          compositions,
                                          isLoading = false,
                                          error = false,
                                      }: Props) => {
    return (
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="active-ingredient">
                <AccordionTrigger
                    icon="arrow"
                    className="hover:no-underline 1144:text-[20px] text-[18px] font-medium leading-[120%] py-0"
                >
                    Действующее вещество
                </AccordionTrigger>
                <AccordionContent className="pt-4 pb-0 flex flex-col gap-2">
                    {isLoading ? (
                        <LoadingSpinner size={24} />
                    ) : error ? (
                        <p className="text-destructive">Ошибка загрузки</p>
                    ) : compositions.length === 0 ? (
                        <p className="text-gray-500">Нет действующих веществ</p>
                    ) : (
                        <ListItems
                            items={compositions}
                            render={(composition) => (
                                <div
                                    key={composition.id}
                                    className="w-full flex justify-between gap-2 h-fit select-none"
                                >
                                    <label
                                        htmlFor={`composition-${composition.id}`}
                                        className="break-all leading-[120%] text-base cursor-pointer"
                                    >
                                        {composition.label}
                                    </label>
                                    <Checkbox
                                        id={`composition-${composition.id}`}
                                        checked={selectedCompositions.includes(String(composition.id))}
                                        onCheckedChange={() => handleChangeCompositions(String(composition.id))}
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