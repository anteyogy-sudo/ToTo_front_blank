import React from 'react';
import Link from "next/link";
import {LineSVG} from "@/icons/line";
import {Container} from "@/components/Container";
import EmailSelector from "@/components/EmailSelector";

const Page = () => {
    return (
        <Container className='w-full lg:py-10 py-6 2xl:px-20 lg:px-10 px-6'>
            <header className=" w-full">
                <div className=" w-fit flex items-center gap-2.5">
                    <Link href='/' className=" text-primary-gray leading-[120%] hover:text-black-500">Главная</Link>
                    <LineSVG />
                    <span className=" leading-[120%] font-medium">Производителям</span>
                </div>
            </header>

            <h4 className='font-bold lg:text-[40px] lg:mt-10 mt-2 text-[32px] text-black-100 leading-[100%]'>Производителям </h4>

            <div className='lg:mt-10 mt-6'>
                <p className='font-bold lg:text text-black-100 lg:text-[32px] text-[18px] lg:leading-[100%] leading-[120%]'>Уважаемые производители, </p>

                <p className='font-normal text-black-700 lg:mt-4 mt-2 lg:text-[18px] text-[16px] lg:leading-[150%] leading-[120%] '>
                    &#34;Аптека Антей&#34; стремится к расширению ассортимента качественных лекарственных средств и приглашает к сотрудничеству надежных производителей фармацевтической продукции. Наша сеть - это сильное звено на рынке фармацевтики, и мы заинтересованы в установлении взаимовыгодных отношений с производителями, которые разделяют наши ценности в обеспечении доступа к высококачественным и инновационным медицинским препаратам.
                </p>

                <p className='font-bold lg:text mt-4 text-black-100 lg:text-[32px] text-[18px] lg:leading-[100%] leading-[120%]'>Что мы предлагаем:</p>

                <p className='font-normal text-black-700 lg:mt-4 mt-2 lg:text-[18px] text-[16px] lg:leading-[150%] leading-[120%] '>
                    - Широкую сеть филиалов: Мы гордимся нашей обширной розничной сетью, которая позволит вашим товарам быстро попасть к конечным потребителям. <br/>
                    - Репутацию и доверие: &#34;Аптека Антей&#34; зарекомендовала себя как надежный поставщик лекарственных товаров и услуг. <br/>
                    - Маркетинговую поддержку: Наши маркетинговые ресурсы готовы продвигать вашу продукцию, увеличивая её узнаваемость и спрос. <br/>
                    - Профессиональную команду: Наши высококвалифицированные фармацевты готовы представить достоинства вашей продукции потребителям. <br/>
                </p>

                <p className='font-bold lg:text mt-4 text-black-100 lg:text-[32px] text-[18px] lg:leading-[100%] leading-[120%]'>
                    Наши преимущества:
                </p>

                <p className='font-normal text-black-700 lg:mt-4 mt-2 lg:text-[18px] text-[16px] lg:leading-[150%] leading-[120%] '>
                    - Продвижение ваших товаров в нашей сети аптек; <br/>
                    - Маркетинговая поддержка и усиление бренда; <br/>
                    - Установленное доверие и лояльность клиентов к вашей продукции. <br/>
                </p>

                <p className='font-normal text-black-700 lg:mt-4 mt-2 lg:text-[18px] text-[16px] lg:leading-[150%] leading-[120%] '>
                    Для начала диалога и обсуждения деталей партнерства, пожалуйста, свяжитесь с нами по электронной почте: <EmailSelector email="marketing@pharmamail.ru" className="text-primary-blue hover:underline font-bold text-[18px]">marketing@pharmamail.ru</EmailSelector>
                </p>
                <p className='font-normal text-black-700 lg:mt-4 mt-2 lg:text-[18px] text-[16px] lg:leading-[150%] leading-[120%] '>
                    С уважением и надеждой на будущее сотрудничество, <br/>
                    Команда &#34;Аптека Антей&#34;
                </p>
            </div>
        </Container>
    )
};

export default Page;