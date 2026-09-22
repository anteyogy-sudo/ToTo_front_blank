import {Checkbox} from "@/components/ui/checkbox";
import {Separator} from "@/components/ui/separator";
import {Container} from "@/components/Container";
import React from "react";

export const CartSkeleton = () => {
  return (
      <Container className=" w-full flex flex-col pr-6 md:gap-10 gap-6 2xl:px-20 xl:px-10">
          <div className=" w-full h-fit flex items-center justify-between">
              <h3 className=" xl:text-[40px] text-[32px] leading-[100%] font-bold">
                  Корзина
              </h3>
          </div>
          <div className=" w-full flex xl:flex-row flex-col gap-6">
              <div className=" w-full flex flex-col gap-6">
                  <div className=" w-full h-fit bg-white-500 rounded-2xl shadow-sm flex flex-col gap-6 p-6">
                      <div data-disabled={true} className=" w-fit flex items-center gap-2 data-[disabled=true]:pointer-events-none data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-50 select-none">
                          <Checkbox disabled={true} id="check-all_skeleton"/>
                          <label htmlFor="check-all" className=" text-[18px] leading-[120%] text-primary-black-gray cursor-pointer">
                              Выбрать все
                          </label>
                      </div>
                      <Separator />
                      <div className=" w-full md:h-[182px] h-40 rounded-2xl bg-loading-skeleton animate-pulse">
                          {/*  Скелет товаров */}
                      </div>
                  </div>
              </div>
              <div className=" w-full 2xl:min-w-[400px] 2xl:max-w-[400px] xl:min-w-[376px] xl:max-w-[376px] h-fit rounded-2xl bg-white-500 p-6 shadow-sm flex flex-col gap-6">
                  <div className=" w-full flex flex-col gap-4">
                      <div className='relative rounded-[16px] px-6 pb-[158px] shadow-sm bg-loading-skeleton animate-pulse' >
                          {/*  Скелет внутренности правой колонки */}
                      </div>
                  </div>
                  <Separator />
                  <div className='relative rounded-[16px] p-6 shadow-sm bg-loading-skeleton animate-pulse' />
              </div>
          </div>
      </Container>
  );
};