"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MaskedInput } from "@/components/ui/masked-input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { UserProps } from "@/types/user.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useUpdateProfileAgreementsMutation } from "../hooks/mutations/useUpdateProfileAgreementsMutation";
import { useUpdateProfileMutation } from "../hooks/mutations/useUpdateProfileMutation";
import { profileSchema, ProfileSchema } from "../schemas/profile.schema";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import {useIsomorphicLayoutEffect} from "@/hooks/useIsomorphicLayoutEffect";
import {cn} from "@/lib/utils";

interface Props {
  user: UserProps;
}

export const AccountProfileForm = ({ user }: Props) => {
  const { mutateAsync: updateProfile, status: updateProfileStatus } = useUpdateProfileMutation();
  const { mutateAsync: updateProfileAgreements, status: updateProfileAgreementsStatus } =
    useUpdateProfileAgreementsMutation();
  const pending = updateProfileAgreementsStatus === "pending" || updateProfileStatus === "pending";

  const form = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema),
    mode: "onChange",
    shouldFocusError: true,
    defaultValues: {
      first_name: user.first_name || "",
      last_name: user.last_name || "",
      birth_date: user.birth_date || "",
      phone: user.phone || "",
      email: user.email || "",
      gender: user.gender || false,
      email_agreement: user.email_agreement || false,
      push_agreement: user.push_agreement || false,
      sms_agreement: user.sms_agreement || false,
    },
  });

  useIsomorphicLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onCancel = () => {
    form.reset();
  };

  const initialValues = form.getValues();
  const onSubmit = form.handleSubmit(async (values) => {
    try {
      const { sms_agreement, push_agreement, email_agreement, ...profileData } = values;
      const {
        sms_agreement: init_sms,
        push_agreement: init_push,
        email_agreement: init_email,
        ...initProfileData
      } = initialValues;

      const isProfileChanged = Object.keys(profileData).some(
        (key) => profileData[key as keyof typeof profileData] !== initProfileData[key as keyof typeof initProfileData]
      );

      const isAgreementChanged =
        sms_agreement !== init_sms || push_agreement !== init_push || email_agreement !== init_email;

      const promises = [];

      if (isProfileChanged) {
        promises.push(updateProfile(profileData));
      }

      if (isAgreementChanged) {
        promises.push(updateProfileAgreements({ email_agreement, push_agreement, sms_agreement }));
      }

      if (promises.length > 0) {
        await Promise.all(promises);
          if (isProfileChanged && isAgreementChanged) {
            toast.success("Профиль и соглашения успешно обновлены");
          } else if (isProfileChanged) {
            toast.success("Профиль успешно обновлён");
          } else if (isAgreementChanged) {
            toast.success("Соглашения успешно обновлены");
          }
      } else {
        toast.info("Нет изменений для сохранения");
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  });

  const inputClass = (error?: boolean) =>
      `h-[62px] rounded-2xl text-[18px] border focus:outline-none focus:outline-[5px] focus:ring-2 focus-visible:ring-2 ${
          error
              ? "border-red-500 focus:border-red-500 focus:ring-red-500 focus-visible:ring-red-500"
              : "border-gray-200 focus:border-primary-blue focus:ring-primary-blue focus-visible:ring-primary-blue "
      }`;

  return (
    <form onSubmit={onSubmit} className=" w-full p-6 rounded-2xl flex flex-col gap-10 bg-white-500 shadow-sm">
      <p className=" font-bold 1144:text-[40px] text-[32px] leading-[100%]">Профиль</p>
      <div className=" w-full flex flex-col gap-6">
        <p className=" 1144:text-[32px] text-[24px] font-bold leading-[100%]">Личные данные</p>
        <div className=" w-full grid 1144:grid-cols-3 gap-4">
          <div className=" w-full flex flex-col gap-2">
            <label
              htmlFor="first_name"
              className=" text-sm font-medium leading-[110%] cursor-pointer w-fit"
            >
              Имя
            </label>
            <Controller
              control={form.control}
              name="first_name"
              render={({ field, fieldState }) => (
                <>
                  <Input
                    id="first_name"
                    disabled={pending}
                    placeholder="Ваше имя"
                    className={cn("h-[62px] rounded-2xl bg-primary-light-white border-none shadow-none leading-[120px] text-[18px]", inputClass(!!fieldState.error))}
                    {...field}
                  />
                  {fieldState.error && (
                      <p className="text-sm text-red-500">
                        {fieldState.error.message}
                      </p>
                  )}
                </>
              )}
            />
          </div>
          <div className=" w-full flex flex-col gap-2">
            <label
              htmlFor="last_name"
              className=" text-sm font-medium leading-[110%] cursor-pointer w-fit"
            >
              Фамилия
            </label>
            <Controller
              control={form.control}
              name="last_name"
              render={({ field, fieldState }) => (
                <>
                  <Input
                    id="last_name"
                    disabled={pending}
                    placeholder="Ваша фамилия"
                    className={cn("h-[62px] rounded-2xl bg-primary-light-white border-none shadow-none leading-[120px] text-[18px]", inputClass(!!fieldState.error))}
                    {...field}
                  />
                  {fieldState.error && (
                      <p className="text-sm text-red-500">
                        {fieldState.error.message}
                      </p>
                  )}
                </>
              )}
            />
          </div>
          <div className=" w-full flex flex-col gap-2">
            <label
              htmlFor="birth_date"
              className=" text-sm font-medium leading-[110%] cursor-pointer w-fit"
            >
              Дата рождения
            </label>
            <Controller
                control={form.control}
                name="birth_date"
                render={({ field, fieldState }) => (
                    <>
                      <MaskedInput
                          id="birth_date"
                          disabled={pending}
                          mask="0000/00/00"
                          pattern="YYYY/m/d"
                          placeholder="ГГГГ/ММ/ДД"
                          className={cn("h-[62px] rounded-2xl bg-primary-light-white border-none shadow-none leading-[120px] text-[18px]", inputClass(!!fieldState.error))}
                          {...field}
                          ref={field.ref}
                      />

                      {fieldState.error && (
                          <p className="text-sm text-red-500">
                            {fieldState.error.message}
                          </p>
                      )}
                    </>
                )}
            />
          </div>
          <div className=" w-full flex flex-col gap-2">
            <label htmlFor="phone" className=" text-sm font-medium leading-[110%] cursor-pointer w-fit">
              Телефон
            </label>
            <Controller
              control={form.control}
              name="phone"
              disabled={true}
              render={({ field, fieldState }) => (
                <MaskedInput
                  id="phone"
                  disabled={pending}
                  mask="+{7} (000) 000-00-00"
                  placeholder="+7 (999) 999-99-99"
                  className={cn("h-[62px] rounded-2xl bg-primary-light-white border-none shadow-none leading-[120px] text-[18px]", inputClass(!!fieldState.error))}
                  {...field}
                />
              )}
            />
          </div>
          <div className=" w-full flex flex-col gap-2">
            <label htmlFor="email" className=" text-sm font-medium leading-[110%] cursor-pointer w-fit">
              Email
            </label>
            <Controller
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <>
                  <Input
                    id="email"
                    disabled={pending}
                    placeholder="Введите Email"
                    className={cn("h-[62px] rounded-2xl bg-primary-light-white border-none shadow-none leading-[120px] text-[18px]", inputClass(!!fieldState.error))}
                    {...field}
                  />
                  {fieldState.error && (
                      <p className="text-sm text-red-500">
                        {fieldState.error.message}
                      </p>
                  )}
                </>
              )}
            />
          </div>
          <div className=" w-full flex flex-col justify-center gap-2">
            <span className=" text-sm leading-[110%]">Пол</span>
            <Controller
              control={form.control}
              name="gender"
              render={({ field }) => (
                <RadioGroup
                  className=" w-fit flex items-center gap-8"
                  value={field.value ? "male" : "female"}
                  onValueChange={(val) => field.onChange(val === "male")}
                  disabled={pending}
                >
                  <div className=" w-fit flex items-center gap-2">
                    <RadioGroupItem id="male" value="male" />
                    <label htmlFor="male" className="text-sm font-medium leading-[120%] cursor-pointer w-fit">
                      Мужской
                    </label>
                  </div>
                  <div className=" w-fit flex items-center gap-2">
                    <RadioGroupItem id="female" value="female" />
                    <label htmlFor="female" className="text-sm font-medium leading-[120%] cursor-pointer w-fit">
                      Женский
                    </label>
                  </div>
                </RadioGroup>
              )}
            />
          </div>
        </div>
      </div>
      <div className=" w-full max-w-[403px] flex flex-col gap-10">
        <div className=" w-full max-w-[403px] flex flex-col gap-6">
          <p className=" 1144:text-[32px] text-[24px] font-bold leading-[100%]">Уведомления</p>
          <div className=" w-full flex flex-col gap-4">
            <div className=" w-full flex items-center justify-between gap-2 py-2">
              <label htmlFor="sms" className=" text-[18px] font-bold leading-[120%] cursor-pointer">
                SMS
              </label>
              <Controller
                control={form.control}
                name="sms_agreement"
                render={({ field }) => (
                  <Switch id="sms" disabled={pending} checked={field.value} onCheckedChange={field.onChange} />
                )}
              />
            </div>
            <div className=" w-full flex items-center justify-between gap-2 py-2">
              <label htmlFor="email_agreement" className=" text-[18px] font-bold leading-[120%] cursor-pointer">
                E-mail
              </label>
              <Controller
                control={form.control}
                name="email_agreement"
                render={({ field }) => (
                  <Switch
                    id="email_agreement"
                    disabled={pending}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </div>
            <div className=" w-full flex items-center justify-between gap-2 py-2">
              <label htmlFor="notification" className=" text-[18px] font-bold leading-[120%] cursor-pointer">
                Push-уведомления
              </label>
              <Controller
                control={form.control}
                name="push_agreement"
                render={({ field }) => (
                  <Switch id="notification" disabled={pending} checked={field.value} onCheckedChange={field.onChange} />
                )}
              />
            </div>
          </div>
        </div>

        <div className=" w-full flex flex-col gap-6">
          <p className=" text-sm leading-[110%]">
            Нажимая на кнопку “Сохранить”, я подтверждаю свое согласие на обработку персональных данных
          </p>

          <div className=" w-full grid 1144:grid-cols-2 gap-10">
            <Button disabled={pending} className=" w-full font-bold text-[18px] leading-[120%] h-[62px] rounded-2xl">
              {pending ? <LoadingSpinner size={24} className=" text-white-100" /> : "Сохранить"}
            </Button>
            <Button
              disabled={pending}
              onClick={onCancel}
              type="button"
              variant="ghost"
              className=" w-full font-bold text-[18px] leading-[120%] h-[62px] rounded-2xl text-primary-blue"
            >
              Отменить
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};
