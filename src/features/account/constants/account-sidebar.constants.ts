import cube from "@/assets/icons/cube.svg";
import bonus from "@/assets/icons/bonus.svg";
// import location from "@/assets/icons/location.svg";
import swatch from "@/assets/icons/swatch-icon.svg";
import briefcase from "@/assets/icons/briefcase.svg";
import doc from "@/assets/icons/doc-icon.svg";
import call from "@/assets/icons/icon-call.svg";

export const ACCOUNT_SIDEBAR_LINKS = [
  {
    icon: cube,
    label: "Мои заказы",
    href: "/account/orders",
    device: "all",
  },
  {
    icon: bonus,
    label: "Моя карта",
    href: "/account/card",
    device: "all",
  },
  // {
  //   icon: location,
  //   label: "Адрес доставки",
  //   href: "/account/delivery-address",
  //   device: "mobile",
  // },
  {
    icon: briefcase,
    label: "Работа у нас",
    href: "/vacancies",
    device: "mobile",
  },
  {
    icon: doc,
    label: "Условия и соглашения",
    href: "/user-agreement",
    device: "mobile",
  },
  {
    icon: swatch,
    label: "Для арендодателей и поставщиков",
    href: "/landlords",
    device: "mobile",
  },
  {
    icon: call,
    label: "Контакты",
    href: "/contacts",
    device: "mobile",
  },
];

export type AccountSidebarLinkProps = (typeof ACCOUNT_SIDEBAR_LINKS)[0];
