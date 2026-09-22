import { getCookie, removeCookie, setCookie } from "./cookies";

const ACCESS_TOKEN_COOKIE_OPTIONS = {
  path: "/",
  sameSite: "lax" as const,
};

export function getAccessToken() {
  return getCookie("access_token");
}

export function setAccessToken(token: string) {
  setCookie("access_token", token, ACCESS_TOKEN_COOKIE_OPTIONS);
}

export function syncAccessTokenCookie(token: string) {
  const existing = getAccessToken();
  if (existing !== token) {
    setAccessToken(token);
  }
}

export function ensureAccessTokenCookie(token: string | null | undefined): boolean {
  if (!token) return false;
  syncAccessTokenCookie(token);
  return true;
}

export function removeAccessToken() {
  removeCookie("access_token");
}
