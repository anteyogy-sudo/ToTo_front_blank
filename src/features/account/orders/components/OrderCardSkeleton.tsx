import { ListItems } from "@/components/ListItems";
import { createArray } from "@/utils/create-array";

export const OrderCardSkeleton = () => {
  return (
    <div className=" w-full flex flex-col gap-6">
      <div className=" w-full flex flex-col gap-4">
        <div className=" w-full flex 1144:flex-row flex-col 1144:items-center 1144:justify-between gap-y-3">
          <div className=" w-full flex items-center gap-4">
            <div className=" w-full max-w-72 1144:h-8 h-6 bg-loading-skeleton animate-pulse rounded-md" />
            <div className=" 1144:inline-block hidden w-24 h-10 rounded-full bg-loading-skeleton animate-pulse" />
          </div>
          <div className=" 1144:w-fit w-full flex items-center justify-between">
            <div className=" 1144:hidden w-24 h-10 rounded-full bg-loading-skeleton animate-pulse"></div>
            <div className=" w-24 h-4 bg-loading-skeleton animate-pulse rounded-md" />
          </div>
        </div>
        <div className=" w-full max-w-md 1144:h-[18px] h-4 bg-loading-skeleton animate-pulse rounded-md" />
      </div>

      <div className=" w-full flex flex-col gap-2">
        <ListItems
          items={createArray(3)}
          render={(item) => (
            <div key={item} className=" w-full h-fit flex items-center gap-6">
              <div className=" w-[96px] h-[68px] bg-loading-skeleton animate-pulse rounded-2xl" />
              {item === 0 ? (
                <div className=" w-full max-w-3xl h-6 bg-loading-skeleton animate-pulse rounded-md" />
              ) : item === 1 ? (
                <div className=" w-full max-w-xl h-6 bg-loading-skeleton animate-pulse rounded-md" />
              ) : (
                <div className=" w-full max-w-2xl h-6 bg-loading-skeleton animate-pulse rounded-md" />
              )}
            </div>
          )}
        />
      </div>

      <div className=" w-44 h-8 bg-loading-skeleton animate-pulse rounded-md" />
    </div>
  );
};
