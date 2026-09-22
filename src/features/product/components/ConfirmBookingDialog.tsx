// ToDo: Confirm Booking Dialog
// "use client";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
// } from "@/components/ui/dialog";
// import { useCartStore } from "@/features/cart/older_cart/stores/useCartStore";
// import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
// import { ProductProps } from "@/types/product.types";
// import { X } from "lucide-react";
// import Image from "next/image";
// import {useState, useTransition} from "react";
// import {v4} from "uuid";
// import {getCurrentDateISOWithOffset, getDatePlusDaysISOWithOffset} from "@/utils/get-current-date";
// import {useUserStore} from "@/stores/useUserStore";
// import {useAuthDialogStore} from "@/stores/useAuthDialogStore";
// import {useRouter} from "next/navigation";
// import {usePlaceAnOrderMutation} from "@/features/cart/older_cart/hooks/queries/usePlaceAnOrderMutation";
// import {LoadingSpinner} from "@/components/ui/loading-spinner";
// import Link from "next/link";
// import {toast} from "sonner";
//
//
// interface Props {
//   open: boolean;
//   onClose: () => void;
//   product: ProductProps;
//   stockProduct?: number;
//   price: number;
//   pharmacyId : number | null
// }
//
// // const TEST_PHARMACY_ID = 517770;
//
// const ConfirmBookingDialog = ({ open, onClose, product, stockProduct, price, pharmacyId }: Props) => {
//   const [total, setTotal] = useState<number>(product.min_price_in_city);
//   const { user } = useUserStore();
//   const { setIsOpenLoginDialog, setWithRedirect } = useAuthDialogStore();
//   const [isPending, startTransition] = useTransition();
//   const { cart, onToggleSelection, onAddToCart, onRemoveFromCart } = useCartStore();
//   const router = useRouter()
//   const { mutateAsync, status } = usePlaceAnOrderMutation();
//
//   useIsomorphicLayoutEffect(() => {
//     const handleCalculateTotal = () => {
//       const storedProduct = cart.find((item) => item.id === product.id);
//       if (!storedProduct) return;
//       const total = storedProduct.quantity * price;
//       setTotal(total);
//     };
//
//     handleCalculateTotal();
//   }, [cart, product]);
//
//   const specialPrice =
//       product.pr_type_sk === 0 && product.sum_skidka;
//
//   const salePercent =
//       product.pr_type_sk === 0 && product.proc_skidka;
//
//   const getPriceWithoutSale = () => {
//     const priceWithSale = product.min_price_in_city;
//     const discountPercent = product.proc_skidka;
//
//     if (!priceWithSale || !discountPercent) return priceWithSale;
//
//     const priceWithoutSale = priceWithSale / (1 - discountPercent / 100);
//     return Math.round(priceWithoutSale);
//   };
//
//   const getPriceWithoutSpelacPrice = () => {
//     if (product.min_price_in_city && product.sum_skidka) {
//       return product.min_price_in_city + product.sum_skidka;
//     }
//   };
//   useIsomorphicLayoutEffect(() => {
//     const run = async () => {
//
//       const cartProduct = cart.find((b) => b.id === product.id);
//       let quantity = cartProduct ? cartProduct.quantity : 1;
//
//       if(stockProduct && stockProduct < quantity){
//         onRemoveFromCart(product.id);
//
//         quantity = 1
//       }
//       if (quantity === 1 && open) {
//         onAddToCart(product.id);
//         await mutateAddCart({
//           good_id: product.id,
//           quantity: quantity,
//         });
//       }
//     };
//     if(open){
//       run();
//     }
//
//   }, [open]);
//
//   const handlePlaceAnOrder = () => {
//     setWithRedirect(false);
//
//     if (!user) {
//       setIsOpenLoginDialog(true);
//       return;
//     }
//       if(!pharmacyId){
//           return;
//       }
//
//     const generatedId = v4();
//     const currentDate = getCurrentDateISOWithOffset();
//     const reservedDate = getDatePlusDaysISOWithOffset(2);
//
//
//     const cartProduct = cart.find((b) => b.id === product.id )
//     const quantity = cartProduct ? cartProduct.quantity : 1;
//
//
//
//
//     const selectedProducts = [
//       {
//         orderId: generatedId,
//         qnt: quantity,
//         prcLoyal: price,
//         dtn: 0.0,
//         prc: price,
//         sky: product.id,
//         ts: currentDate,
//         rowId: "1",
//         nnt: product.code,
//         id_sk_antey: product.proc_skidka,
//         sum_sk_antey: product.sum_skidka,
//         pr_type_sk: product.pr_type_sk,
//         partia: product.id,
//       }
//     ]
//
//     startTransition(async () => {
//       await mutateAsync({
//         headers: [
//           {
//             orderId: generatedId,
//             num: generatedId,
//             ts: currentDate,
//             date: currentDate,
//             storeId: pharmacyId.toString(),
//             issuerId: pharmacyId.toString(),
//             unionId: "",
//             payType: "payment",
//             payTypeId: 0,
//             name: user.first_name ?? "",
//             mPhone: user.phone,
//             ae: 0,
//             dCard: user.loyalty_code,
//             src: "mysite",
//             delivery: false,
//           },
//         ],
//         rows: selectedProducts,
//         statuses: [
//           {
//             orderId: generatedId,
//             status: 100,
//             storeId: pharmacyId.toString(),
//             ts: currentDate,
//             date: currentDate,
//             rcDate: reservedDate,
//             statusId: "",
//           },
//         ],
//       }).then((data) => {
//         onToggleSelection(product.id, product);
//         if(!data?.data?.order_id){
//             toast.error("Произошла ошибка");
//         } else {
//             router.replace(`/successful-order?order_id=${data?.data?.order_id}`)
//         }
//
//       } );
//
//       setWithRedirect(true);
//     });
//   };
//
//   return (
//     <Dialog open={open} onOpenChange={onClose}>
//       <DialogContent className="lg:max-w-[520px] w-full p-0 relative" showX={false}>
//         <div className="max-w-[520px] w-full min-h-[473px] lg:py-6 lg-px-6  px-4 py-[44px] px-[24px] bg-white-500 flex flex-col lg:gap-6 gap-4 rounded-[16px]">
//           <div className="flex justify-between items-center">
//             <p className="font-bold lg:text-center text-start w-full lg:text-[24px] text-[24px] leading-[100%] text-black-100 ">
//               Подтвердите бронирование
//             </p>
//             <button
//               tabIndex={-1}
//               onClick={onClose}
//               className=" text-primary-gray absolute lg:right-[22px] right-[29px] lg:top-[26px] top-[49px] "
//             >
//               <X size={24} />
//             </button>
//           </div>
//
//             <div className='max-w-[389px] lg:block hidden w-full mx-auto w-full border-b border-[#C5C5C5]'>
//             </div>
//
//           <div className="flex lg:flex-row max-w-[389px] w-full mx-auto flex-col items-center lg:gap-4 gap-4">
//             <div className="w-full max-w-[155px]  aspect-square lg:px-6 px-4 relative">
//               {product?.images?.[0]?.url && (
//                 <Image
//                   src={product?.images?.[0]?.url}
//                   alt="product img"
//                   fill
//                   className=" w-full h-full object-contain"
//                 />
//               )}
//             </div>
//
//             <div className="flex flex-col gap-4 lg:max-w-[225px] w-full">
//               <p className="lg:text-start text-center font-medium leading-[120%] text-[18px] text-black-100 ">
//                 {product.name}
//               </p>
//                 <p className='font-medium text-[15px] md:mt-0 mt-[6px] lg:text-start text-center leading-[120%] text-primary-blue'>
//                     1 шт. - сегодня, через 15 минут
//                 </p>
//               {/*<div className="flex justify-between">*/}
//               {/*  <div className="flex gap-4">*/}
//               {/*    <span className="font-bold text-[20px] leading-[120%] text-black-100">*/}
//               {/*      {price} ₽*/}
//               {/*    </span>*/}
//               {/*    <span className="text-[20px] leading-[120%] text-primary-gray">*/}
//               {/*       {*/}
//               {/*           (!!specialPrice || !!salePercent) && (*/}
//               {/*               <span className=" md:text-[20px] text-[18px] leading-[120%] line-through text-primary-gray">*/}
//               {/*                  {specialPrice ? getPriceWithoutSpelacPrice() : getPriceWithoutSale()} ₽*/}
//               {/*               </span>*/}
//               {/*           )*/}
//               {/*       }*/}
//               {/*    </span>*/}
//               {/*  </div>*/}
//               {/*  <p className="font-bold text-[20px] leading-[120%] text-black-100">*/}
//               {/*    Итого: {total}₽*/}
//               {/*  </p>*/}
//               {/*</div>*/}
//
//                 <div className="md:hidden flex  justify-between max-w-[389px] mx-auto w-full">
//                     <div className="flex gap-4 items-center">
//                   <span className="font-bold md:text-[24px] text-[20px] leading-[120%] text-black-100">
//                     {price} ₽/шт.
//                   </span>
//                         <span className="text-[20px] leading-[120%] text-primary-gray">
//                      {
//                          (!!specialPrice || !!salePercent) && (
//                              <span className=" md:text-[20px] text-[18px] leading-[120%] line-through text-primary-gray">
//                                 {specialPrice ? getPriceWithoutSpelacPrice() : getPriceWithoutSale()} ₽
//                              </span>
//                          )
//                      }
//                   </span>
//                     </div>
//                     <p className="font-bold text-[20px] leading-[120%] text-black-100">
//                         Итого: {total}₽
//                     </p>
//                 </div>
//
//
//                 {/*<CartButton stockProduct={stockProduct} id={product.id} variant="reserve" />*/}
//             </div>
//           </div>
//
//             <div className="md:flex hidden  justify-between max-w-[389px] mx-auto w-full">
//                 <div className="flex gap-4 items-center">
//                   <span className="font-bold md:text-[24px] text-[20px] leading-[120%] text-black-100">
//                     {price} ₽/шт.
//                   </span>
//                     <span className="text-[20px] leading-[120%] text-primary-gray">
//                      {
//                          (!!specialPrice || !!salePercent) && (
//                              <span className=" md:text-[20px] text-[18px] leading-[120%] line-through text-primary-gray">
//                                 {specialPrice ? getPriceWithoutSpelacPrice() : getPriceWithoutSale()} ₽
//                              </span>
//                          )
//                      }
//                   </span>
//                 </div>
//                 <p className="font-bold text-[20px] leading-[120%] text-black-100">
//                     Итого: {total}₽
//                 </p>
//             </div>
//
//           <Button
//               onClick={handlePlaceAnOrder}
//               className="w-full min-h-[48px]  md:mt-0 mt-[13px] max-w-[389px] mx-auto w-full rounded-[16px] font-bold text-[18px] ">
//             {(isPending || status === "pending") && <LoadingSpinner />} Забронировать
//           </Button>
//
//           <p className="max-w-[389px] lg:mt-1 mt-2 w-full text-center mx-auto text-[14px] leading-[110%] text-black-700">
//               Нажимая кнопку “Оформить”, Вы соглашаетесь с{" "}
//             <Link href='/user-agreement' className="text-black-500">правилами сайта</Link>
//           </p>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };
//
// export default ConfirmBookingDialog;
