import React from "react";
import { ListItems } from "@/components/ListItems";
import Image from "next/image";
import {Container} from "@/components/Container";
import EmailSelector from "@/components/EmailSelector";
import {EMAIL_PK, PHONE_MAIN} from "@/constants/global.constants";

// landlords.constants.ts
import IconSquare from "@/assets/icons/landlords/IconSquare.svg";
import IconBuilding from "@/assets/icons/landlords/IconBuilding.svg";
import IconParking from "@/assets/icons/landlords/IconParking.svg";
import IconPeople from "@/assets/icons/landlords/IconPeople.svg";
import IconCash from "@/assets/icons/landlords/IconCash.svg";
import IconAgreement from "@/assets/icons/landlords/IconAgreement.svg";
import IconCleaning from "@/assets/icons/landlords/IconCleaning.svg";

const landlordsConstants = [
    { title : "Площадь", subTitle : "от 40 до 100 квадратных метров", icon : IconSquare},
    { title : "Расположение", subTitle : "на первом этаже с удобным входом", icon : IconBuilding},
    { title : "Парковка", subTitle : "Желательно наличие парковочных мест", icon : IconParking},
    { title : "Проходимость", subTitle : "Высокая проходимость и видимость помещения", icon : IconPeople},
]

const landlordsOffer = [
    { title : "Стабильную арендную плату и своевременные платежи", icon : IconCash},
    { title : "Долгосрочные арендные отношения", icon : IconAgreement},
    { title : "Уход за арендуемым пространством и поддержание его в идеальном состоянии", icon : IconCleaning}
]

// Landlords.tsx
const Page = () => {
    return (
        <Container className="w-full lg:py-10 py-6 2xl:px-20 lg:px-10 px-6">
            <p className="md:text-[56px] text-[32px] font-bold">Арендодателям</p>
            <p className="text-[18px]  leading-[120%] text-black-100">
                Ваше место может стать частью сети аптек Антей
            </p>

            <div className="md:mt-8 mt-3">
                <p className="md:text-[40px] text-[24px] font-bold ">
                    Требования к помещению
                </p>

                <div className="grid lg:grid-cols-2 grid-cols-1 gap-6 pt-8">
                    <ListItems
                        items={landlordsConstants}
                        render={(item, index) => (
                            <div
                                key={index}
                                className="flex flex-col gap-4 bg-white-500 rounded-[16px] md:p-6 p-4"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center justify-center w-[44px] h-[44px] bg-blue-lightBlue rounded-[8px]">
                                        <Image src={item.icon} alt="icon" />
                                    </div>
                                    <p className="md:text-[24px] text-[20px] font-bold">
                                        {item.title}
                                    </p>
                                </div>
                                <p className="text-[18px] font-normal">{item.subTitle}</p>
                            </div>
                        )}
                    />
                </div>
            </div>

            <div className="md:mt-8 mt-3">
                <p className="md:text-[40px] text-[24px] font-bold ">Мы предлагаем</p>

                <div className="grid lg:grid-cols-3 grid-cols-1 gap-6 pt-8">
                    <ListItems
                        items={landlordsOffer}
                        render={(item, index) => (
                            <div
                                key={index}
                                className="bg-white-500 rounded-[16px] md:p-6 p-4"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center justify-center min-w-[44px] h-[44px] bg-blue-lightBlue rounded-[8px]">
                                        <Image src={item.icon} alt="icon" />
                                    </div>
                                    <p className="md:text-[18px] text-[16px] font-bold">
                                        {item.title}
                                    </p>
                                </div>
                            </div>
                        )}
                    />
                </div>

                <p className="lg:mt-10 mt-6 text-[18px] font-normal">
                    Если у вас есть подходящее помещение, которое может стать новым местом
                    для «Аптеки Антей», мы будем рады рассмотреть ваше предложение. Кроме
                    того, мы открыты к обсуждению различных условий сотрудничества, в том
                    числе мы готовы рассмотреть приобретение вашей недвижимости
                    (помещений) в собственность.
                </p>
            </div>

            <div className="lg:mt-10 mt-6 flex flex-col lg:gap-10 gap-6">
                <div>
                    <p className="font-medium text-[18px] text-black-700">Телефон</p>
                    <a href={"tel:"+PHONE_MAIN} className="text-primary-blue hover:underline font-bold text-[18px]">
                        {PHONE_MAIN}
                    </a>
                </div>

                <div>
                    <p className="font-medium text-[18px] text-black-700">
                        Электронная почта
                    </p>
                    <EmailSelector email={EMAIL_PK} className="text-primary-blue hover:underline font-bold text-[18px]">
                        {EMAIL_PK}
                    </EmailSelector>
                </div>
            </div>
        </Container>
    );
};

export default Page;