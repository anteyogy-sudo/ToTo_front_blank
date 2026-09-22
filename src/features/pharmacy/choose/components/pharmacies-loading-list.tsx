import { ListItems } from "@/components/ListItems";
import { cn } from "@/lib/utils";
import { createArray } from "@/utils/create-array";

interface Props {
  className?: string;
}

export const PharmaciesLoadingList = ({ className }: Props) => {
  return (
    <div
      className={cn(
        " w-full h-full lg:min-w-[360px] lg:max-w-[360px] lg:p-0 p-6 pt-0 flex flex-col gap-4",
        className
      )}
    >
      {/*<Suspense>*/}
      {/*    <SearchBar className="lg:flex hidden" />*/}
      {/*</Suspense>*/}
      <div className=" w-full h-full overflow-y-auto flex flex-col gap-6 rounded-2xl">
        <ListItems
          items={createArray(10)}
          render={(item) => (
            <div key={item} className=" w-full h-fit flex flex-col gap-4">
              <div className=" w-full flex flex-col gap-2">
                <div className=" w-full h-10 rounded-md bg-loading-skeleton animate-pulse"></div>
                <div className=" w-3/4 h-10 rounded-md bg-loading-skeleton animate-pulse"></div>
              </div>
              <div className=" w-full flex flex-col gap-2">
                <div className=" w-full h-6 rounded-sm bg-loading-skeleton animate-pulse"></div>
                <div className=" w-3/4 h-6 rounded-sm bg-loading-skeleton animate-pulse"></div>
                <div className=" w-1/2 h-6 rounded-sm bg-loading-skeleton animate-pulse"></div>
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
};
