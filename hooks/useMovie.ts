import axios, { AxiosError } from "axios";
import { useState } from "react";
import Constants from "expo-constants";
import * as SecureStore from "expo-secure-store";
import useRefresh from "./useRefresh";
const BASE_URL = Constants?.expoConfig?.extra?.baseUrl;

export function useMovie() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { refreshToken } = useRefresh();

  const getMovieById = async (id: string) => {
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
        return getMovieById(id);
      }
      setError("Could not find movie with this movie Id");
      // return error;
    } finally {
      setLoading(false);
    }
  };

  const getMoviesByGenre = async (genre: string, limit: number) => {
    const accessToken = await SecureStore.getItemAsync("access_token");

    try {
      const res = await axios.get(`${BASE_URL}/api/content/${genre}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: {
          limit: limit,
        },
      });
      return res.data.movies;
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        console.log("refreshing");
        await refreshToken();
        return getMoviesByGenre(genre, limit);
      }
      setError("Could not find movie with this movie Id");
    } finally {
      setLoading(false);
    }
  };

  return { getMovieById, getMoviesByGenre, loading, error };
}
