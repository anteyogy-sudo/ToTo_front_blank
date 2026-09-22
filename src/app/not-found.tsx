import Image from "next/image";
import CatNotFound from "@/assets/resources/CatNotFound.png";
import Logo2 from "@/assets/resources/logo.svg";
import React from "react";
// import ArrowIcon from "@/assets/icons/Arrow.svg";
import Link from "next/link";
import {UserInitializer} from "@/layouts/UserInitializer";
import {Navbar} from "@/features/navbar/components/Navbar";
import AllowCookies from "@/components/AllowCookies";
import Footer from "@/components/Footer";

export default function NotFound() {
    return (
        <UserInitializer>
            <Navbar />
            <AllowCookies/>

            <div className="flex max-w-base mx-auto h-[calc(80vh-79px-env(safe-area-inset-bottom))] 1144:h-[85vh] flex-col gap-3 py-12 px-12 z-20
                            bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-200 via-blue-50 to-[#f9f9f9] select-none">
                <div className={"relative flex-[1_1_0] min-h-0"}>
                    <Image src={CatNotFound} fill priority className={"object-contain select-none"} draggable="false"
                           alt=''/>
                </div>
                <div className="flex font-bold flex-col items-center justify-center text-primary-blue text-[20px] xs:text-[24px] max-md:gap-3 gap-6 md:text-[28px] text-center shrink-0 text-balance">
                    <p>Упс! Такой страницы не существует.</p>
                    <Link href="/" className='py-[5px] max-h-[62px] font-medium leading-[120px] px-4 flex gap-[10px] justify-between items-center text-white-500 w-fit max-w-[352px] rounded-[16px]  border-2 border-primary-blue'>
                        <Image src={Logo2} width={190} className={"max-2xs:w-[80%] select-none"} draggable="false"
                               alt=''/>
                        {/*<Image src={ArrowIcon} alt='arrow'/>*/}
                        <svg width="40" height="41" viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect y="0.5" width="40" height="40" rx="8" fill="#005ca7"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.6667 20.5C11.6667 20.936 12.0813 21.2895 12.5927 21.2895H25.1721L21.8145 24.1523C21.4529 24.4606 21.4529 24.9605 21.8145 25.2688C22.1761 25.5771 22.7624 25.5771 23.1239 25.2688L28.0622 21.0582C28.4238 20.7499 28.4238 20.2501 28.0622 19.9418L23.1239 15.7312C22.7624 15.4229 22.1761 15.4229 21.8145 15.7312C21.4529 16.0395 21.4529 16.5394 21.8145 16.8477L25.1721 19.7105H12.5927C12.0813 19.7105 11.6667 20.064 11.6667 20.5Z" fill="#FFFFFF"/>
                        </svg>


                    </Link>
                </div>
                {/*<div className="flex justify-center shrink-0">*/}
                {/*    <Image src={Logo} height={100} className={"object-contain select-none"} draggable="false"*/}
                {/*           alt=''/>*/}
                {/*</div>*/}
            </div>


            <Footer />
        </UserInitializer>
    )
}