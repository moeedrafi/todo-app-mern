import axios from "axios";
import {
  clearTokens,
  getAccessToken,
  setAccessToken,
} from "@/utils/tokenManager";

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

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/users/refresh-user`,
          { withCredentials: true }
        );

        const { accessToken } = res.data.data;

        setAccessToken(accessToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        return API(originalRequest);
      } catch (refreshError) {
        clearTokens();
        await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/users/logout`);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default API;
