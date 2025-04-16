import { z } from "zod";
import { registerSchema } from "@/utils/schemas/authSchema";

export type TabsType = "All" | "Completed" | "Pending";

export type AuthContextType = {
  user: User | null;
  isLoggedIn: boolean;
  accessToken: string | null;
  isVerified: boolean;
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setIsVerified: React.Dispatch<React.SetStateAction<boolean>>;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  register: (prevState: FormState, formData: FormData) => Promise<FormState>;
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

export type FormState = {
  success?: string;
  error?: string;
};

export type RegisterSchemaType = z.infer<typeof registerSchema>;
