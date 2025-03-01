import axios from "axios";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import Constants from "expo-constants";

const BASE_URL = Constants?.expoConfig?.extra?.baseUrl;

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

      await SecureStore.setItemAsync("access_token", res.data.accessToken);
      await SecureStore.setItemAsync("refresh_token", res.data.refreshToken);
      console.log(res.data);
      return res.data;
    } catch (error) {
      setError("Login Failed please check credetials");
      console.log("Login Failed", error);
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
