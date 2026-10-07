import React from 'react';
import PharmacyAddresses from "src/features/pharmacy/adresses-page/components/PharmacyAddresses";
import Link from "next/link";
import {LineSVG} from "@/icons/line";
import {Container} from "@/components/Container";

const Page = () => {
    return (
        <Container className="flex flex-col md:py-6 py-4 2xl:px-20 lg:px-10 px-6 lg:gap-3 gap-3">
            <header className="w-full">
                <div className="w-fit flex items-center gap-2.5">
                    <Link href="/" className="text-primary-gray leading-[120%] hover:text-black-100">
                        Главная
                    </Link>
                    <LineSVG />
                    <span className="leading-[120%] text-black-100 font-medium">Адреса магазинов</span>
                </div>
            </header>
            <PharmacyAddresses/>
        </Container>
    )
};

export default Page;