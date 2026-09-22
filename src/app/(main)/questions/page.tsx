import React from 'react';
import FaqSection from "@/features/questions/components/FaqSection";

const Page = () => {
    return (
        <div className='w-full max-w-base mx-auto lg:py-10 py-6 2xl:px-20 lg:px-10 px-6'>
            <h1 className='text-black-100 font-bold lg:text-[32px] text-[23px] leading-[100%] mb-6'>
                Часто задаваемые вопросы
            </h1>
            <FaqSection />
        </div>
    );
};

export default Page;