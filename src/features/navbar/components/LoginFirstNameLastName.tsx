import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Control, Controller } from "react-hook-form";
import { LoginSchema } from "../schemas/login.schema";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

interface Props {
  control: Control<LoginSchema>;
  disabled: boolean;
  pending: boolean;
}

export const LoginFirstNameLastName = ({ control, pending, disabled }: Props) => {
  return (
    <>
      <div className="flex flex-col lg:gap-4 gap-2">
        <p className="font-bold text-center md:text-[32px] text-[20px] lg:leading-[100%] leading-[120%] text-black-100">
          Введите имя и фамилию
        </p>
        <p className="font-normal text-center text-black-700 lg:text-[18px] text-sm lg:leading-[120%] leading-[110%]">
          Эти данные будут необходимы для получения заказа
        </p>
      </div>

      <div className=" w-full flex flex-col gap-4">
        <div className=" w-full flex flex-col gap-2">
          <label htmlFor="" className=" text-black-100/70 font-medium text-sm">
            Имя
          </label>
          <Controller
            control={control}
            name="first_name"
            render={({ field }) => (
              <Input
                placeholder="Имя"
                className=" bg-primary-light-white border-none rounded-2xl h-[62px] text-[18px]"
                disabled={pending}
                {...field}
              />
            )}
          />
        </div>
        <div className=" w-full flex flex-col gap-2">
          <label htmlFor="" className=" text-black-100/70 font-medium text-sm">
            Фамилия
          </label>
          <Controller
            control={control}
            name="last_name"
            render={({ field }) => (
              <Input
                placeholder="Фамилия"
                className=" bg-primary-light-white border-none rounded-2xl h-[62px] text-[18px]"
                disabled={pending}
                {...field}
              />
            )}
          />
        </div>

        <Button
          disabled={disabled || disabled}
          className="bg-secondary-blue text-primary-blue h-[62px] rounded-2xl text-[18px] leading-[120%] font-bold shadow-none"
        >
          {pending ? <LoadingSpinner size={24} /> : "Отправить"}
        </Button>
      </div>
    </>
  );
};
