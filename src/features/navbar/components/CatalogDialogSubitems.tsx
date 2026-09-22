"use client";

import { ListItems } from "@/components/ListItems";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { createArray } from "@/utils/create-array";
import Link from "next/link";
import { useState } from "react";
import { useFetchCatalogSubitems } from "../hooks/queries/useFetchCatalogSubitems";

interface Props {
  catalogId: number | null;
  onClose: () => void;
}

export const CatalogDialogSubitems = ({ catalogId, onClose }: Props) => {
  const { data: catalogSubitems, status: subitemsStatus } = useFetchCatalogSubitems(catalogId);
  const [previousCatalogSubitemsLength, setPreviousCatalogSubitemsLength] = useState<number>(24);

  useIsomorphicLayoutEffect(() => {
    if (catalogSubitems?.data.categories) {
      setPreviousCatalogSubitemsLength(catalogSubitems.data.categories.length);
    }
  }, [catalogSubitems]);

  const categories = catalogSubitems?.data?.categories;

  return (
    <div className=" w-full h-full max-h-[calc(640px-80px)] pb-4 flex flex-col gap-6 sticky top-10 overflow-y-auto hide-scrollbar">
      {subitemsStatus === "pending" && (
        <div className=" w-full max-w-80 h-9 rounded-sm bg-loading-skeleton animate-pulse" />
      )}
      {subitemsStatus === "success" && (
        <p className=" text-[32px] font-bold leading-[100%]">{catalogSubitems.data.name}</p>
      )}
      <div className=" w-full grid grid-cols-2 gap-x-10 gap-y-4">
        {/* pending */}
        {subitemsStatus === "pending" && (
          <ListItems
            items={createArray(previousCatalogSubitemsLength)}
            render={(item, index) => (
              <div key={item + index} className=" w-full h-5 rounded-sm bg-loading-skeleton animate-pulse" />
            )}
          />
        )}

        {/* error */}
        {subitemsStatus === "error" && <p>Error subitems</p>}

        {/* success */}
        {subitemsStatus === "success" && (
            (categories && categories.length > 0) ? (
                <ListItems
                    items={categories}
                    render={(subitem) => (
                        <Link href={`/catalog/${subitem.id}?group_id=${catalogSubitems.data.id}&catalog=${catalogSubitems.data.name}&category=${subitem.name}`}
                              key={subitem.id}
                              onClick={onClose}
                              className="text-primary-gray leading-[120%] font-medium hover:text-primary-blue transition-colors duration-500"
                        >
                          {subitem.name}
                        </Link>
                    )}
                />
            ) : (
                <span className="text-primary-black-gray">
                  В этой категории сейчас нет предложений.
                </span>
            )
        )}
      </div>
    </div>
  );
};
