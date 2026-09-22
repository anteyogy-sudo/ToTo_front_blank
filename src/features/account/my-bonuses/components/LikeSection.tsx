"use client";

import Image from "next/image";
import blueLike from "@/assets/icons/blue-like.svg";
import {useUserStore} from "@/stores/useUserStore";

export const LikeSection = () => {
    const { user } = useUserStore();
    return (
    <section className=" w-full flex 1144:items-center 1144:flex-row flex-col gap-6 p-6 rounded-[18px] bg-blue-lightBlue text-primary-blue shadow-sm">
      <Image src={blueLike} alt="blue like icon" width={48} height={48} priority />
      <div className=" w-fit flex flex-col gap-2">
        <p className=" 1144:text-[32px] text-[24px] font-bold leading-[120%]">Вы сэкономили более {user?.loyalty?.spent} ₽</p>
        <span className=" font-medium 1144:text-[20px] text-[18px] leading-[120%]">
          и все благодаря вашей бонусной карте
        </span>
      </div>
    </section>
  );
};
