// "use client";
//
// import { useCartStore } from "@/stores/useCartStore";
// import {useEffect, useMemo, useState} from "react";
//
// import {OutOfStocksProps, ProductProps} from "@/types/cart.types";
//
// interface Props {
//     product: ProductProps | OutOfStocksProps;
// }
//
// export const CartUndoButton = ({ product }: Props) => {
//     const [progress, setProgress] = useState(100);
//
//     const pending = useCartStore(
//         s => s.pendingDeletes[product.id]
//     );
//
//     useEffect(() => {
//         if (!pending) {
//             setProgress(0);
//             return;
//         }
//
//         const startTimeAAAAAAAAAAAAAAAA = pending.expiresAt - 5000;
//
//         const interval = setInterval(() => {
//             const remaining =
//                 Date.now() - startTime;
//
//             if ((remaining / 5000 * 100) >= 100) {
//                 clearInterval(interval);
//             }
//
//             setProgress(
//                 Math.min(100, Math.round(remaining / 5000 * 100))
//             );
//
//         }, 50);
//
//         return () => clearInterval(interval);
//
//     }, [pending]);
//
//
//     // const undoPendingDelete = useCartStore(state => state.undo);
//     const changeAmount = useCartStore(state => state.changeAmount);
//
//     const handleUndoRemove = () => {
//         undoPendingDelete(product.id);
//         if (product.required === 0) {
//             changeAmount(product.id, +1);
//             product.required++;
//         }
//     };
//
//     const backgroundStyle = useMemo(() => {
//         if (!pending || progress >= 100) {
//             return {};
//         }
//         const buttonColor = 'hsl(var(--brand-strong))';
//         const progressColor = 'rgba(0,92,167)';
//         // Серый rgb(247 247 247) --- rgba(220,220,220,0.78)
//         // Синий #0074b4 --- #063c71
//
//         return {
//             backgroundImage: `linear-gradient(to right, ${progressColor} ${progress}%, ${buttonColor} ${progress}%)`,
//             backgroundColor: buttonColor,
//         };
//     }, [progress, pending]);
//
//     return (
//         <button
//             className={`relative w-full md:py-[12px] px-[9px] py-[8px] rounded-[16px] md:text-[15px] text-[13px] text-primary-light-white font-bold transition-none ${
//                 pending ? 'bg-primary-blue' : 'bg-primary-blue'
//             }`}
//             style={backgroundStyle}
//             onClick={handleUndoRemove}
//             disabled={progress <= 0}
//         >
//             <span>Вернуть</span>
//         </button>
//     );
// };