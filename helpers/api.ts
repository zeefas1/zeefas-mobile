import { auth } from "@/constants/auth";
import { getToken } from "@/helpers/secureStore";
import { useAuth } from "@/store/auth.store";
import axios from "axios";

const api = axios.create({
  baseURL: auth,
});

api.interceptors.request.use(async (config) => {
  const token = await getToken("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const auth = useAuth.getState();
      await auth.logout();
    }

    return Promise.reject(error);
  }
);

export default api;
