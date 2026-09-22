import React, {FC, useRef} from 'react';
import Coupon from '@/assets/icons/Coupon.svg'
import Profile from '@/assets/icons/ProfileMiniIcon.svg'
import CardImg from '@/assets/resources/card-img.svg'
import Image from "next/image";
import Link from "next/link";
import {X} from "lucide-react";
import {useIsomorphicLayoutEffect} from "@/hooks/useIsomorphicLayoutEffect";
import {useUserStore} from "@/stores/useUserStore";
import card from "@/assets/resources/card.svg";
import Barcode from "react-barcode";
import { useAuthDialogStore } from "@/stores/useAuthDialogStore";
import { ensureAccessTokenCookie } from "@/utils/access-token";


interface CartPopupProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    openExpand: () => void;
}

const CartPopup: FC<CartPopupProps> = ({ open, setOpen, openExpand }) => {
    const { setIsOpenLoginDialog } = useAuthDialogStore();
    const { user, token } = useUserStore();

    const popupRef = useRef<HTMLDivElement>(null);
    const handleClickOutside = (event: MouseEvent) => {
        if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
            setOpen(false);
        }
    };

    const openLoginModal = () => {
        setIsOpenLoginDialog(true);
        setOpen(false);
    }

    useIsomorphicLayoutEffect(() => {
        if (!open) return;

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [open]);

    function ClosePopUp () {
        setOpen(false)
    }

    function handleButtonExpand() {
        if (user) {
            openExpand()
            ClosePopUp()
        } else {
            openLoginModal();
        }
    }

    function handleAccountNavigation(event: React.MouseEvent<HTMLAnchorElement>) {
        if (!ensureAccessTokenCookie(token)) {
            event.preventDefault();
            openLoginModal();
            return;
        }
        ClosePopUp();
    }

    if(!open){
        return null;
    }

    return (
        <div ref={popupRef} className='absolute z-[60] flex justify-between rounded-[16px] bg-white-500 border-[1px] border-[#DCDCDC]
        right-1/2 translate-x-1/2 top-[64px] px-[34px] py-[33px] max-w-[774px] w-[calc(100%-44px)] min-h-[382px] pr-[34px]
        lg:translate-x-0 lg:pr-[64px] lg:right-[12px] lg:p-10 lg:w-full lg:h-fit lg:top-[115px] md:top-[145px]'>
            <button className=" w-fit h-fit absolute md:right-[39px] right-[23px] md:top-[33px] top-[21px] z-20" onClick={ClosePopUp}>
                <X size={24} className=" text-primary-gray hover:text-primary-blue transition-colors duration-300" />
            </button>

            <div className='w-[241px] h-[312px] md:flex hidden flex-col gap-4 border-r-[1px] border-priamry-gray select-none'>
                <button className='w-full max-w-[220px] h-[56px] pl-6 rounded-[16px] font-bold text-[18px]
                flex items-center gap-2 text-primary-blue bg-blue-lightBlue'>
                    <Image src={Coupon} alt='Coupon'/>  Карта Антей +
                </button>

                {user ? (
                    <Link href="/account" onClick={handleAccountNavigation}
                          className='w-full max-w-[220px] h-[56px] pl-6 rounded-[16px] font-bold text-[18px] flex items-center
                          gap-2 text-black-100 hover:text-primary-blue hover:bg-blue-lightBlue transition-colors duration-300'>
                        Мои данные
                    </Link>
                ) : (
                    <button onClick={openLoginModal}
                            className='w-full max-w-[220px] h-[56px] pl-6 rounded-[16px] font-bold text-[18px] flex items-center
                            gap-2 text-black-100 hover:text-primary-blue hover:bg-blue-lightBlue transition-colors duration-300'>
                        Мои данные
                    </button>
                )}
            </div>

            <div className='w-full md:w-[400px]'>
                <div className='flex select-none'>
                    <div className='flex flex-col gap-6'>
                        <p className='font-bold md:text-[32px] min-w-[163px] text-[26px] leading-[100%] text-black-100'>Карта Антей+</p>
                        <p className='font-normal text-[18px] min-w-[176px] leading-[120%] text-black-100'> {user ? "Ваша бонусная карта" : "Получить бонусную карту"} </p>
                    </div>
                    { user && (
                        <Image src={CardImg}
                               alt='Card image'
                               className='lg:mt-[-20px] lg:scale-125 scale-[1.5] mt-1 w-full max-md:hidden select-none'
                               draggable={false}
                        />
                    )}
                </div>

                <div className='mt-[18px] select-none'>
                    { user ? (
                        <Barcode
                            value={user.loyalty_code}
                            format="CODE128"
                            height={55}
                            width={2.5}
                            fontOptions="600"
                            textMargin={4}
                            margin={0}
                            displayValue={false}
                            className="w-full"
                        />
                    ) : (
                        <div className='max-w-[247px] min-h-[156px] relative '>
                            <Image src={card} alt="card image" width={247} height={156}
                                   className=" w-full h-full object-contain select-none"
                                   draggable={false}
                                   priority
                            />
                        </div>
                    )}
                </div>

                { user && (
                    <div className='md:mt-[35px] mt-[20px]'>
                        <p className='md:text-[24px] text-[20px] leading-[100%] text-black-100'>
                            <span className="select-none">Номер карты: </span>
                            <span className='font-bold select-text'>
                                {user?.loyalty_code}
                            </span>
                        </p>
                    </div>
                )}

                <button onClick={handleButtonExpand}
                        className='text-[18px] w-full h-[48px] border-[1px] border-primary-blue text-primary-blue
                        bg-blue-light flex items-center justify-center rounded-[16px] mt-[30px]
                        hover:scale-[102%] transition-transform duration-300 select-none'>
                    { user ? (
                        "Развернуть для сканирования"
                    ) : (
                        "Зарегистрироваться в бонусной программе"
                    )}
                </button>

                <div className='grid grid-cols-2 justify-between w-full mt-[22px] md:gap-6 gap-3 md:hidden flex-wrap '>
                    <button className='flex w-full px-5 h-[30px] rounded-[8px] font-bold text-[14px] items-center justify-center gap-1 text-primary-blue bg-blue-lightBlue text-nowrap'>
                        <Image src={Coupon} width={20} alt='Coupon'/>  Карта Антей+
                    </button>

                    <Link onClick={handleAccountNavigation} href='/account' className='flex w-full px-5 h-[30px] rounded-[8px] font-bold text-[14px] items-center justify-center gap-1 text-black-100 border-[1px] border-blue-lightBlue text-nowrap'>
                        <Image src={Profile} width={16} alt='Coupon'/>  Мои данные
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CartPopup;
