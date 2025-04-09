export type TabsType = "All" | "Completed" | "Pending";

export type AuthContextType = {
  user: User | null;
  isLoggedIn: boolean;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  login: () => void;
  register: () => void;
  logout: () => void;
  checkAuth: () => void;
};

export type User = {
  email: string;
  username: string;
  avatar: string;
};
