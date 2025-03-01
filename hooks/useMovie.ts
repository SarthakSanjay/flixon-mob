import axios from "axios";
import { useState } from "react";
import Constants from "expo-constants";
import * as SecureStore from "expo-secure-store";
const BASE_URL = Constants.expoConfig?.extra?.baseURl;

export function useMovieById({ endpoint }: { endpoint: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getMovieById = async () => {
    setLoading(true);
    try {
      const accessToken = await SecureStore.getItemAsync("access_token");
      const res = await axios.get(`${BASE_URL}/api${endpoint}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return res.data;
    } catch (error) {
      setError("Could not find movie with this movie Id");
    } finally {
      setLoading(false);
    }
  };

  return { getMovieById, loading, error };
}
