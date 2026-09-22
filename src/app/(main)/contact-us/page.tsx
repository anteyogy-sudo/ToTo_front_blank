"use client"
import React from 'react';
import Link from "next/link";
import {LineSVG} from "@/icons/line";
import {Container} from "@/components/Container";
import EmailSelector  from "@/components/EmailSelector";
import {EMAIL_PK, PHONE_MAIN} from "@/constants/global.constants";
import {ListItems} from "@/components/ListItems";

const Page = () => {
    const social_links = [
        { name: "ВКонтакте", url: "https://vk.ru/aptekaantey" },
        { name: "Telegram", url: "https://t.me/antey_apteka" },
        { name: "МАКС", url: "https://max.ru/join/PDLrRQlocSI6W9DfJ_Ayl6l4WX5nEaQ7aKfMLBjxhQg" },
    ]

    return (
        <Container className="flex flex-col gap-4 my-2">
            <nav className="w-fit flex items-center gap-2.5">
                <Link href='/' className=" text-primary-gray leading-[120%] hover:text-black-500">Главная</Link>
                <LineSVG />
                <span className=" leading-[120%] font-medium">Связаться с нами</span>
            </nav>
            
            <main className="bg-white-500/90 rounded-[32px] flex flex-col font-normal text-black-700 gap-4 lg:text-[18px] text-[16px] lg:leading-[150%] leading-[120%] p-6">
                <h4 className='font-bold lg:text-[40px] text-[32px] text-black-100 leading-[100%]'>Связаться с нами</h4>
    
                <p>
                    Уважаемые клиенты! <br/>
                    Мы искренне ценим ваш интерес и стремимся быть всегда на связи! Если у вас возникли вопросы, вы хотите поделиться отзывами или вам требуется консультация по нашим товарам, пожалуйста, не стесняйтесь обратиться к нам. Ваше мнение и здоровье — для нас высший приоритет.
                </p>
                <p>
                    Контактная информация: <br/>
                    - Телефон службы поддержки: {PHONE_MAIN} <br/>
    
                    Мы доступны для звонков в рабочие дни с 9:00 до 18:00.
                </p>
                <p>
                    {"Электронная почта: "}
                    <EmailSelector email={EMAIL_PK} className="text-primary-blue hover:underline font-bold text-[18px]">{EMAIL_PK}</EmailSelector >
                </p>
                <p>
                    Социальные сети: <br/>
                    {"Следите за нами в социальных сетях и будьте в курсе всех новостей и акций: "}
                    <ListItems
                        items={social_links}
                        render={(social, index) => (
                            <span key={social.name}>
                                <Link
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary-blue hover:underline font-bold text-[18px]"
                                >
                                    {social.name}

                                </Link>
                                <span>{index !== social_links.length-1 ? ', ' : '.'}</span>
                            </span>
                        )}
                    />
                </p>
                <p>
                    Мы ценим каждого клиента и гарантируем индивидуальный подход. Обращайтесь, мы всегда к вашим услугам!
                </p>
            </main>
        </Container>
    );
};

export default Page;