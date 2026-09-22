// "use client";
//
// import { Checkbox } from "@/components/ui/checkbox";
// import { Input } from "@/components/ui/input";
// import { Separator } from "@/components/ui/separator";
// import { Slider } from "@/components/ui/slider";
// import { ArrowSVG } from "@/icons/arrow";
// import { BlueOutlinedBonus } from "@/icons/blue-outlined-bonus";
// import { PlaceAnOrderButton } from "./PlaceAnOrderButton";
//
// export const PlaceAnOrder = () => {
//   // const { selectedIds, totalCost, withoutSaleCost, bonusTotal } = useCartStore();
//
//   return (
//     <div className=" w-full 2xl:min-w-[400px] 2xl:max-w-[400px] xl:min-w-[376px] xl:max-w-[376px] h-fit rounded-2xl bg-white-500 p-6 shadow-sm flex flex-col gap-6">
//       <p className=" font-bold text-[20px] leading-[120%]">Ваш заказ</p>
//       {/*<div className=" w-full flex flex-col gap-2">*/}
//       {/*  <label*/}
//       {/*    htmlFor="promocode"*/}
//       {/*    className=" w-fit text-sm font-medium leading-[110%] text-black-100/40"*/}
//       {/*  >*/}
//       {/*    Промокод*/}
//       {/*  </label>*/}
//       {/*  <div className=" h-[62px] w-full rounded-2xl flex items-center justify-between gap-2.5 px-4 bg-primary-light-white">*/}
//       {/*    <Input*/}
//       {/*      id="promocode"*/}
//       {/*      className=" h-full w-full border-none focus-visible:ring-0 p-0 placeholder:text-black-100/20 text-[18px]"*/}
//       {/*      placeholder="Сначала выберите аптеку"*/}
//       {/*    />*/}
//       {/*    <button className=" min-w-10 h-10 aspect-square rounded-[8px] flex items-center justify-center bg-[#12121208] text-black-100/40">*/}
//       {/*      <ArrowSVG />*/}
//       {/*    </button>*/}
//       {/*  </div>*/}
//       {/*</div>*/}
//
//       <div className=" w-full flex flex-col gap-4">
//         <div className=" w-full flex items-center justify-between">
//           <p className=" md:text-[18px] leading-[120%] text-primary-black-gray">
//             Выбрано товаров
//           </p>
//           <span className=" md:text-[18px] leading-[120%] font-bold">
//             {selectedIds.length}
//           </span>
//         </div>
//         <div className=" w-full flex items-center justify-between">
//           <p className=" md:text-[18px] leading-[120%] text-primary-black-gray">
//             Общая стоимость
//           </p>
//           <span className=" md:text-[18px] leading-[120%] font-bold">
//             {withoutSaleCost} ₽
//           </span>
//         </div>
//         <div className=" w-full flex items-center justify-between">
//           <p className=" md:text-[18px] leading-[120%] text-primary-blue">
//             Скидка
//           </p>
//           <span className=" md:text-[18px] leading-[120%] font-bold text-primary-blue">
//             {withoutSaleCost - totalCost} ₽
//           </span>
//         </div>
//         <div className=" w-full flex items-center justify-between">
//           <p className=" md:text-[18px] leading-[120%] text-primary-black-gray">
//             Бонусов за покупку
//           </p>
//           <div className=" w-fit flex items-center gap-1">
//             <BlueOutlinedBonus />
//             <span className=" md:text-[18px] leading-[120%] font-bold">{bonusTotal || 0}</span>
//           </div>
//         </div>
//         {/*<div className=" w-full flex flex-col gap-2">*/}
//         {/*  <div className=" w-full flex items-center gap-2">*/}
//         {/*    <Checkbox id="bonus" />*/}
//         {/*    <label*/}
//         {/*      htmlFor="bonus"*/}
//         {/*      className=" md:text-[18px] leading-[120%] text-primary-black-gray cursor-pointer select-none"*/}
//         {/*    >*/}
//         {/*      Списать бонусы (394)*/}
//         {/*    </label>*/}
//         {/*  </div>*/}
//
//         {/*  <div className=" w-full h-4 flex items-center">*/}
//         {/*    <Slider className=" h-[2px] bg-primary-gray" />*/}
//         {/*  </div>*/}
//         {/*</div>*/}
//       </div>
//
//       <Separator />
//
//       <div className=" w-full flex items-center justify-between">
//         <p className=" md:text-[24px] text-[20px] font-bold leading-[100%]">
//           Итого
//         </p>
//         <span className=" md:text-[24px] text-[20px] font-bold leading-[100%]">
//           {totalCost} ₽
//         </span>
//       </div>
//
//       <PlaceAnOrderButton />
//     </div>
//   );
// };
