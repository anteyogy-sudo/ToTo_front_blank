"use client";

import { ListItems } from "@/components/ListItems";
import { imagePath } from "@/utils/image-path";
import Image from "next/image";
import { useFetchCatalogsQuery } from "../hooks/queries/useFetchCatalogsQuery";
import { useRouter, useSearchParams } from "next/navigation";
import { CatalogProps } from "@/types/catalog.types";
import { useMemo } from "react";
import { DisplayMobileCatalogSubcategories } from "./DisplayMobileCatalogSubcategories";
import { ErrorBoundaryWrapper } from "@/components/ErrorBoundaryWrapper";
import { cn } from "@/lib/utils";

interface Props {
  onClose: () => void;
}

export const DisplayMobileCatalogs = ({ onClose }: Props) => {
  const {
    data: catalogs,
    error,
    isError,
    isPending,
    isSuccess,
  } = useFetchCatalogsQuery({ enabled: true });
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentCatalogId = searchParams.get("catalog");
  const currentCatalogTitle = searchParams.get("title");

  const hasSelectedCatalog = useMemo(() => {
    return !!currentCatalogId && !!currentCatalogTitle;
  }, [currentCatalogId, currentCatalogTitle]);

  const onSelectCatalog = (id: CatalogProps["id"], title: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("catalog", id.toString());
    params.set("title", title);
    router.push(`?${params.toString()}`);
  };

  if (isError) throw error;
  if (isPending || (isSuccess && !catalogs.data.length)) return null;

  return (
    <div
      className={cn(
        " w-full h-fit max-h-[80dvh] custom-scroll pr-3 overflow-y-auto grid grid-cols-2 gap-4",
        hasSelectedCatalog && "grid-cols-1"
      )}
    >
      {!hasSelectedCatalog ? (
        <ListItems
          items={catalogs.data}
          render={(catalog) => (
            <div
              key={catalog.id}
              onClick={() => onSelectCatalog(catalog.id, catalog.name)}
              className=" relative w-full aspect-video border overflow-hidden rounded-md cursor-pointer"
            >
              <Image
                src={imagePath(catalog.image)}
                alt={catalog.name}
                fill
                className=" w-full h-full object-cover"
              />

              <p
                className=" max-w-[90%] absolute top-2 left-2 z-10 font-medium leading-tight"
                style={{ color: `#${catalog.text_color}` }}
              >
                {catalog.name}
              </p>
            </div>
          )}
        />
      ) : (
        <ErrorBoundaryWrapper
          fallbackRender={() => (
            <div className=" w-full h-full p-4 bg-red-200 text-destructive flex items-center justify-center">
              Произошла ошибка
            </div>
          )}
        >
          <DisplayMobileCatalogSubcategories
            catalogId={Number(currentCatalogId)}
            onClose={onClose}
          />
        </ErrorBoundaryWrapper>
      )}
    </div>
  );
};
