import axios from "axios";
import * as SecureStore from "expo-secure-store";
import Constants from "expo-constants";
import { useRouter } from "expo-router";
import { useState } from "react";
const BASE_URL = Constants?.expoConfig?.extra?.baseUrl;

export default function useRefresh() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const token = SecureStore.getItem("refresh_token");
  const router = useRouter();
  const refreshToken = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${BASE_URL}/api/refresh`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (res.status === 200) {
        await SecureStore.setItemAsync("access_token", res.data.accessToken);
        await SecureStore.setItemAsync("refresh_token", res.data.refreshToken);
        router.replace("/(tabs)");
      }
    } catch (error: any) {
      if (error.response) {
        router.replace({ pathname: "/(auth)/login" });
      }
      setError(error.response);
    } finally {
      setLoading(false);
    }
  };

  return { refreshToken, loading, error };
}
