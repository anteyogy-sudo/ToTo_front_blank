// ToDo: Pharmacy Card List Item
// import React, {useState} from 'react';
// import Image from "next/image";
// import AnteyLogo from "@/assets/resources/product/PharmacyAnteyLogo.svg";
// import {formatPhone} from "@/utils/formatPhone";
// import {groupSchedule} from "@/utils/scheduleTime";
// import {StockProps} from "@/types/stock.types";
// import ConfirmBookingDialog from "@/features/product/components/ConfirmBookingDialog";
// import {ProductProps} from "@/types/product.types";
//
// const PharmacyCardListItem = ({item, product} : {item : StockProps, product : ProductProps}) => {
//
//     const [isOpenConfirmDialog, setIsOpenConfirmDialog] = useState<boolean>(false);
//     const openConfirmDialog = () => {
//
//         setIsOpenConfirmDialog(true);
//     };
//
//     const closeConfirmDialog = () => {
//         setIsOpenConfirmDialog(false);
//     };
//
//     return (
//        <>
//            <div
//                key={item.pharmacy_id}
//                className='rounded-[16px] px-[36px] py-[25px] bg-white-500 flex justify-between items-center '
//            >
//                <p className="font-bold w-full max-w-[276px] text-black-100 lg:text-[24px] text-[18px] lg:leading-[100%] leading-[120%] ">
//                    <p className='flex gap-1'>Аптека вивАнтей  <Image src={AnteyLogo} alt='logo'/></p>
//                    <p>{item.pharmacy.address} </p>
//                </p>
//
//                <div className='flex flex-col gap-2'>
//                    <p className='font-bold text-black-100 text-[16px] leading-[100%]'>Контакты: </p>
//                    <p className='text-black-100 font-medium text-[16px] leading-[100%]'>{formatPhone(item.pharmacy.phone)}</p>
//                </div>
//
//                <div className='flex max-w-[142px] flex-col gap-2'>
//                    <p className='font-bold text-black-100 text-[16px] leading-[100%]'>Время работы:  </p>
//                    <p className='text-black-100 font-medium break-all text-[16px] leading-[100%]'>{groupSchedule(item.pharmacy.schedule)}</p>
//                </div>
//
//                <p className='font-bold text-[16px] leading-[100%] text-black-100'>{Number(item.quantity_in_stock)} шт </p>
//
//                <p className='font-bold text-[24px] leading-[100%] text-black-100'>{item.website_price} ₽</p>
//
//                <button onClick={openConfirmDialog} className='bg-primary-blue rounded-[16px] w-[219px]  h-[49px] flex justify-center items-center text-white-500 etxt-bold text-[14px] leading-[120%] '>
//                    Купить в 1 клик
//                </button>
//
//
//            </div>
//
//            {/* ToDo: Confirm Booking Dialog */}
//            {/*{!!item && isOpenConfirmDialog  && (*/}
//            {/*    <ConfirmBookingDialog*/}
//            {/*        onClose={closeConfirmDialog}*/}
//            {/*        open={isOpenConfirmDialog}*/}
//            {/*        product={product}*/}
//            {/*        stockProduct={Number(item.quantity_in_stock)}*/}
//            {/*        price={item.website_price}*/}
//            {/*        pharmacyId={item.pharmacy.id}*/}
//            {/*    />*/}
//            {/*)}*/}
//        </>
//     );
// };
//
// export default PharmacyCardListItem;
