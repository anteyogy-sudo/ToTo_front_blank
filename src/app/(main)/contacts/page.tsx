import React from 'react';
import Link from "next/link";
import { LineSVG } from "@/icons/line";
import {Container} from "@/components/Container";
import EmailSelector  from "@/components/EmailSelector";
import {EMAIL_PK, PHONE_MAIN} from "@/constants/global.constants";

const Page = () => {
    return (
        <Container className='flex flex-col w-full my-3 lg:gap-6 gap-3'>
            <nav className="w-fit flex flex-row items-center gap-2.5">
                <Link href='/' className=" text-primary-gray leading-[120%] hover:text-black-500">Главная</Link>
                <LineSVG />
                <span className=" leading-[120%] font-medium">Контакты</span>
            </nav>

            <h4 className='font-bold lg:text-[40px] text-[32px] text-black-100 leading-[100%] py-3'>Контактные данные компании:</h4>

            <div className='flex flex-col lg:gap-4 gap-2 pb-4'>
                <p className='font-normal text-black-700 lg:text-[18px] text-[16px] lg:leading-[150%] leading-[120%] '>
                    ООО &#34;Аптека Антей&#34; <br />
                    ОГРН 1083525014099 <br />
                    ИНН/КПП 3525211102/352501001 <br />
                    Адрес: 160028 г. Вологда, Окружное шоссе, д.13В <br />
                </p>

                <p className='font-normal text-black-700 lg:text-[18px] text-[16px] lg:leading-[150%] leading-[130%] '>
                    Если у вас есть вопросы, комментарии или нужна помощь, не стесняйтесь связаться с нами. Наша дружелюбная команда с удовольствием поможет вам.
                </p>

                <p className='font-normal text-black-700 lg:text-[18px] text-[16px] lg:leading-[150%] leading-[130%] '>
                    Мы работаем с понедельника по пятницу, с 9:00 до 18:00. Будем рады встретиться с вами лично, по телефону:
                    <a href={"tel:"+PHONE_MAIN} className="text-primary-blue hover:underline font-bold text-[18px] ml-1">{PHONE_MAIN}</a>
                    {' '}или по электронной почте:
                    <EmailSelector email={EMAIL_PK} className="text-primary-blue hover:underline font-bold text-[18px] ml-1">{EMAIL_PK}</EmailSelector>.
                </p>

                <p className='font-normal text-black-700 lg:text-[18px] text-[16px] lg:leading-[150%] leading-[130%] '>
                    В зависимости от вопроса вы можете направить запрос:
                </p>

                <p className='font-normal text-black-700 lg:text-[18px] text-[16px] lg:leading-[150%] leading-[130%] '>
                    Для предложений помещений под аренду/продажу:
                    <EmailSelector email={EMAIL_PK} className="text-primary-blue hover:underline font-bold text-[18px] ml-1">{EMAIL_PK}</EmailSelector> <br />
                    Для предложений по заключению контрактов с производителями:
                    <EmailSelector email="marketing@pharmamail.ru" className="text-primary-blue hover:underline font-bold text-[18px] ml-1">marketing@pharmamail.ru</EmailSelector> <br />
                    Для предложений по размещению рекламы:
                    <EmailSelector email={EMAIL_PK} className="text-primary-blue hover:underline font-bold text-[18px] ml-1">{EMAIL_PK}</EmailSelector> <br />
                </p>

                <p className='font-normal text-black-700 lg:text-[18px] text-[16px] lg:leading-[150%] leading-[130%] '>
                    Спасибо, что выбрали наш сайт. Мы стремимся предоставить вам лучший сервис и удовлетворить все ваши потребности.
                </p>
            </div>
        </Container>
    )
};

export default Page;