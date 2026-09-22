import { api } from "@/configs/axios";
import { useUserStore } from "@/stores/useUserStore";
import { QUERY_KEYS } from "@/types/query-keys.enum";
import { UserProps } from "@/types/user.types";
import { getAccessToken, syncAccessTokenCookie } from "@/utils/access-token";
import { bearerToken } from "@/utils/bearer-token";
import { useQuery } from "@tanstack/react-query";
import { useIsomorphicLayoutEffect } from "../useIsomorphicLayoutEffect";
import { isAxiosError } from "axios";

export const useInitializeUser = () => {
  const { hydrated, token, setUser, setToken, setStatus, logoutFn } = useUserStore();

  useIsomorphicLayoutEffect(() => {
    if (!hydrated) return;

    const cookieToken = getAccessToken();
    const { token: storeToken, user } = useUserStore.getState();

    if (cookieToken) {
      if (cookieToken !== storeToken) {
        setToken(cookieToken);
      }
      return;
    }

    if (storeToken) {
      syncAccessTokenCookie(storeToken);
      return;
    }

    if (user) {
      logoutFn();
      return;
    }

    setStatus("success");
  }, [hydrated, setToken, setStatus, logoutFn]);

  const query = useQuery({
    queryKey: [QUERY_KEYS.USER, token],
    enabled: hydrated && !!token,
    queryFn: async (): Promise<UserProps> => {
      const response = await api.get<UserProps>("/user", {
        headers: { Authorization: bearerToken(token!) },
      });
      return response.data;
    },
    retry: (_, error) => !(isAxiosError(error) && error.response?.status === 401),
  });

  useIsomorphicLayoutEffect(() => {
    if (!hydrated) return;

    if (!token) {
      const { user } = useUserStore.getState();
      if (!user) {
        setStatus("success");
      }
      return;
    }

    if (query.isPending) {
      setStatus("pending");
      return;
    }

    if (query.isSuccess) {
      setUser(query.data);
      setStatus("success");
      return;
    }

    if (query.isError) {
      if (isAxiosError(query.error) && query.error.response?.status === 401) {
        logoutFn();
      } else {
        setStatus("error");
      }
    }
  }, [
    hydrated,
    token,
    query.isPending,
    query.isSuccess,
    query.isError,
    query.data,
    query.error,
    setUser,
    setStatus,
    logoutFn,
  ]);

  return query;
};
