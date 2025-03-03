import axios from "axios";
import { useState } from "react";
import * as SecureStore from "expo-secure-store";
import Constants from "expo-constants";
import { useRecoilState, useSetRecoilState } from "recoil";
import { authState, userState } from "@/atoms/atom";
import useRefresh from "./useRefresh";

const BASE_URL = Constants?.expoConfig?.extra?.baseUrl;

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useRecoilState(userState);
  const setIsAuthenticated = useSetRecoilState(authState);
  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(
        `${BASE_URL}/api/user/login`,
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        },
      );
      setUser({
        Id: res.data?.user?._id,
        Email: res.data?.user?.email,
      });

      if (res.status === 200) {
        await SecureStore.setItemAsync("access_token", res.data.accessToken);
        await SecureStore.setItemAsync("refresh_token", res.data.refreshToken);
        await SecureStore.setItemAsync("userId", res.data.user._id);
        setIsAuthenticated(true);
      }

      return res.data;
    } catch (error: any) {
      if (error.response) {
        setError("Login Failed please check credetials");
        setIsAuthenticated(false);
      }
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
}

export function useRegister() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (email: string, password: string) => {
    setLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/api/user`, {
        email: email,
        password: password,
      });
      return res.data;
    } catch (error) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error };
}

export function useAuthCheck() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useRecoilState(authState);
  const { refreshToken } = useRefresh();

  const checkAuth = async () => {
    const access_token = await SecureStore.getItemAsync("access_token");
    const userId = await SecureStore.getItemAsync("userId");
    setLoading(true);
    try {
      if (access_token) {
        const res = await axios.get(`${BASE_URL}/api/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });

        if (res.status === 200) {
          setIsAuthenticated(true);
        }
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        await refreshToken(); // Ensure refreshToken is a function
        setIsAuthenticated(false);
      } else {
        setError(error.message || "An error occurred");
      }
    } finally {
      setLoading(false);
    }
  };
  return { isAuthenticated, checkAuth, loading, error };
}
