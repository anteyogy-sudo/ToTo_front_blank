import { SlicedProductsLoadingSkeleton } from "@/features/products/components/SlicedProductsLoadingSkeleton";
import { ListItems } from "@/components/ListItems";
import { ProductCard } from "@/features/products/components/ProductCard";
// import { useFetchGoodDaysIdsQuery2 } from "@/features/goods-day/hooks/queries/useFetchGoodDaysQuery";
import { useFetchGoodDaysIdsQuery } from "@/features/products/hooks/queries/useFetchGoodDaysIdsQuery";

interface Props {
  skeletonCount: number;
}

export const DisplayGoodsDay = ({ skeletonCount }: Props) => {
  const { data: products, status } = useFetchGoodDaysIdsQuery();

  console.log("--------- Display Goods Day: ", products);

  return (
    <div className=" w-full flex flex-col gap-6 md:mt-10 mt-1 ">
      <p className=" lg:text-[56px] text-[32px] font-bold leading-[100%] md:bp-10 pb-6 ">
        Товары дня
      </p>
      {status === "pending" ? (
        <SlicedProductsLoadingSkeleton
          length={10}
          columns={skeletonCount}
        />
      ) : status === "error" ? (
        <p>Error</p>
      ) : (
        <>
          <div
            className=" w-full h-fit grid  gap-4"
            style={{
              gridTemplateColumns: `repeat(${skeletonCount}, minmax(0, 1fr))`,
            }}
          >
            <ListItems
              items={ products.data }
              render={(item) => <ProductCard key={item.id} product={item} cartVariant="reserve"/>}
            />
          </div>
        </>
      )}
    </div>
  );
};
