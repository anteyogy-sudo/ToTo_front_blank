"use client"

import React from 'react';
import Offer1 from "@/assets/icons/pharamacy-antey/Offer.svg";
import {useOpenCatalogStoreStore} from "@/features/navbar/stores/useOpenCatalogStore";
import {Container} from "@/components/Container";
import Image from "next/image";
import logo from "@/assets/icons/pharamacy-antey/pharmacy-antey-logo.svg";
import {ArrowUpRight} from "lucide-react";
import DownloadAntey from "@/components/DownloadAntey";

const Page = () => {
    const images = [Offer1];
    // const [currentIndex, setCurrentIndex] = useState(0);
    const {setOpenCatalog} = useOpenCatalogStoreStore()

    // const handleNext = () => {
    //     setCurrentIndex((prev) => (prev + 1) % images.length);
    // };
    //
    // const handlePrev = () => {
    //     setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    // };

    return (
        <>
            <Container className='w-full lg:py-10 py-6 2xl:px-20 lg:px-10 px-6'>
                <div className='flex lg:justify-between justify-center lg:flex-row flex-col lg:gap-0 gap-6  '>
                    <div className='max-w-[500px] lg:order-1 order-2'>
                        <h4 className='font-bold lg:text-[56px] text-[32px] text-black-100'>Аптека Антей</h4>
                        <p className='lg:text-[18px] text-[16px] font-normal leading-[120%] text-black-700'>
                            Наша миссия – обеспечить вас качественными медицинскими препаратами и высококлассным обслуживанием. Мы гордимся тем, что уже многие годы остаемся надежным партнером для миллионов людей в вопросах здоровья и благополучия
                        </p>
                    </div>
                    <Image src={logo} alt='logo' className='lg:order-2 order-1'/>
                </div>
                <div className='lg:py-10 py-6'>
                    <h4 className='font-bold lg:text-[40px] text-[24px] text-black-100' >Наши принципы</h4>

                    <div className='grid lg:grid-cols-3 grid-cols-1 gap-4 lg:mt-10 mt-6'>
                        <div className='bg-blue-soft h-[147px] lg:p-6 p-4 rounded-[24px] '>
                            <p className='text-black-100 font-bold lg:text-[24px] text-[20px] leading-[110%]'>
                                Забота о клиенте
                            </p>
                            <p className='text-[16px] mt-4 font-normal text-black-700 leading-[120%]'>
                                Мы всегда готовы выслушать ваши потребности предложить оптимальные решения
                            </p>
                        </div>
                        <div className='bg-blue-soft h-[147px] lg:p-6 p-4 rounded-[24px] '>
                            <p className='text-black-100 font-bold lg:text-[24px] text-[20px] leading-[110%]'>
                                Доступность
                            </p>
                            <p className='text-[16px] mt-4 font-normal text-black-700 leading-[120%]'>
                                Мы работаем над тем, чтобы необходимые лекарства всегда были в наличии и по доступным ценам
                            </p>
                        </div>
                        <div className='bg-blue-soft h-[147px] lg:p-6 p-4 rounded-[24px] '>
                            <p className='text-black-100 font-bold lg:text-[24px] text-[20px] leading-[110%]'>
                                Профессионализм
                            </p>
                            <p className='text-[16px] mt-4 font-normal text-black-700 leading-[120%]'>
                                Наши специалисты постоянно повышают свою квалификацию для предоставления актуальной информации и качественной помощи
                            </p>
                        </div>
                    </div>
                </div>
                <div className='lg:py-10 py-6'>
                    <div className='w-full flex justify-between'>
                        <h4 className='font-bold lg:text-[40px] text-[24px] text-black-100'>Мы предлагаем</h4>
                        {/*<div className='flex lg:hidden justify-end gap-4'>*/}
                        {/*    <button*/}
                        {/*        className='w-[32px] h-[32px] bg-blue-lightBlue rounded-[8px] flex justify-center items-center text-primary-blue'*/}
                        {/*        onClick={handlePrev}*/}
                        {/*    >*/}
                        {/*        <MoveLeft />*/}
                        {/*    </button>*/}
                        {/*    <button*/}
                        {/*        className='w-[32px] h-[32px] bg-blue-lightBlue rounded-[8px] flex justify-center items-center text-primary-blue'*/}
                        {/*        onClick={handleNext}*/}
                        {/*    >*/}
                        {/*        <MoveRight />*/}
                        {/*    </button>*/}
                        {/*</div>*/}
                    </div>

                    <div className='w-full flex lg:gap-12 gap-4 lg:flex-row flex-col lg:mt-10 mt-6'>
                        <div className='lg:min-w-[423px] w-full overflow-hidden rounded-[16px]'>
                            {/* It's was: style={{ transform: `translateX(-${100}%)` }} */}
                            <div
                                className='flex transition-transform duration-500 ease-in-out'
                                style={{ transform: `translateX(-${100}%)` }}
                            >
                                {images.map((img, index) => (
                                    <div key={index} className='min-w-full'>
                                        <Image src={img} alt={`offer-${index}`} className='w-full h-auto object-cover' />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className='flex flex-col justify-center'>
                            <p className='font-bold text-black-100 lg:text-[32px] text-[18px] lg:leading-[100%] leading-[120%]'>Широкий ассортимент лекарственных средств и медицинских товаров</p>
                            <p className='lg:text-[18px] text-[14px] lg:leading-[150%] leading-[110%] lg:mt-6 mt-2 text-primary-black-gray'>Мы предлагаем широкий ассортимент товаров, включая лекарства, витаминные комплексы, средства для ухода за кожей, косметику, медицинские приборы и аксессуары. Здесь можно найти препараты для лечения различных заболеваний, а также товары для поддержки здоровья и укрепления иммунитета. Больше того, аптеки часто предлагают товары для детского и пожилого населения, а также специализированные диетические продукты. Такой разнообразный выбор обеспечивает возможности для комплексного подхода к заботе о здоровье клиентов</p>
                            <button onClick={() => setOpenCatalog(true)}  className=' lg:h-[62px] lg:gap-4 gap-2 lg:mt-6 mt-4 lg:w-[317px] h-[48px] w-[279px] font-bold flex justify-center items-center text-primary-blue rounded-[16px] bg-secondary-blue'>
                                Перейти в каталог
                                <ArrowUpRight className='text-blue-medium' size={19} />
                            </button>

                            {/*<div className='lg:flex hidden justify-end gap-6'>*/}
                            {/*    <button*/}
                            {/*        className='w-[48px] h-[48px] bg-blue-lightBlue rounded-[8px] flex justify-center items-center text-primary-blue'*/}
                            {/*        onClick={handlePrev}*/}
                            {/*    >*/}
                            {/*        <MoveLeft />*/}
                            {/*    </button>*/}
                            {/*    <button*/}
                            {/*        className='w-[48px] h-[48px] bg-blue-lightBlue rounded-[8px] flex justify-center items-center text-primary-blue'*/}
                            {/*        onClick={handleNext}*/}
                            {/*    >*/}
                            {/*        <MoveRight />*/}
                            {/*    </button>*/}
                            {/*</div>*/}
                        </div>

                    </div>
                </div>
            </Container>
            <DownloadAntey/>
        </>
    )
};

export default Page;