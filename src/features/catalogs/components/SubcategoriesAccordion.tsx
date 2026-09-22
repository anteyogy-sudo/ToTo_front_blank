"use client";

import { ListItems } from "@/components/ListItems";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useFetchCatalogSubitems } from "@/features/navbar/hooks/queries/useFetchCatalogSubitems";

interface Props {
  category_id: number;
}

// ToDo: Can we delete this, 'cause this unused?
export const SubcategoriesAccordion = ({ category_id }: Props) => {
  const { data: subcategories, status } = useFetchCatalogSubitems(category_id);

  return (
    <Accordion type="single" collapsible className=" w-full">
      <AccordionItem value="category">
        <AccordionTrigger icon="arrow" className=" hover:no-underline text-[20px] font-medium leading-[120%] py-0">
          Категория
        </AccordionTrigger>
        <AccordionContent className=" pt-4 pb-0 1144:max-h-fit max-h-80 overflow-y-auto hide-scrollbar flex flex-col gap-2">
          {status === "pending" ? (
            <LoadingSpinner size={24} />
          ) : status === "error" ? (
            <p>Error</p>
          ) : (
            <ListItems
              items={subcategories.data.categories ?? []}
              render={(subcategory, index) => (
                <div key={subcategory.id} className=" w-full flex items-center justify-between gap-2 h-fit select-none">
                  <label htmlFor={subcategory.name + index} className=" leading-[120%] text-base cursor-pointer">
                    {subcategory.name}
                  </label>
                  <Checkbox id={subcategory.name + index} />
                </div>
              )}
            />
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
