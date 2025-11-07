// api.ts
import axios from "axios";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const $axios = axios.create({
  withCredentials: true,
  baseURL: `${API_URL}/api`,
});

const $api = axios.create({
  withCredentials: true,
  baseURL: `${API_URL}/api`,
});

let unauthorizedHandler: (() => void) | null = null;

export const setUnauthorizedHandler = (cb: () => void) => {
  unauthorizedHandler = cb;
};

$api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

$api.interceptors.response.use(
  (res) => res,
  (err) => {
    const msg =
      err.response?.data?.message ||
      err.message ||
      "Serverda xatolik yuz berdi!";
    toast.error("Xatolik!", { description: msg });

    if (err.response?.status === 401 || err.response?.status === 403) {
      localStorage.removeItem("accessToken");
      if (unauthorizedHandler) unauthorizedHandler();
    }
    return Promise.reject(err);
  }
);

export { $api, $axios, API_URL };
