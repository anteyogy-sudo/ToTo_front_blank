import React from 'react';
import {ListItems} from "@/components/ListItems";
import Image from "next/image";
import {Container} from "@/components/Container";
import EmailSelector from "@/components/EmailSelector";
import {EMAIL_PK, PHONE_MAIN} from "@/constants/global.constants";

// vacancies.constants.ts
import IconDoctor from "@/assets/icons/vacancies/IconDoctor.svg"
import IconIT from "@/assets/icons/vacancies/IconIT.svg"
import IconSupport from "@/assets/icons/vacancies/IconSupport.svg"
import IconMegaphone from "@/assets/icons/vacancies/IconMegaphone.svg"
import IconBriefcase from "@/assets/icons/vacancies/IconBriefcase.svg"
import IconCash from "@/assets/icons/landlords/IconCash.svg"
import IconPeople from "@/assets/icons/landlords/IconPeople.svg"
import IconTrend from "@/assets/icons/vacancies/IconTrend.svg"
import IconPC from "@/assets/icons/vacancies/IconPC.svg"
import IconHandshake from "@/assets/icons/vacancies/IconHandshake.svg"

const vacancies1 = [
    {title : 'Фармацевты и провизоры' , icon : IconDoctor},
    {title : 'IT-специалисты и аналитики данных' , icon : IconIT},
    {title : 'Специалисты по работе с клиентами' , icon : IconSupport},
]

const vacancies2 = [
    {title : 'Маркетологи и специалисты по рекламе' , icon : IconMegaphone},
    {title : 'Административный и управленческий персонал' , icon : IconBriefcase}
]

const vacanicesWhyAntey = [
    {title : "Конкурентоспособное вознаграждение и социальные гарантии", icon : IconCash},
    {title : "Возможности для профессионального роста и развития", icon : IconTrend},
    {title : "Коллектив единомышленников и профессионалов", icon : IconPeople},
    {title : "Современное оборудование и рабочие пространства", icon : IconPC},
    {title : "Корпоративная культура, основанная на уважении и поддержке", icon : IconHandshake}
]

// Vacancies.tsx
const Page = () => {
    return (
        <Container>
            <p className='md:text-[56px] text-[32px] font-bold'>
                Вакансии
            </p>
            <p className='text-[18px] leading-[120%] text-black-100'>
                Мы верим, что ключ к нашему успеху  —  это наши сотрудники. Поэтому мы всегда ищем талантливых, целеустремленных и профессиональных людей, которые помогут нам дальше развивать нашу компанию и продолжать предоставлять нашим клиентам высококачественное обслуживание и продукцию
            </p>

            <div className='md:mt-10 mt-6'>
                <div className='grid lg:grid-cols-3 grid-cols-1 gap-6'>
                    <ListItems items={vacancies1} render={(item, index) => (
                        <div key={index} className='bg-white-500 rounded-[16px] md:p-6 p-4'>
                            <div className='flex items-center gap-3'>
                                <div className='flex items-center justify-center min-w-[44px] h-[44px] bg-blue-lightBlue rounded-[8px]'>
                                    <Image src={item.icon} alt='icon'/>
                                </div>
                                <p className='md:text-[18px] text-[16px] font-normal'>{item.title}</p>
                            </div>
                        </div>
                    )
                    }/>
                </div>

                <div className='grid lg:grid-cols-2 grid-cols-1 gap-6 mt-6'>
                    <ListItems items={vacancies2} render={(item, index) => (
                        <div key={index} className='bg-white-500 rounded-[16px] md:p-6 p-4'>
                            <div className='flex items-center gap-3'>
                                <div className='flex items-center justify-center min-w-[44px] h-[44px] bg-blue-lightBlue rounded-[8px]'>
                                    <Image src={item.icon} alt='icon'/>
                                </div>
                                <p className='md:text-[18px] text-[16px] font-normal'>{item.title}</p>
                            </div>
                        </div>
                    )
                    }/>
                </div>

            </div>


            <div className='md:mt-8 mt-3'>
                <p className='md:text-[40px] text-[24px] font-bold '>
                    Почему аптека Антей?
                </p>

                <div className='grid gap-4 pt-8 bg-white-500 rounded-[16px] md:p-6 p-4'>
                    <ListItems items={vacanicesWhyAntey} render={(item, index) => (
                        <div key={index}>
                            <div className='flex items-center gap-4'>
                                <div className='flex items-center justify-center min-w-[44px] min-h-[44px] bg-blue-lightBlue rounded-[8px]'>
                                    <Image src={item.icon} alt='icon'/>
                                </div>
                                <p className='md:text-[18px] text-[16px] font-medium'>{item.title}</p>
                            </div>
                        </div>
                    )
                    }/>
                </div>

                <p className='md:text-[40px] lg:mt-10 mt-6 text-[24px] font-bold '>
                    Хотите присоединиться к команде Антей?
                </p>

                <p className=' lg:my-6 my-4 text-[18px] font-normal'>
                    { "Отправьте резюме нам на почту " }
                    <EmailSelector email={EMAIL_PK} className='text-primary-blue hover:underline font-bold text-[18px]'>{EMAIL_PK}</EmailSelector>
                    {" или позвоните по телефону "}
                    <a href={"tel:"+PHONE_MAIN} className='text-primary-blue hover:underline font-bold text-[18px]'>{PHONE_MAIN}</a>
                    {", чтобы обсудить возможности трудоустройства и узнать подробнее о текущих вакансиях"}
                </p>
            </div>
        </Container>
    );
};

export default Page;