"use client";

import { ListItems } from "@/components/ListItems";
import Link from "next/link";
import { useFetchCatalogSubitems } from "../hooks/queries/useFetchCatalogSubitems";
import { createArray } from "@/utils/create-array";
import { useWait } from "@/hooks/useWait";

interface Props {
  catalogId: number;
  onClose: () => void;
}

export const DisplayMobileCatalogSubcategories = ({
  catalogId,
  onClose,
}: Props) => {
  const {
    data: catalogSubitems,
    isError,
    isPending,
    isSuccess,
    error,
  } = useFetchCatalogSubitems(catalogId);
  const isWaiting = useWait();

  if (isPending || isWaiting) {
    return (
      <div className=" w-full h-fit flex flex-col gap-2">
        <ListItems
          items={createArray(15)}
          render={(item) => (
            <div
              key={item}
              className=" w-full h-4 rounded-sm bg-loading-skeleton animate-pulse"
            />
          )}
        />
      </div>
    );
  }

    if (isError) throw error;

    const categories = catalogSubitems?.data?.categories ?? [];

    if (isSuccess && categories.length === 0) return null;

    return (
        <div className="w-full flex flex-col gap-2">
            <ListItems
                items={categories}
                render={(subItem) => (
                    <Link
                        href={`/catalog/${subItem.id}?catalog=${catalogSubitems?.data?.name}&category=${subItem.name}`}
                        key={subItem.id}
                        onClick={onClose}
                        className="w-fit text-primary-gray leading-[120%] font-medium"
                    >
                        {subItem.name}
                    </Link>
                )}
            />
        </div>
    );
};