// ToDo: Successful Order
// "use client"
// import React from 'react';
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import { useSearchParams } from "next/navigation";
// import { useCartStore } from "@/features/cart/older_cart/stores/useCartStore";
// import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
// import { UseFetchActiveOrdersQuery } from "@/features/account/orders/hooks/queries/useFetchActiveOrdersQuery";
// import { formatDate } from "@/utils/formatDate";
// import {OrderBadge} from "@/features/account/orders/components/order-badge";
//
// const SkeletonBlock = ({ height = "h-[20px]", width = "w-full" }: { height?: string; width?: string }) => (
//     <div className={`rounded-[16px] bg-loading-skeleton animate-pulse ${height} ${width}`}></div>
// );
//
// const SuccessfulOrder = () => {
//     const searchParams = useSearchParams();
//     const orderId = searchParams.get("order_id");
//     const { onClearCart, cart } = useCartStore();
//     const { data, isLoading } = UseFetchActiveOrdersQuery();
//
//     const order = data?.data?.[0];
//
//     useIsomorphicLayoutEffect(() => {
//         const clearCartAndSync = async () => {
//             const ids = cart
//                 .filter((item) => item.id)
//                 .map((item) => ({ good_id: item.id }));
//
//             onClearCart();
//         };
//
//         clearCartAndSync();
//     }, []);
//
//     return (
//         <div className="w-full lg:py-10 py-6 2xl:px-20 lg:px-10 px-6 flex flex-col lg:gap-6 gap-6">
//             {isLoading || !order ? (
//                 <div className="flex flex-col gap-4">
//                     <SkeletonBlock height="h-[40px]" width="w-[250px]" />
//                     <SkeletonBlock height="h-[20px]" width="w-[300px]" />
//                     <SkeletonBlock height="h-[20px]" width="w-[300px]" />
//                     <SkeletonBlock height="h-[50px]" width="w-[220px]" />
//                 </div>
//             ) : (
//                 <>
//                     <div>
//                         <div className=' lg:flex justify-between hidden '>
//                             <div className='flex gap-6'>
//                                 <p className='font-bold lg:text-[40px] text-[32px] text-black-100 lg:leading-[100%] leading-[120%]'>
//                                     Заказ №{orderId}
//                                 </p>
//                                 {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
//                                 {/* @ts-expect-error */}
//                                 <OrderBadge variant={String(order.status)} device="desktop" />
//                             </div>
//                             <p>
//                                 {formatDate(order.created)}
//                             </p>
//                         </div>
//
//                         <div>
//                             <p className='lg:hidden block font-bold lg:text-[40px] text-[32px] text-black-100 lg:leading-[100%] leading-[120%]'>Заказ {orderId} создан</p>
//                         </div>
//
//
//
//                         <p className='lg:text-[18px] text-[16px] lg:mt-10 mt-6 leading-[120%]'>
//                             Самовывоз <span className='font-bold'>{formatDate(order.storeUntil)}</span>
//                         </p>
//                         <p className='font-bold text-[18px] mt-2 leading-[120%] text-black-100'>
//                             Адрес: {order.store?.address}
//                         </p>
//                     </div>
//
//                     <p className='lg:text-[18px] text-[16px] text-primary-black-gray'>
//                         Отслеживайте статус выполнения заказа в личном кабинете
//                     </p>
//                     <p className='lg:text-[18px] text-[16px] text-primary-black-gray'>
//                         Вы можете сделать скриншот этого экрана, <br /> чтобы не потерять номер заказа
//                     </p>
//
//                     <Link href='/account/orders'>
//                         <Button
//                             className="max-w-[317px] w-full h-[62px] disabled:bg-blue-lightBlue shadow-none disabled:text-blue-light-gray rounded-2xl font-bold text-[18px]"
//                         >
//                             Перейти в мои заказы
//                         </Button>
//                     </Link>
//                 </>
//             )}
//         </div>
//     );
// };
//
// export default SuccessfulOrder;
