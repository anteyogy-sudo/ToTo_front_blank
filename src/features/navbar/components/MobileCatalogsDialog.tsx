"use client";

import CatalogMobileicon from "@/assets/icons/CatalogMobile.svg";
// import { ErrorBoundaryWrapper } from "@/components/ErrorBoundaryWrapper";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
import Image from "next/image";
// import { useMemo, useState } from "react";
// import { DisplayMobileCatalogs } from "./DisplayMobileCatalogs";
// import { useRouter, useSearchParams } from "next/navigation";
// import { ArrowLeft } from "lucide-react";
import {useMobileMenuStore} from "@/features/navbar/stores/useMobileMenuStore";
// import MobileNewCatalog from "@/features/navbar/components/MobileNewCatalog";

export const MobileCatalogsDialog = () => {
  // const [open, setOpen] = useState<boolean>(false);
    const { openCatalog, setOpenCatalog } = useMobileMenuStore();
  // const searchParams = useSearchParams();
  // const router = useRouter();
  // const catalogId = searchParams.get("catalog");
  // const catalogTitle = searchParams.get("title");

  // const hasCatalog = useMemo(() => {
  //   return !!catalogId && !!catalogTitle;
  // }, [catalogId, catalogTitle]);

  // const onBack = () => {
  //   const params = new URLSearchParams(searchParams.toString());
  //   params.delete("catalog");
  //   params.delete("title");
  //   router.push(`?${params.toString()}`);
  // };

  return (
    <>
      <div
        onClick={() => setOpenCatalog(!openCatalog)}
        className="cursor-pointer w-fit flex flex-col items-center text-center"
      >
        <Image
          src={CatalogMobileicon}
          alt="bonus"
          width={32}
          height={32}
          priority
        />
        <span className=" text-sm text-primary-gray font-medium">Каталог</span>
      </div>

      {/*<Dialog open={open} onOpenChange={setOpen}>*/}
      {/*  <DialogContent>*/}
      {/*    <DialogHeader>*/}
      {/*      <div className=" w-fit h-fit flex items-center gap-2">*/}
      {/*        {!!hasCatalog && (*/}
      {/*          <button type="button" onClick={onBack}>*/}
      {/*            <ArrowLeft size={20} />*/}
      {/*          </button>*/}
      {/*        )}*/}
      {/*        <DialogTitle>{hasCatalog ? catalogTitle : "Каталог"}</DialogTitle>*/}
      {/*      </div>*/}
      {/*      <DialogDescription className="hidden" hidden>*/}
      {/*        Description*/}
      {/*      </DialogDescription>*/}
      {/*    </DialogHeader>*/}
      {/*    {open && (*/}
      {/*      <ErrorBoundaryWrapper*/}
      {/*        fallbackRender={() => (*/}
      {/*          <div className=" w-full h-full p-4 bg-red-200 text-destructive flex items-center justify-center">*/}
      {/*            Произошла ошибка*/}
      {/*          </div>*/}
      {/*        )}*/}
      {/*      >*/}
      {/*        <DisplayMobileCatalogs onClose={() => setOpen(false)} />*/}
      {/*      </ErrorBoundaryWrapper>*/}
      {/*    )}*/}
      {/*  </DialogContent>*/}
      {/*</Dialog>*/}


    </>
  );
};
