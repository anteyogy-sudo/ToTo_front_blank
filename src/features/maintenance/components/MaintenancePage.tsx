"use client";

import React from 'react';
import Ribbons from "../images/ribbons.png"
import Cat from '../images/Cat-Maintenance.png';
import CatBottom from '../images/Cat-LeftBottom.png';
import Logo from "../images/Logo.png";
import Image from 'next/image';
import QrCode from "@/assets/icons/qr.svg";
import Arrow from "../images/Arrow.png"

interface Props {
    redirect_mobile?: boolean;
}

const MaintenancePage = ({redirect_mobile}: Props) => {
    if (redirect_mobile) {
        return (
            <>
                <Image src={Ribbons} className="absolute object-cover select-none w-full" draggable="false" alt=''/>
                <Image src={CatBottom} className="absolute bottom-0 object-cover select-none w-[90%]" draggable="false" alt=''/>
                <div className="flex flex-col h-screen gap-3 py-24 px-8 w-full justify-center
                                bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#0094C4] via-[#005EA8] to-[#005CA7] select-none">
                    <div className="flex flex-col mx-auto justify-center items-center gap-5 z-20">
                        <div className="flex flex-col md:flex-row justify-center gap-3 1144:gap-12 items-center">
                            <div className="flex md:max-w-[70%] 1144:max-w-full font-bold flex-col items-center justify-center text-white-500
                            max-md:gap-2 text-[20px] md:text-[24px] 1144:text-[30px] text-center shrink-0 text-pretty select-text">
                                <p>Уважаемые покупатели!</p>
                                <p>На сайте ведутся технические работы</p>
                                <p>Приносим свои извинения за временные неудобства</p>
                                <p className={"mt-[30px] md:mt-[40px]"}>Вы можете заказать через приложение АптекаАнтей</p>
                            </div>
                            <div>
                                <Image src={QrCode} width={205} height={205} alt='QR code' className='max-md:w-[150px] md:w-[182px] 1144:w-[205px] bg-white-500 rounded-[8px]' />
                            </div>
                        </div>
                        <Image src={Arrow} width={202} alt='Arrow' className='select-none ml-[370px] 1144:ml-[600px] max-md:hidden' draggable="false"/>
                        <div className="flex justify-center shrink-0">
                            <Image src={Logo} height={100} className={"max-md:w-[90%] object-contain select-none"} draggable="false" alt=''/>
                        </div>
                    </div>
                </div>
            </>
        );
    }
    else return (
        <>
            <Image src={Ribbons} className="absolute object-cover select-none w-full" draggable="false" alt=''/>
            <div className="flex flex-col h-screen gap-3 py-24 px-8 z-20
                                bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#0094C4] via-[#005EA8] to-[#005CA7]">
                <div className={"relative flex-[1_1_0] min-h-0"}>
                    <Image src={Cat} fill priority className={"object-contain select-none"} draggable="false"
                           alt=''/>
                </div>
                <div className="flex font-bold flex-col items-center justify-center text-white-500 text-[20px] xs:text-[24px] max-md:gap-3 md:text-[28px] text-center shrink-0 text-balance">
                    <p>Уважаемые покупатели!</p>
                    <p>На сайте ведутся технические работы</p>
                    <p>Приносим свои извинения за временные неудобства</p>
                </div>
                <div className="flex justify-center shrink-0">
                    <Image src={Logo} height={100} className={"object-contain select-none"} draggable="false"
                           alt=''/>
                </div>
            </div>
        </>
    );
}

export default MaintenancePage;