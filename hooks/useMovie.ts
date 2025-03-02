import axios, { AxiosError } from "axios";
import { useState } from "react";
import Constants from "expo-constants";
import * as SecureStore from "expo-secure-store";
import useRefresh from "./useRefresh";
const BASE_URL = Constants?.expoConfig?.extra?.baseUrl;

export function useMovieById({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { refreshToken } = useRefresh();

  const getMovieById = async () => {
    setLoading(true);
    try {
      const accessToken = await SecureStore.getItemAsync("access_token");
      console.log("SecureStore access token ", accessToken);
      const res = await axios.get(`${BASE_URL}/api/movie/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log("response data✅", res.data);
      return res.data;
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        await refreshToken();
        return getMovieById();
      }
      setError("Could not find movie with this movie Id");
      // return error;
    } finally {
      setLoading(false);
    }
  };

  return { getMovieById, loading, error };
}

export function useMovieByGenre({ genre }: { genre: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { refreshToken } = useRefresh();

  const getMovies = async () => {
    const accessToken = await SecureStore.getItemAsync("access_token");

    try {
      const res = await axios.get(`${BASE_URL}/api/content/${genre}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return res.data;
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        await refreshToken();
        return getMovies();
      }
      setError("Could not find movie with this movie Id");
    } finally {
      setLoading(false);
    }
  };

  return { getMovies, loading, error };
}
