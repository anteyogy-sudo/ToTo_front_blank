"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {useState} from "react";
import {useForm, useWatch} from "react-hook-form";
import { useConfirmCodeMutation } from "../hooks/mutations/useConfirmCodeMutation";
import { useSendPhoneNumberMutation } from "../hooks/mutations/useSendPhoneNumberMutation";
import { LoginConfirmCode } from "./LoginConfirmCode";
import { LoginFirstNameLastName } from "./LoginFirstNameLastName";
import { LoginPhoneNumber } from "./LoginPhoneNumber";
import { api } from "@/configs/axios";
import { UserProps } from "@/types/user.types";
import { useRouter } from "next/navigation";
import { useUpdateUserFullnameMutation } from "../hooks/mutations/useUpdateUserFullnameMutation";
import { setAccessToken } from "@/utils/access-token";
import { useAuthDialogStore } from "@/stores/useAuthDialogStore";
import {useUserStore} from "@/stores/useUserStore";
import Link from "next/link";
import {useCartStore} from "@/stores/useCartStore";
import {createLoginSchema, LoginFormValues} from "@/features/navbar/schemas/login.schema";

enum LoginStep {
  PhoneNumber,
  ConfirmCode,
  Name,
}

type FormValues = {
  phone: string;
  confirm_code: string;
  first_name: string;
  last_name: string;
};

interface Props {
  onClose: () => void;
}

export const LoginForm = ({ onClose }: Props) => {

  const [currentStep, setCurrentStep] = useState<LoginStep>(
    LoginStep.PhoneNumber
  );

  const { setUser, setToken: setUserToken, setStatus } = useUserStore();

  const { withRedirect } = useAuthDialogStore();
  const [token, setToken] = useState<string | null>(null);
  const { mutateAsync: sendPhoneNumber, status: phoneStatus } =
    useSendPhoneNumberMutation();
  const { mutateAsync: confirmCode, status: confirmStatus } =
    useConfirmCodeMutation();
  const { mutateAsync: updateFullname, status: fullnameStatus } =
    useUpdateUserFullnameMutation();
  const router = useRouter();

  const schema = createLoginSchema(currentStep);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      phone: "",
      confirm_code: "",
      first_name: "",
      last_name: "",
    },
  });

  const phone = useWatch({
    control: form.control,
    name: "phone",
  });

  const handleBackToPhone = () => {
    setCurrentStep(LoginStep.PhoneNumber);
    form.setValue("confirm_code", "");
    form.setValue("phone", "");
  };

  const handleNextStep = async (values: FormValues) => {
    if (typeof window === "undefined") return;

    const cleanedPhone = values.phone.replace(/\D/g, "");

    switch (currentStep) {
      case LoginStep.PhoneNumber: {
        if (!form.formState.isValid) return;

        const cleanedPhone = values.phone
            .replace(/\D/g, "");

        await sendPhoneNumber(cleanedPhone);
        break;
      }

      case LoginStep.ConfirmCode: {
        if (values.confirm_code) {
          const data = await confirmCode({
            phone: cleanedPhone,
            code: values.confirm_code,
          });

          setToken(data.token);

          const userResponse = await api.get<UserProps>("/user", {
            headers: { Authorization: `Bearer ${data.token}` },
          });

          const userData = userResponse.data;

          if (userData.first_name) {
            setUser(userData);
            setUserToken(data.token);
            setAccessToken(data.token);
            setStatus("success");
            useCartStore.getState().mergeCart();
            if (withRedirect) {
              router.replace("/account");
            }
            onClose();
            return;
          }
        }
        break;
      }

      case LoginStep.Name: {
        if (values.last_name && values.first_name && token) {
          const response =  await updateFullname({
            first_name: values.first_name,
            last_name: values.last_name,
            token,
          });

          setAccessToken(token);

          if (withRedirect) {
            router.replace("/account");
          }

          setUserToken(token);
          setUser(response.data);
          setStatus("success");

          onClose();
        }
        return;
      }
    }

    setCurrentStep((prev) => {
      return prev + 1;
    });
  };

  const handleSubmitForm = form.handleSubmit(handleNextStep);

  return (
    <form onSubmit={handleSubmitForm} className="w-full flex flex-col gap-6">
      {currentStep === LoginStep.PhoneNumber && (
        <LoginPhoneNumber
          control={form.control}
          pending={phoneStatus === "pending"}
          disabled={!form.formState.isValid}
        />
      )}

      {currentStep === LoginStep.ConfirmCode && !!phone && (
        <LoginConfirmCode
          control={form.control}
          changePhoneNumber={handleBackToPhone}
          phone={phone}
          failure={confirmStatus === "error"}
          disabled={!form.formState.isValid}
          pending={confirmStatus === "pending"}
          onConfirm={handleSubmitForm}
        />
      )}

      {currentStep === LoginStep.Name && (
        <LoginFirstNameLastName
          control={form.control}
          pending={fullnameStatus === "pending"}
          disabled={!form.formState.isValid}
        />
      )}

      {currentStep < LoginStep.Name && (
        <p className="text-[12px] leading-[110%] text-center w-full">
            Продолжая пользоваться сайтом, Вы даете согласие на {' '}
            <Link href='/privacy-policy' onClick={onClose} className='underline'>
                 обработку персональных данных и программу лояльности
            </Link>
        </p>
      )}
    </form>
  );
};
