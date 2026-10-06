"use client";

import activeBonusTag from "@/assets/icons/active-bunous-tag.svg";
import fireTag from "@/assets/icons/fire-tag.svg";
import inactiveBonusTag from "@/assets/icons/inactive-bonus-tag.svg";
import Image from "next/image";
import { AccountSectionTitle } from "../../components/account-section-title";
import { BonusesStoryDialog } from "./BonusesStoryDialog";
import {useUserStore} from "@/stores/useUserStore";
import {useIsomorphicLayoutEffect} from "@/hooks/useIsomorphicLayoutEffect";
import React, {Suspense, useState} from "react";
import ExpandScanDialog from "@/features/navbar/components/ExpandScanDialog";
import {useFetchBonusesQuery} from "@/features/account/my-bonuses/hooks/queries/useFetchBonusesQuery";
import blueLike from "@/assets/icons/blue-like.svg";
import Barcode from "react-barcode";
import card from "@/assets/resources/card.svg";

export const Bonuses = () => {
    const { data: bonuses } = useFetchBonusesQuery();

    const { user } = useUserStore();
    const [openExpandScan, setOpenExpandScan] = useState(false)

    const openExpand = () => {
        setOpenExpandScan(true)
    }

    const closeExpandScan = () => {
        setOpenExpandScan(false)
    }

    useIsomorphicLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    console.log(bonuses)

    return (
        <>
        <section className=" w-full rounded-[18px] shadow-sm bg-white-500 px-8 py-6 flex flex-col gap-[30px]">
          <AccountSectionTitle>Моя карта</AccountSectionTitle>
          <article className='flex flex-col justify-between gap-[6px]'>
              <div className='flex flex-col gap-1'>
                  <p className='lg:block font-normal  hidden text-[24px] leading-[120%] '>Ваша бонусная карта Антей+</p>
              </div>
                  { user?.loyalty_code && (
                      <div className='flex w-full'>
                          <div className="relative flex w-fit justify-center z-10">
                              <Image src={card} alt="card image" width={460} draggable={false}
                                     className="max-lg:hidden object-contain select-none z-20" priority
                              />
                              <Barcode
                                  value={user.loyalty_code}
                                  format="CODE128"
                                  height={100}
                                  width={4}
                                  fontOptions="600"
                                  textMargin={4}
                                  margin={0}
                                  displayValue={false}
                                  className="max-lg:hidden absolute bottom-[45px] z-30 max-w-[350px]"
                              />
                          </div>
                          <Barcode
                              value={user.loyalty_code}
                              format="CODE128"
                              height={90}
                              width={4}
                              fontOptions="600"
                              textMargin={4}
                              margin={0}
                              className="lg:hidden max-w-[550px]"
                              displayValue={false}
                          />
                      </div>
                  )}

              <p className='lg:text-[24px] text-[18px] leading-[120%] '>Номер карты: <span className='font-medium'>{user?.loyalty_code}</span></p>
          </article>

          <button onClick={openExpand} className='flex w-fit justify-center items-center p-[16px] font-medium lg:text-[24px] text-[16px] leading-[120%] text-primary-blue bg-blue-light border border-primary-blue rounded-[16px]'>
              Развернуть для сканирования
          </button>

          <article className=" w-full flex flex-col gap-2">
              <p className=" 1144:text-[32px] text-[24px] font-bold leading-[100%]">
                  У вас {bonuses?.loyalty?.available} бонусов
              </p>
              <div className=" w-full flex flex-col gap-2">
                  <div className=" 1144:text-[18px] leading-[120%] text-black-100/70 flex items-center gap-2">
                      <Image src={activeBonusTag} alt="active bonus icon" width={24} height={24}/>
                      +{(bonuses?.loyalty_history?.[0]?.points ?? 0) - (user?.loyalty_history?.[0]?.amount ?? 0)} бонусов за последнюю покупку
                  </div>
                  <div className=" 1144:text-[18px] leading-[120%] text-black-100/70 flex items-center gap-2">
                      <Image src={inactiveBonusTag} alt="active bonus icon" width={24} height={24}/>
                      {bonuses?.loyalty?.frozen ?? 0} бонусов ожидают начисления
                  </div>
                  <div className=" 1144:text-[18px] leading-[120%] text-black-100/70 flex items-center gap-2">
                      <Image src={fireTag} alt="active bonus icon" width={24} height={24}/>
                      {bonuses?.loyalty?.burnup ?? 0} бонусов сгорят через <span className=" font-bold">{bonuses?.loyalty?.expiry}</span> дней
                  </div>
                  { bonuses?.loyalty_history && (
                      <BonusesStoryDialog loyaltyHistory={bonuses?.loyalty_history} />
                  )}
              </div>
          </article>

          <Suspense>
             <ExpandScanDialog onClose={closeExpandScan} open={openExpandScan}/>
          </Suspense>
      </section>
      <section className="w-full flex 1144:items-center 1144:flex-row flex-col gap-6 p-6 rounded-[18px] bg-blue-lightBlue text-primary-blue shadow-sm">
          <Image src={blueLike} alt="blue like icon" width={48} height={48} priority />
          <div className="w-fit flex flex-col gap-2">
            <p className="1144:text-[32px] text-[24px] font-bold leading-[120%]">Вы сэкономили более {bonuses?.loyalty?.spent} ₽</p>
            <span className="font-medium 1144:text-[20px] text-[18px] leading-[120%]">
              и все благодаря вашей бонусной карте
            </span>
          </div>
      </section>
    </>
    );
};
