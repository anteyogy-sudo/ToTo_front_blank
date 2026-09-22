import { Button } from "@/components/ui/button";
import { MaskedInput } from "@/components/ui/masked-input";
import { Control, Controller } from "react-hook-form";
import { LoginSchema } from "../schemas/login.schema";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useLoginStore } from "../stores/useLoginStore";
import { cn } from "@/lib/utils";

interface Props {
  control: Control<LoginSchema>;
  disabled: boolean;
  pending: boolean;
}

export const LoginPhoneNumber = ({ control, disabled, pending }: Props) => {
  const { smsError } = useLoginStore();

  return (
    <>
      <div className="flex flex-col lg:gap-4 gap-2">
        <p className="font-bold text-center md:text-[32px] text-[20px] lg:leading-[100%] leading-[120%] text-black-100">
          Введите ваш номер телефона
        </p>
        <p className="font-normal text-center text-black-700 lg:text-[18px] text-sm lg:leading-[120%] leading-[110%]">
          Это всего лишь быстрая регистрация вас в системе для получения заказа
        </p>
      </div>

      <div className=" w-full flex flex-col gap-4">
        <div className=" w-full flex flex-col gap-2">
          <label htmlFor="" className=" text-black-100/70 font-medium text-sm">
            Номер телефона
          </label>
          <div className=" w-full h-fit flex flex-col gap-1">
            <Controller
              control={control}
              name="phone"
              render={({ field }) => (
                <MaskedInput
                  disabled={pending}
                  mask="+{7} (000) 000-00-00"
                  placeholder="+7 (999) 000-00-00"
                  className={cn(
                    " bg-primary-light-white border-transparent rounded-2xl h-[62px] text-[18px]",
                    !!smsError && "border-primary-red bg-primary-red/10"
                  )}
                  {...field}
                />
              )}
            />
          </div>
          {!!smsError && (
            <span className=" text-sm font-semibold text-primary-red">
              {smsError}
            </span>
          )}
        </div>
        <Button
          disabled={disabled || pending}
          className="bg-secondary-blue text-primary-blue h-[62px] rounded-2xl text-[18px] leading-[120%] font-bold shadow-none"
        >
          {pending ? <LoadingSpinner size={24} /> : "Получить код"}
        </Button>
      </div>
    </>
  );
};
