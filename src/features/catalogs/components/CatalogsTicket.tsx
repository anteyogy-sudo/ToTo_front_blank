"use client"
import Image from "next/image";
import TicketImg from "@/assets/icons/catalogs/CatalogTicket.svg";
import TicketMobile from "@/assets/icons/catalogs/TicketMobile.svg";
import {Button} from "@/components/ui/button";
import React from "react";
import {ArrowUpRight} from "lucide-react";
import {useAuthDialogStore} from "@/stores/useAuthDialogStore";
import {useUserStore} from "@/stores/useUserStore";
import {useRouter} from "next/navigation";

export const CatalogsTicket = () => {

    const {setIsOpenLoginDialog, setWithRedirect} = useAuthDialogStore();
    const {user} = useUserStore();
    const router = useRouter()
    const handleLogin = () => {
        setWithRedirect(true);

        if (!user) {
            setIsOpenLoginDialog(true);
            return;
        } else {
            router.replace("/account");
        }
    }

    //Убираем отображение билета с акцией
    const showTicket = process.env.NEXT_PUBLIC_SHOW_CATALOG_TICKET === 'true';

    return (
        <>
            <div
                // Убираем ccs изображения
                /*className="w-full relative lg:py-10 pg-6 flex justify-center"
                style={{
                    background:
                        "radial-gradient(circle at center, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 240, 0.6) 40%, rgba(255, 220, 250, 0.4) 70%, rgba(230, 230, 255, 0.3) 100%)",
                }}*/
            >
                {/* Браузер. Используем только когда флаг showTicket === true */}
                {showTicket && (
                    <div className="w-full md:block hidden 2xl:px-20 lg:px-10 px-6 rounded-[16px] overflow-hidden">
                        <Image src={TicketImg} alt="ticket" className="w-full h-full object-contain"/>
                    </div>
                )}

                {/* Убираем текст */}
                {showTicket && (
                    <div className="absolute md:block hidden w-full h-full z-10 2xl:px-20 lg:px-10 px-6 ">
                        <div className="h-full pb-10 flex flex-col justify-between">
                            <div className="pt-10 pl-10">
                                <p className="text-white-500 font-bold lg:text-[48px] text-[24px]">Билет на море скидок!</p>
                            </div>
                            <div className="px-[9vw] lg:pb-20 ">
                                <p className="w-[317px] text-white-500 lg:text-[20px] text-[14px] lg:leading-[120%] leading-[110%] lg:font-bold font-normal ">
                                    Регистрируйтесь, получайте бонусы за покупки и используйте их для оплаты новых заказов!
                                </p>
                                <Button onClick={handleLogin}
                                        className="lg:max-w-[317px] lg:mt-6 mt-4 font-bold text-[18px] bg-blue-lightBlue h-[62px] w-full max-w-[317px] rounded-[18px] text-primary-blue leading-[120%]">
                                    Присоединиться
                                    <ArrowUpRight className="text-blue-medium" size={19}/>
                                </Button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Мобильная версия убираем все */}
                {showTicket && (
                    <div className="px-6 md:hidden block py-6">
                        <Image src={TicketMobile} alt="TicketMobile"/>
                        <Button onClick={handleLogin}
                                className="max-w-[400px] w-full mt-4 font-bold text-[16px] bg-blue-lightBlue rounded-[18px] text-primary-blue leading-[120%]">
                            Зарегистрироваться
                            <ArrowUpRight className="text-blue-medium" size={22}/>
                        </Button>
                    </div>
                )}
            </div>
        </>
    );
};