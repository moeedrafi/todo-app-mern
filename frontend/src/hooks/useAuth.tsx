import { AxiosResponse } from "axios";
import { useContext, useState, createContext } from "react";

import API from "@/utils/api";
import { AuthContextType, AuthResponse, User } from "@/utils/types";
import { setAccessToken as setGlobalToken } from "@/utils/tokenManager";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isVerified, setIsVerified] = useState<boolean>(false);

  const register = async (data: {
    email: string;
    password: string;
    username: string;
  }) => {
    setIsLoading(true);

    try {
      const response: AxiosResponse<AuthResponse> = await API.post(
        "/api/v1/users/register",
        data
      );

      const { accessToken, user } = response.data;

      setAccessToken(accessToken);
      setGlobalToken(accessToken);
      setUser(user);
      setIsLoggedIn(true);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials: { email: string; password: string }) => {
    setIsLoading(true);

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
      setIsLoading(false);
    } catch (error) {
      console.log("Login failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {};

  const checkAuth = async () => {};

  const value = {
    user,
    isLoading,
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
