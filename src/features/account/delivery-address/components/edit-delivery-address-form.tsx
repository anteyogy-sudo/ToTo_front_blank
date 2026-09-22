"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

export const EditDeliveryAddressForm = () => {
  const form = useForm();

  return (
    <Form {...form}>
      <form className=" w-full flex flex-col gap-6">
        <FormField
          control={form.control}
          name="address_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className=" text-sm font-medium leading-[110.00000000000001%] text-black-100/70">
                Название адреса
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className=" h-[62px] rounded-2xl bg-primary-light-white border-none"
                  placeholder="Мой дом"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel className=" text-sm font-medium leading-[110.00000000000001%] text-black-100/70">
                Город
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className=" h-[62px] rounded-2xl bg-primary-light-white border-none"
                  placeholder="Москва"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="street"
          render={({ field }) => (
            <FormItem>
              <FormLabel className=" text-sm font-medium leading-[110.00000000000001%] text-black-100/70">
                Улица
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className=" h-[62px] rounded-2xl bg-primary-light-white border-none"
                  placeholder="Антеева"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className=" w-full grid grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="street"
            render={({ field }) => (
              <FormItem>
                <FormLabel className=" text-sm font-medium leading-[110.00000000000001%] text-black-100/70">
                  Дом
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className=" h-[62px] rounded-2xl bg-primary-light-white border-none"
                    placeholder="Антеева"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="street"
            render={({ field }) => (
              <FormItem>
                <FormLabel className=" text-sm font-medium leading-[110.00000000000001%] text-black-100/70">
                  Квартира / офис
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className=" h-[62px] rounded-2xl bg-primary-light-white border-none"
                    placeholder="1"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="street"
          render={({ field }) => (
            <FormItem>
              <FormLabel className=" text-sm font-medium leading-[110.00000000000001%] text-black-100/70">
                Комментарий для курьера
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className=" h-[62px] rounded-2xl bg-primary-light-white border-none"
                  placeholder="Необязательно"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className=" w-full flex flex-col gap-4">
          <Button className=" h-[48px] rounded-2xl text-[18px] font-bold leading-[120%]">
            Сохранить
          </Button>
          <Button
            type="button"
            className=" h-[48px] rounded-2xl text-[18px] font-bold leading-[120%] bg-primary-red"
          >
            Удалить адрес
          </Button>
        </div>
      </form>
    </Form>
  );
};
