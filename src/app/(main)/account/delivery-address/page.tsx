import {AccountSectionTitle} from "@/features/account/components/account-section-title";
import {DeliveryAddressCard} from "@/features/account/delivery-address/components/delivery-address-card";
import {AddDeliveryAddressButton} from "@/features/account/delivery-address/components/add-delivery-address-button";

export default function DeliveryAddressPage() {
  return (
      <div className=" w-full h-fit bg-white-500 rounded-[18px] p-6 flex flex-col gap-6 shadow-sm">
        <div className=" w-fit flex flex-col gap-4">
          <AccountSectionTitle>Адреса доставки</AccountSectionTitle>
          <p className=" 1144:text-[24px] text-[18px] leading-[120%]">
            Сохраняйте адреса, чтобы не вводить их при каждом заказе
          </p>
        </div>

        <div className=" w-full h-fit flex flex-col gap-4">
          <DeliveryAddressCard title="Дом" />
          <DeliveryAddressCard title="Работа" />
          <DeliveryAddressCard title="Квартира родителей" />
        </div>

        <AddDeliveryAddressButton />
      </div>
  )
}
