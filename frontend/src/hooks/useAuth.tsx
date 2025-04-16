import { AxiosError, AxiosResponse } from "axios";
import { useContext, useState, createContext } from "react";

import API from "@/utils/api";
import { AuthContextType, AuthResponse, FormState, User } from "@/utils/types";
import { setAccessToken as setGlobalToken } from "@/utils/tokenManager";

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
    const email = formData.get("email") as string;
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    if (!email) {
      return { error: "Email required" };
    }

    if (!username) {
      return { error: "username required" };
    }

    if (!password) {
      return { error: "Password req" };
    }

    if (password.length < 8) {
      return { error: "Password must be at least 8 characters." };
    }

    if (username.length < 2) {
      return { error: "Username must be at least 2 characters." };
    }

    try {
      const response: AxiosResponse<AuthResponse> = await API.post(
        "/api/v1/users/register",
        { email, username, password }
      );

      const { accessToken, user } = response.data;

      setAccessToken(accessToken);
      setGlobalToken(accessToken);
      setUser(user);
      setIsLoggedIn(true);

      return { success: "Registration successful!" };
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      return { error: err?.response?.data?.message || "Something went wrong." };
    }
  };

  const login = async (credentials: { email: string; password: string }) => {
    try {
      const response: AxiosResponse<AuthResponse> = await API.post(
        "/api/v1/users/login",
        credentials
      );

      const { accessToken, user } = response.data;

      setAccessToken(accessToken);
      setGlobalToken(accessToken);
      setUser(user);
      setIsLoggedIn(true);
    } catch (error) {
      console.log("Login failed", error);
    }
  };

  const logout = async () => {};

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
    logout,
    checkAuth,
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
