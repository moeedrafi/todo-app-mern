export type TabsType = "All" | "Completed" | "Pending";

export type AuthContextType = {
  user: User | null;
  isLoggedIn: boolean;
  accessToken: string | null;
  isAuthenticated: boolean;
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  register: (data: {
    email: string;
    password: string;
    username: string;
  }) => Promise<void>;
  logout: () => void;
  checkAuth: () => void;
};

export type AuthResponse = {
  accessToken: string;
  user: User;
};

export type User = {
  email: string;
  username: string;
  avatar: string;
};
