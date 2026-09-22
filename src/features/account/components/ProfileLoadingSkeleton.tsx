import { Button } from "@/components/ui/button";

export const ProfileLoadingSkeleton = () => {
  return (
    <div className=" w-full p-6 rounded-2xl flex flex-col gap-10 bg-white-500 shadow-sm">
      <p className=" font-bold 1144:text-[40px] text-[32px] leading-[100%]">Профиль</p>
      <div className=" w-full flex flex-col gap-6">
        <p className=" 1144:text-[32px] text-[24px] font-bold leading-[100%]">Личные данные</p>
        <div className=" w-full grid 1144:grid-cols-3 gap-4">
          <div className=" w-full flex flex-col gap-2">
            <label htmlFor="" className=" text-sm font-medium leading-[110.00000000000001%] cursor-pointer w-fit">
              Имя
            </label>
            <div className=" h-[62px] rounded-2xl bg-loading-skeleton animate-pulse" />
          </div>
          <div className=" w-full flex flex-col gap-2">
            <label htmlFor="" className=" text-sm font-medium leading-[110.00000000000001%] cursor-pointer w-fit">
              Фамилия
            </label>
            <div className=" h-[62px] rounded-2xl bg-loading-skeleton animate-pulse" />
          </div>
          <div className=" w-full flex flex-col gap-2">
            <label htmlFor="" className=" text-sm font-medium leading-[110.00000000000001%] cursor-pointer w-fit">
              Дата рождения
            </label>
            <div className=" h-[62px] rounded-2xl bg-loading-skeleton animate-pulse" />
          </div>
          <div className=" w-full flex flex-col gap-2">
            <label htmlFor="" className=" text-sm font-medium leading-[110.00000000000001%] cursor-pointer w-fit">
              Телефон
            </label>
            <div className=" h-[62px] rounded-2xl bg-loading-skeleton animate-pulse" />
          </div>
          <div className=" w-full flex flex-col gap-2">
            <label htmlFor="" className=" text-sm font-medium leading-[110.00000000000001%] cursor-pointer w-fit">
              Email
            </label>
            <div className=" h-[62px] rounded-2xl bg-loading-skeleton animate-pulse" />
          </div>
          <div className=" w-full flex flex-col justify-center gap-2">
            <span className=" text-sm leading-[110.00000000000001%]">Пол</span>
            <div className=" h-[62px] rounded-2xl bg-loading-skeleton animate-pulse" />
          </div>
        </div>
      </div>
      <div className=" w-full max-w-[403px] flex flex-col gap-10">
        <div className=" w-full max-w-[403px] flex flex-col gap-6">
          <p className=" 1144:text-[32px] text-[24px] font-bold leading-[100%]">Уведомления</p>
          <div className=" w-full flex flex-col gap-4">
            <div className=" w-full flex items-center justify-between gap-2 py-2">
              <label htmlFor="sms" className=" text-[18px] font-bold leading-[120%]">
                SMS
              </label>
              <div className=" h-6 w-12 rounded-full bg-loading-skeleton animate-pulse" />
            </div>
            <div className=" w-full flex items-center justify-between gap-2 py-2">
              <label htmlFor="email" className=" text-[18px] font-bold leading-[120%]">
                E-mail
              </label>
              <div className=" h-6 w-12 rounded-full bg-loading-skeleton animate-pulse" />
            </div>
            <div className=" w-full flex items-center justify-between gap-2 py-2">
              <label htmlFor="notification" className=" text-[18px] font-bold leading-[120%]">
                Push-уведомления
              </label>
              <div className=" h-6 w-12 rounded-full bg-loading-skeleton animate-pulse" />
            </div>
          </div>
        </div>

        <div className=" w-full flex flex-col gap-6">
          <p className=" text-sm leading-[110.00000000000001%]">
            Нажимая на кнопку “Сохранить”, я подтверждаю свое согласие на обработку персональных данных
          </p>

          <div className=" w-full grid 1144:grid-cols-2 gap-10">
            <Button disabled className=" w-full font-bold text-[18px] leading-[120%] h-[62px] rounded-2xl">
              Сохранить
            </Button>
            <Button
              disabled
              variant="ghost"
              className=" w-full font-bold text-[18px] leading-[120%] h-[62px] rounded-2xl text-primary-blue"
            >
              Отменить
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
