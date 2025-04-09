export type TabsType = "All" | "Completed" | "Pending";

export type UserContextType = {
  user: null;
  isLoggedIn: boolean;
  isAuthenticated: boolean;
};

export type User = {
  email: string;
  username: string;
  avatar: string;
};
