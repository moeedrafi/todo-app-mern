import { AuthContextType, User } from "@/utils/types";
import { useContext, useState, createContext } from "react";

const AuthContext = createContext<AuthContextType | undefined>({
  user: null,
  isLoggedIn: false,
  isAuthenticated: false,
  isLoading: false,
  setUser: () => {},
  setIsLoggedIn: () => {},
  setIsAuthenticated: () => {},
  setIsLoading: () => {},
  register: () => {},
  login: () => {},
  logout: () => {},
  checkAuth: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const register = async () => {};
  const login = async () => {};
  const logout = async () => {};
  const checkAuth = async () => {};

  const value = {
    user,
    setUser,
    isLoggedIn,
    setIsLoggedIn,
    isAuthenticated,
    setIsAuthenticated,
    isLoading,
    setIsLoading,
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
    throw new Error("useUser must be used within a UserContextProvider.");
  }
  return context;
};
