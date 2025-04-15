import { AxiosResponse } from "axios";
import { useContext, useState, createContext } from "react";

import API from "@/utils/api";
import { AuthContextType, AuthResponse, User } from "@/utils/types";
import { setAccessToken as setGlobalToken } from "@/utils/tokenManager";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const register = async () => {};

  const login = async (credentials: { email: string; password: string }) => {
    const response: AxiosResponse<AuthResponse> = await API.post(
      "/api/v1/users/login",
      credentials
    );

    const { accessToken, user } = response.data;

    setAccessToken(accessToken);
    setGlobalToken(accessToken);
    setUser(user);
    setIsLoggedIn(true);
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
    isAuthenticated,
    setIsAuthenticated,
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
