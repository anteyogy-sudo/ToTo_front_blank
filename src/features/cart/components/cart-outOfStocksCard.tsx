// import NoPhoto from "@/assets/icons/NoPhoto.svg";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Separator } from "@/components/ui/separator";
// import { useCartStore } from "@/stores/useCartStore";
// import { TrashSVG } from "@/icons/trash";
// import { OutOfStocksProps } from "@/types/cart.types";
// import { Minus, Plus } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import React, { useMemo } from "react";
// import HowToOrderButton from "@/features/cart/components/how-to-order-button";
// import {CartUndoButton} from "@/features/cart/components/cart-UndoButton";
//
// interface Props {
//     product: OutOfStocksProps;
// }
//
// export const OutOfStocksCard = ({ product } : Props) => {
//     const { changeAmount } = useCartStore();
//
//     const image = product.images?.[0] ?? NoPhoto;
//
//     const pendingDelete = useCartStore(s => s.pendingDeletes[product.id]);
//     const currentAmount = useMemo(() => product.required, [product.required]);
//
//     // ToDo: Когда буду делать комплекты, то избавлюсь от ошибки
//     const handleRemove = () => {
//         changeAmount(product.id, -product.required);
//         product.required = 0;
//     };
//
//     const isRemoved = !!pendingDelete;
//
//     const handleDecrement = () => {
//         changeAmount(product.id, -1);
//         product.required--;
//     };
//
//     const handleIncrement = () => {
//         changeAmount(product.id, +1);
//         product.required++;
//     };
//
//     return (
//         <>
//             <div className=" w-full flex md:items-center md:justify-between md:gap-10 relative">
//                 <div className=" w-full h-fit flex md:flex-row flex-col md:items-center md:justify-between gap-6">
//                     <div className=" w-fit flex md:flex-row flex-col md:items-center gap-4">
//                         <div className=" w-fit flex items-center gap-2">
//                             <Link
//                                 href={`/product/${product.id}`}
//                                 className=" w-[94px] h-16 relative"
//                             >
//                                 <Image
//                                     src={image}
//                                     alt={product.name}
//                                     fill
//                                     sizes="60px"
//                                     className="object-contain object-center"
//                                 />
//                             </Link>
//                         </div>
//                         <div className=" w-fit h-fit flex items-center gap-2">
//                             <Checkbox
//                                 //checked={selectedIds.includes(product.id)}
//                                 //onCheckedChange={handleToggleSelection}
//                                 className=" md:hidden"
//                             />
//                             <Link href={`/product/${product.id}`}
//                                   className=" md:text-[18px] w-full leading-[120%]"
//                             >
//                                 {product.name}
//                             </Link>
//                         </div>
//                     </div>
//
//                     { !isRemoved && (
//                         <div className=" md:w-fit w-full flex items-center md:justify-normal justify-between gap-4">
//                             {
//                                 (product.id) && (
//                                     <div className=" w-fit grid grid-cols-[40px_40px_40px] items-center gap-4">
//                                         <button type="button"
//                                                 onClick={handleDecrement}
//                                                 className=" md:h-10 md:w-10 w-8 h-8 flex items-center justify-center rounded-[8px] bg-primary-light-white disabled:text-black-100/10 text-primary-gray">
//                                             <Minus className="md:w-6 w-5" />
//                                         </button>
//                                         <span className=" w-full flex items-center justify-center font-medium leading-[120%] whitespace-nowrap">
//                                             {currentAmount} шт
//                                         </span>
//                                         <button type="button"
//                                                 onClick={handleIncrement}
//                                                 className=" md:h-10 md:w-10 w-8 h-8 flex items-center justify-center rounded-[8px] bg-primary-light-white text-primary-gray">
//                                             <Plus className=" md:w-6 w-5" />
//                                         </button>
//                                     </div>
//                                 )
//                             }
//
//                             <span className="font-medium w-fit md:w-[112px]  text-[16px] leading-[120%] text-primary-red">
//                                 Нет в наличии
//                             </span>
//
//                             <div className="w-[120px]">
//                                 <HowToOrderButton /></div>
//                         </div>
//                     )}
//                 </div>
//                 { !isRemoved ? (
//                     <button
//                         type="button"
//                         onClick={handleRemove}
//                         className=" h-fit w-fit md:static absolute top-0 right-0 z-10 text-primary-gray"
//                     >
//                         <TrashSVG />
//                     </button>
//                 ) : (
//                     <div className="col-start-4 col-end-6 justify-end">
//                         <CartUndoButton product={product} />
//                     </div>
//                 )}
//             </div>
//             <Separator className=" last:hidden" />
//         </>
//     );
// };