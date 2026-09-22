// "use client";
//
// import { ListItems } from "@/components/ListItems";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
// } from "@/components/ui/carousel";
// //import { LoadingSpinner } from "@/components/ui/loading-spinner";
// import { ProductCard } from "@/features/products/components/ProductCard";
// import { createArray } from "@/utils/create-array";
// import { useFetchSimilarProductsCart } from "@/features/cart/older_cart/hooks/queries/useFetchSimilarProductsCart";
// import { useIsMounted } from "@/hooks/useIsMounted";
// // import { ChevronRight } from "lucide-react";
// // import Link from "next/link";
//
// export const BuyingTogetherProducts = () => {
//     // const { cart } = useCartStore();
//     const mounted = useIsMounted();
//     const { status, data: products } = useFetchSimilarProductsCart();
//
//     if(!products?.goods?.length && status !== "pending"){
//         return null
//     }
//
//     if(status === "error")
//     {
//         return <p className="text-red-500">Произошла ошибка при загрузке товаров.</p>;
//     }
//
//     if (mounted && !cart.length) return null;
//
//     return (
//         <div className="w-full flex flex-col xl:gap-10 md:gap-8 gap-6">
//             <header className=" w-full flex lg:flex-row flex-col lg:items-center lg:justify-between gap-y-2 lg:pr-0 pr-6">
//                 <div className=" md:w-fit w-full flex items-center md:justify-start justify-between gap-6 font-bold lg:text-[40px] text-[24px]">
//                     <p className=" text-black-100 leading-[100%]">Покупают вместе</p>
//                     <p className=" text-primary-gray leading-[100%]">
//                         {!!products?.goods?.length &&  products?.goods?.length}
//                     </p>
//                 </div>
//                 {/*<Link href="/discounted" className=" w-fit h-fit">*/}
//                 {/*  <button className="w-[159px] h-[36px] flex items-center gap-3 justify-center rounded-[200px] bg-white-500 text-primary-gray font-medium text-[16px] leading-[120%] ">*/}
//                 {/*    Смотреть все*/}
//                 {/*    <ChevronRight />*/}
//                 {/*  </button>*/}
//                 {/*</Link>*/}
//             </header>
//
//             <Carousel opts={{ align: "start" }}>
//                 <CarouselContent className=" h-full">
//                     {status === "pending" ? (
//                       <ListItems
//                           items={createArray(10)}
//                           render={(item) => (
//                             <CarouselItem
//                                 key={item}
//                                 className="2xl:min-w-[243px] 2xl:max-w-[243px] xl:min-w-[211px] xl:max-w-[211px] min-w-[240px] max-w-[240px] min-h-[400px] bg-loading-skeleton animate-pulse ml-4 p-0 rounded-2xl"
//                             />
//                           )}
//                       />
//                     ) : (
//                         <ListItems
//                             items={products?.goods || []}
//                             render={(good) => (
//                                 <CarouselItem
//                                     key={good.id}
//                                     className="2xl:min-w-[243px] 2xl:max-w-[243px] xl:min-w-[211px] xl:max-w-[211px] min-w-[240px] max-w-[240px] min-h-full ml-4 p-0"
//                                 >
//                                     <ProductCard product={good} />
//                                 </CarouselItem>
//                             )}
//                         />
//                     )}
//                 </CarouselContent>
//             </Carousel>
//         </div>
//     );
// };
