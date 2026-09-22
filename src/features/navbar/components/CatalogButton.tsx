"use client";

import { ListItems } from "@/components/ListItems";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { cn } from "@/lib/utils";
import { createArray } from "@/utils/create-array";
import Image from "next/image";
import { useState } from "react";
import { useFetchCatalogsQuery } from "../hooks/queries/useFetchCatalogsQuery";
import { CatalogDialogSubitems } from "./CatalogDialogSubitems";
import CatalogIcon from '@/assets/icons/IconCatalog.svg'
import {useOpenCatalogStoreStore} from "@/features/navbar/stores/useOpenCatalogStore";

export const CatalogButton = () => {
  const [open, setOpen] = useState<boolean>(false);
  const {openCatalog, setOpenCatalog} = useOpenCatalogStoreStore()
  const [selectedCatalogId, setSelectedCatalogId] = useState<number | null>(
    null
  );
  const { data: catalogs, status } = useFetchCatalogsQuery({ enabled: open });

  const onOpen = () => setOpen(true);
  const onClose = () => {
      setOpen(false)
      setOpenCatalog(false)
  };

  useIsomorphicLayoutEffect(() => {
    if (status === "success" && catalogs.data.length > 0) {
      setSelectedCatalogId(catalogs.data[0].id);
    }
  }, [catalogs?.data, status]);

  return (
    <>
      <Button
        onClick={onOpen}
        className="flex gap-[8px] rounded-[16px] w-[122px] h-[44px] text-[18px]"
      >
        <Image src={CatalogIcon} alt=''/> Каталог
      </Button>

      <Dialog open={open || openCatalog} onOpenChange={onClose}>
        <DialogContent className=" max-w-1280 max-h-[640px] p-0" showX={false}>
          <DialogHeader className=" hidden">
            <DialogTitle>Title</DialogTitle>
            <DialogDescription>Description</DialogDescription>
          </DialogHeader>
          <div className="w-full flex items-start gap-8 p-8 rounded-2xl">
            <div className="w-full max-w-[325px] pr-3 flex flex-col gap-4 border-primary-gray max-h-[calc(640px-80px)] overflow-y-auto">
              {status === "pending" && (
                <ListItems
                  items={createArray(14)}
                  render={(item) => (
                    <div
                      key={item}
                      className="min-w-full min-h-[56px] rounded-2xl py-4 px-6 bg-loading-skeleton animate-pulse"
                    />
                  )}
                />
              )}
              {status === "error" && <p>Error</p>}
              {status === "success" && (
                <ListItems
                  items={catalogs.data}
                  render={(catalog) => (
                    <button
                      key={catalog.id}
                      onClick={() => setSelectedCatalogId(catalog.id)}
                      className={cn(
                        "relative w-full min-h-[140px] text-[18px] font-bold leading-[120%] flex  gap-2 rounded-2xl py-4 px-6 hover:bg-blue-lightBlue/80 transition duration-500",
                          selectedCatalogId === catalog.id &&
                          "border-[3px] border-primary-black-gray/70 text-primary-blue "
                      )}
                    >
                      {/*<Image*/}
                      {/*  src={imagePath(catalog.image)}*/}
                      {/*  alt={`${catalog.name} icon`}*/}
                      {/*  width={24}*/}
                      {/*  height={24}*/}
                      {/*/>*/}
                      {/*<span className="text-start text-balance">{catalog.name}</span>*/}
                      <Image
                          src={catalog.image}
                          alt="catalog"
                          fill
                          draggable={false}
                          className={cn("object-cover select-none rounded-2xl p-1 opacity-[80%] hover:opacity-[50%] transition duration-300",
                            selectedCatalogId === catalog.id && "opacity-100 ")}
                      />
                      <span className="absolute p-1 text-balance break-normal text-[18px] font-medium pointer-events-none"
                            style={{ color: '#'+catalog.text_color }}>
                        {catalog.name}
                      </span>
                    </button>
                  )}
                />
              )}
            </div>

            <CatalogDialogSubitems
              catalogId={selectedCatalogId}
              onClose={onClose}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
