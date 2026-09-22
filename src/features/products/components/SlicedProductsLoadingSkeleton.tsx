import { ListItems } from "@/components/ListItems";
import { createArray } from "@/utils/create-array";

interface Props {
  length: number;
  columns: number;
}

export const SlicedProductsLoadingSkeleton = ({ length, columns }: Props) => {
  return (
    <div
      className=" w-full h-fit grid gap-4"
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
    >
      <ListItems
        items={createArray(length)}
        render={(item) => (
          <div
            key={item}
            className=" w-full h-[370px] bg-loading-skeleton animate-pulse rounded-2xl"
          />
        )}
      />
    </div>
  );
};
