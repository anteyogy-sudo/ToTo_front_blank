import React from 'react';
import Feedback from "src/features/feedback/components/Feedback";

const Page = () => {
    return (
        <div className='w-full max-w-base mx-auto lg:py-10 py-6 2xl:px-20 lg:px-10 px-6'>
            <h1 className='text-black-100 font-bold lg:text-[34px] text-[22px] leading-[100%] mb-8'>
                Обратная связь
            </h1>
            <p className='text-black-100 font-bold lg:text-[28px] text-[20px] leading-[100%] mb-8'>Вы помогаете нам стать лучше!</p>
            <Feedback />
        </div>
    );
};

export default Page;