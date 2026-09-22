import { ListItems } from "@/components/ListItems";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { cn } from "@/lib/utils";
import { RotateCw } from "lucide-react";
import { useRef, useState } from "react";
import { Control, Controller } from "react-hook-form";
import { useSendPhoneNumberMutation } from "../hooks/mutations/useSendPhoneNumberMutation";
import { useLoginStore } from "../stores/useLoginStore";
import {LoginFormValues} from "@/features/navbar/schemas/login.schema";

interface Props {
  control: Control<LoginFormValues>;
  changePhoneNumber: () => void;
  disabled: boolean;
  phone: string;
  failure: boolean;
  pending: boolean;
  onConfirm: () => void;
}

export const LoginConfirmCode = ({
  control,
  changePhoneNumber,
  failure,
  pending,
  phone,
  disabled,
  onConfirm,
}: Props) => {
  const DEFAULT_SECONDS = 90;
  const { confirmCodeError, smsError } = useLoginStore();
  const { mutateAsync: sendPhoneNumber, status } = useSendPhoneNumberMutation();
  const [countdown, setCountdown] = useState(DEFAULT_SECONDS);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const onSendSMS = async () => {
    await sendPhoneNumber(phone);
    setCountdown(DEFAULT_SECONDS);
  };

  useIsomorphicLayoutEffect(() => {
    if (countdown === 0 && timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    if (countdown > 0 && !timerRef.current) {
      timerRef.current = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [countdown]);

  return (
    <>
      <div className="flex flex-col lg:gap-4 gap-2">
        <p className="font-bold text-center md:text-[32px] text-[20px] lg:leading-[100%] leading-[120%] text-black-100">
          Введите код подтверждения
        </p>
        <p className="font-normal text-center text-black-700 lg:text-[18px] text-sm lg:leading-[120%] leading-[110%]">
          Код был отправлен на номер <span className=" font-bold">{phone}</span>
        </p>
      </div>

      <button
        onClick={changePhoneNumber}
        tabIndex={-1}
        type="button"
        className=" w-fit mx-auto text-primary-blue font-bold leading-[120%]"
      >
        Изменить номер телефона
      </button>

      <div className=" w-full flex flex-col gap-4">
        <div className=" w-full flex flex-col gap-6">
          <div className=" w-full h-fit flex flex-col gap-3">
            <Controller
              control={control}
              name="confirm_code"
              render={({ field }) => (
                <InputOTP
                  maxLength={5}
                  disabled={pending}
                  {...field}
                  onChange={(value) => {
                    const numericValue = value.replace(/\D/g, "");
                    field.onChange(numericValue);
                  }}
                  onComplete={(value) => {
                    if (value.length === 5 && !pending) {
                      onConfirm();
                    }
                  }}
                >
                  <InputOTPGroup className="flex gap-2">
                    <ListItems
                      items={[0, 1, 2, 3, 4]}
                      render={(_, index) => (
                        <InputOTPSlot
                          key={index}
                          index={index}
                          inputMode="numeric"
                          className={cn(
                            "first:rounded-[12px] last:rounded-[12px] rounded-[12px] text-[32px] shadow-none font-bold",
                            failure &&
                              "border-primary-red bg-primary-light-white focus:bg-primary-red"
                          )}
                        />
                      )}
                    />
                  </InputOTPGroup>
                </InputOTP>
              )}
            />
            {!!confirmCodeError && (
              <span className=" mx-auto text-sm font-semibold text-primary-red">
                {confirmCodeError}
              </span>
            )}
          </div>

          <Button
            type="button"
            onClick={onConfirm}
            disabled={disabled || pending}
            className="bg-secondary-blue text-primary-blue h-[62px] rounded-2xl text-[18px] leading-[120%] font-bold shadow-none"
          >
            {pending ? <LoadingSpinner size={24} /> : "Подтвердить"}
          </Button>
        </div>

        <div className=" w-fit mx-auto h-fit flex flex-col items-center text-center gap-2">
          <button
            disabled={status === "pending" || countdown > 0}
            type="button"
            onClick={onSendSMS}
            className={cn(
              " w-full flex items-center gap-2 text-black-100/40 font-bold disabled:opacity-50 disabled:cursor-not-allowed",
              !!smsError && "text-primary-red"
            )}
          >
            {pending || status === "pending" ? (
              <LoadingSpinner
                size={24}
                className={cn(
                  smsError ? "text-primary-red" : " text-black-100/40"
                )}
              />
            ) : (
              <RotateCw size={24} />
            )}
            {countdown > 0
              ? `Запросить повторно через ${Math.floor(
                  countdown / DEFAULT_SECONDS
                )}:${String(countdown % DEFAULT_SECONDS).padStart(2, "0")}`
              : "Запросить повторно"}
          </button>
          {!!smsError && (
            <span className=" text-sm text-primary-red font-medium">
              {smsError}
            </span>
          )}
        </div>
      </div>
    </>
  );
};
