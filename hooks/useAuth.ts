import axios from "axios";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

export function useLogin({ endpoint }: { endpoint: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(
        `${process.env.BASE_URL}/api/${endpoint}`,
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
