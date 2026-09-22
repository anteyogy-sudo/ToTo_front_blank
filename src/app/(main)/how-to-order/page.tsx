import React from 'react';
import {ListItems} from "@/components/ListItems";
import {Container} from "@/components/Container";

const howToDoOrderConstants = [
    {title : "Выберите товары", subTitle : "Начните с поиска нужного товара. Используйте удобный каталог или строку поиска на сайте. Выберите необходимое количество товаров и добавьте их в Корзину. Перейдите в раздел Корзина и нажмите кнопку «Выбрать аптеку» для продолжения"},
    {title : "Выберите аптеку", subTitle : "Выберите удобную аптеку для получения заказа. Воспользуйтесь картой города или списком адресов аптек. Помните, что не все аптеки могут иметь в наличии все товары. На карте или в списке аптек указывается количество товара, доступного в аптеке для заказа"},
    {title : "Подтвердите заказ", subTitle : "После выбора аптеки подтвердите заказ, заполнив форму и получив код подтверждения по sms.  Если заказ делается менее чем за час до закрытия аптеки, его придется забрать на следующий день"},
    {title : "Ожидайте уведомление", subTitle : "Когда заказ будет готов, вам придет SMS. Заказ будет храниться в аптеке 48 часов"},
    {title : "Заберите заказ", subTitle : "Как только получите SMS-извещение, пожалуйста, посетите нашу аптеку в удобное для вас время в течение следующих 48 часов, чтобы забрать и оплатить ваш заказ. Мы будем рады вас видеть!"}
]

const Page = () => {
    return (
        <Container>
            <div className='lg:py-7 py-3 2xl:px-20 lg:px-10 px-6'>
                <h4 className='font-bold lg:text-[40px] text-[32px] text-black-100'>Как сделать заказ</h4>
                <p className='font-normal leading-[120%] text-black-700 lg:text-[18px] text-[16px]'>Оформление заказа на сайте - это просто!</p>

                <div className='lg:mt-10 mt-6 flex flex-col lg:gap-6 gap-4'>
                    {
                        <ListItems
                            items={howToDoOrderConstants}
                            render={(item, index) => (
                                <div
                                    key={index}
                                    className='w-full lg:p-6 p-4 rounded-[18px] flex flex-col gap-4 bg-blue-soft'
                                >
                                    <div className='flex gap-4 items-center'>
                                        <p className='font-bold text-primary-softBlue lg:text-[40px] text-[24px]'>{index + 1}</p>
                                        <p className='font-bold text-[24px] text-black-100'>{item.title}</p>
                                    </div>
                                    <p className='text-black-700 dont-normal lg:text-[18px] text-[16px] lg:leading-[150%] leading-[120%]'>{item.subTitle}</p>
                                </div>
                            ) }
                        />
                    }
                </div>
            </div>
        </Container>
    )
};

export default Page;