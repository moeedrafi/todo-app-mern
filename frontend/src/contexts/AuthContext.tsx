import { User } from "@/utils/types/types";
import { checkAuth } from "@/services/authService";
import { useContext, useState, createContext, useEffect } from "react";
import { setAccessToken } from "@/utils/tokenManager";

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  isLoggedIn: boolean;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const initializeAuth = async () => {
      const isAuth = await checkAuth();

      if (isAuth.success) {
        setUser(isAuth.data.user);
        setIsLoggedIn(true);
        setAccessToken(isAuth.data.accessToken);
      } else {
        setUser(null);
        setIsLoggedIn(false);
        setAccessToken(null);
      }

      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const value = {
    user,
    isLoading,
    isLoggedIn,
    setUser,
    setIsLoggedIn,
    setIsLoading,
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
