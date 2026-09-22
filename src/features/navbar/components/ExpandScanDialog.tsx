import React from 'react';
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import Image from "next/image";
import CardBg from '@/assets/resources/CardBg.svg'
import Link from "next/link";
import card from "@/assets/resources/card.svg";
import {useUserStore} from "@/stores/useUserStore";
import Barcode from "react-barcode";
import {X} from "lucide-react";

interface Props {
    open: boolean;
    onClose: () => void;
}

const ExpandScanDialog = ({ open, onClose }: Props) => {
    const { user } = useUserStore();

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-[558px] sm:h-[508px] h-[273px] w-full p-0 m-0 border-none overflow-hidden" showX={false}>
                <DialogHeader className=" hidden">
                    <DialogTitle>Title</DialogTitle>
                    <DialogDescription>Description</DialogDescription>
                </DialogHeader>
                <div className="w-full h-full relative">
                    <Image src={CardBg} alt='' className='w-full scale-[1.16] h-full object-cover absolute' fill/>

                    <button onClick={onClose}>
                        <X strokeWidth='1px' strokeLinecap="round" strokeLinejoin="round"
                           className='text-[#8E9AAB] absolute z-10 sm:right-[30px] sm:top-[28px] top-[12px] right-[18px] sm:size-[42px] size-[24px]'/>
                    </button>
                    <div className='absolute top-0 w-full h-full z-1'>
                        { user?.loyalty_code && (
                            <div className='relative sm:p-[74px] p-[34px] flex justify-center'>
                                <Image src={card} alt="card image" width={582} height={328} draggable={false}
                                       className=" sm:w-[409px] sm:h-[230px] w-[257px] h-[144px] select-none" priority
                                />
                                <Barcode
                                    value={user.loyalty_code}
                                    format="CODE128"
                                    height={55}
                                    width={2.5}
                                    fontOptions="600"
                                    textMargin={4}
                                    margin={0}
                                    displayValue={false}
                                    className="absolute bottom-[58px] sm:bottom-[128px] sm:max-w-[310px] max-w-[200px]"
                                />
                            </div>
                        )}
                        <p className='absolute sm:bottom-[151px] bottom-[64px] text-center max-w-[310px] w-full left-1/2 transform -translate-x-1/2 font-normal sm:text-[24px] text-[18px] leading-[100%] text-black-100'>
                            Номер карты: <span className='font-medium'>{user?.loyalty_code}</span>
                        </p>
                        <div className='flex justify-center items-center absolute bottom-0 w-full sm:h-[100px] h-[44px] bg-white-500 z-10'>
                            <Link href='/account/card' onClick={onClose} className='font-medium sm:text-[22px] text-[16px] text-black-100 leading-[100%]'>
                                Подробнее о карте
                            </Link>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ExpandScanDialog;
