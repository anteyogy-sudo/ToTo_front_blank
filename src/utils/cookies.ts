import Cookies from "js-cookie";

export const getCookie = (key: string) => {
  return Cookies.get(key);
};

export const setCookie = (key: string, value: string, options?: Cookies.CookieAttributes) => {
  Cookies.set(key, value, options);
};

export const removeCookie = (key: string) => {
  Cookies.remove(key);
};
