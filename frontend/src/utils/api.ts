import axios from "axios";
import { getAccessToken } from "@/utils/tokenManager";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

API.interceptors.request.use(
  (config) => {
    const token = getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete API.defaults.headers.common["Authorization"];
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
