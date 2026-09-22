import React from 'react';
import {ListItems} from "@/components/ListItems";
import Image from "next/image";
import {Container} from "@/components/Container";
import EmailSelector  from "@/components/EmailSelector";

// advertisings.constants.ts
import  IconInternet from "@/assets/icons/advertising/IconInternet.svg"
import  IconPharmacy from "@/assets/icons/advertising/IconPharmacy.svg"
import  IconTarget from "@/assets/icons/advertising/IconTarget.svg"
import  IconCursor from "@/assets/icons/advertising/IconCursor.svg"
import  IconItems from "@/assets/icons/advertising/IconItems.svg"
import  IconTag from "@/assets/icons/advertising/IconTag.svg"

const advertising1 = [
    {title : "На сайте", subTitle : "Размещение рекламных баннеров, статей, PR‑материалов, а также специальные предложения в разделе акций", icon : IconInternet},
    {title : "В аптеках", subTitle : "Брендирование интерьера, размещение информационных стоек с вашими проспектами, листовками и образцами продукции", icon : IconPharmacy}
]

const advertising2 = [
    {title : "Доступ", subTitle : "к целевой аудитории наших аптек", icon : IconTarget},
    {title : "Широкий охват", subTitle : "и высокая посещаемость нашего сайта и аптек", icon : IconCursor},
    {title : "Различные форматы рекламы", subTitle : "от баннеров на сайте до размещения на экранах в аптеках", icon : IconItems},
    {title : "Гибкая система цен", subTitle : "и индивидуальный подход к каждому клиенту", icon : IconTag},
]

const Page = () => {
    return (
        <Container className='w-full lg:py-10 py-6 2xl:px-20 lg:px-10 px-6'>
            <p className='md:text-[56px] text-[32px] font-bold'>
                Реклама
            </p>
            <p className='text-[18px] leading-[120%] text-black-100'>
                Аптека Антей открывает уникальные возможности для размещения вашей рекламы в нашей сети. Наша аудитория - это миллионы клиентов, которые доверяют нам в вопросах здоровья и благополучия. Мы предлагаем размещение рекламы как на нашем сайте, так и непосредственно в аптеках
            </p>

            <div className='mt-10'>
                <p className='md:text-[40px] text-[24px] font-bold '>
                    Рекламные площадки
                </p>

                <div className='grid lg:grid-cols-2 grid-cols-1 gap-6 pt-8'>
                    <ListItems items={advertising1} render={(item, index) => (
                        <div key={index} className='flex flex-col gap-4 bg-white-500 rounded-[16px] md:p-6 p-4'>
                            <div className='flex items-center gap-4'>
                                <div className='flex items-center justify-center w-[44px] h-[44px] bg-blue-lightBlue rounded-[8px]'>
                                    <Image src={item.icon} alt='icon'/>
                                </div>
                                <p className='md:text-[24px] text-[20px] font-bold'>{item.title}</p>
                            </div>
                            <p className='text-[18px] font-normal'>
                                {item.subTitle}
                            </p>
                        </div>
                    )
                    }/>
                </div>
            </div>

            <div className='md:mt-8 mt-3'>
                <p className='md:text-[40px] text-[24px] font-bold '>
                    Преимущества для вас
                </p>

                <div className='grid lg:grid-cols-2 grid-cols-1 gap-6 pt-8'>
                    <ListItems items={advertising2} render={(item, index) => (
                        <div key={index} className='flex flex-col gap-4 bg-white-500 rounded-[16px] md:p-6 p-4'>
                            <div className='flex items-center gap-4'>
                                <div className='flex items-center justify-center w-[44px] h-[44px] bg-blue-lightBlue rounded-[8px]'>
                                    <Image src={item.icon} alt='icon'/>
                                </div>
                                <p className='md:text-[24px] text-[20px] font-bold'>{item.title}</p>
                            </div>
                            <p className='text-[18px] font-normal'>
                                {item.subTitle}
                            </p>
                        </div>
                    )
                    }/>
                </div>

                <p className='lg:mt-10 mt-6 text-[18px] font-normal'>
                    Мы стремимся к созданию долгосрочных партнерских отношений и готовы предложить вам наиболее эффективные рекламные решения, соответствующие вашим маркетинговым целям. Для более детальной информации и начала продуктивного партнерства, пожалуйста, свяжитесь с нашим отделом маркетинга:
                </p>
            </div>

            <div className='lg:mt-10 mt-6 flex flex-col lg:gap-10 gap-6'>
                <div>
                    <p className='font-medium text-[18px] text-black-700'>
                        Электронная почта
                    </p>
                    <EmailSelector  email="marketing@pharmamail.ru" className='text-primary-blue hover:underline font-bold text-[18px] '>
                        marketing@pharmamail.ru
                    </EmailSelector >
                </div>
            </div>
        </Container>
    )
};

export default Page;