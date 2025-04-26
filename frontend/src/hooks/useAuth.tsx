import { AxiosError, AxiosResponse } from "axios";
import { useContext, useState, createContext } from "react";

import API from "@/utils/api";
import { loginSchema, registerSchema } from "@/utils/schemas/authSchema";
import { setAccessToken as setGlobalToken } from "@/utils/tokenManager";
import {
  AuthContextType,
  FormState,
  LoginResponse,
  RegisterResponse,
  Response,
  User,
} from "@/utils/types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isVerified, setIsVerified] = useState<boolean>(false);

  const register = async (
    _: FormState,
    formData: FormData
  ): Promise<FormState> => {
    const rawData = {
      email: formData.get("email"),
      username: formData.get("username"),
      password: formData.get("password"),
    };

    const result = registerSchema.safeParse(rawData);
    if (!result.success) {
      return { error: result.error.message };
    }

    const { email, password, username } = result.data;

    try {
      const response: AxiosResponse<RegisterResponse> = await API.post(
        "/api/v1/users/register",
        { email, username, password }
      );

      const { message, data } = response.data;

      setUser(data);
      setIsLoggedIn(true);

      return { success: message };
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      return { error: err?.response?.data?.message || "Something went wrong." };
    }
  };

  const login = async (
    _: FormState,
    formData: FormData
  ): Promise<FormState> => {
    const rawData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const validatedFields = loginSchema.safeParse(rawData);
    if (!validatedFields.success) {
      return { error: "All Fields are required" };
    }

    const { email, password } = validatedFields.data;

    try {
      const response: AxiosResponse<LoginResponse> = await API.post(
        "/api/v1/users/login",
        { email, password }
      );

      const {
        message,
        data: { user, accessToken },
      } = response.data;

      setAccessToken(accessToken);
      setGlobalToken(accessToken);
      setUser(user);
      setIsLoggedIn(true);

      return { success: message };
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      return { error: err?.response?.data?.message || "Something went wrong." };
    }
  };

  const verifyEmail = async (token: string): Promise<FormState> => {
    if (!token) {
      return { error: "Token is Expired" };
    }

    try {
      const response = await API.post("/api/v1/users/verify-email", { token });

      return { success: response.data.message };
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      return { error: err?.response?.data?.message || "Something went wrong." };
    }
  };

  const forgotPassword = async (
    _: FormState,
    formData: FormData
  ): Promise<FormState> => {
    const email = formData.get("email");
    if (!email) {
      return { error: "Email is Required" };
    }

    try {
      const response: AxiosResponse<Response> = await API.post(
        "/api/v1/users/forgot-password",
        { email }
      );

      return { success: response.data.message };
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      return { error: err?.response?.data?.message || "Something went wrong." };
    }
  };

  const resetPassword = async (
    _: FormState,
    formData: FormData
  ): Promise<FormState> => {
    const token = formData.get("token");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (!token) {
      return { error: "Token expired!" };
    }
    if (!password || !confirmPassword) {
      return { error: "Missing fields" };
    }
    if (password !== confirmPassword) {
      return { error: "Password do not match" };
    }

    try {
      const response: AxiosResponse<Response> = await API.patch(
        "/api/v1/users/reset-password",
        { password, confirmPassword, token }
      );

      return { success: response.data.message };
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      return { error: err?.response?.data?.message || "Something went wrong." };
    }
  };

  const logout = async (): Promise<FormState> => {
    try {
      const response: AxiosResponse<Response> = await API.patch(
        "/api/v1/users/logout"
      );

      return { success: response.data.message };
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      return { error: err?.response?.data?.message || "Something went wrong." };
    }
  };

  const checkAuth = async () => {};

  const value = {
    user,
    accessToken,
    setAccessToken,
    setUser,
    isLoggedIn,
    setIsLoggedIn,
    isVerified,
    setIsVerified,
    register,
    login,
    verifyEmail,
    logout,
    checkAuth,
    forgotPassword,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider.");
  }
  return context;
};
