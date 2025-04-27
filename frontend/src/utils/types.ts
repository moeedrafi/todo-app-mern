import { z } from "zod";
import { loginSchema, registerSchema } from "@/utils/schemas/authSchema";

export type TabsType = "All" | "Completed" | "Pending";

export type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  isLoggedIn: boolean;
  accessToken: string | null;
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  login: (formData: FormData) => Promise<FormState>;
  register: (formData: FormData) => Promise<FormState>;
  verifyEmail: (token: string) => Promise<FormState>;
  forgotPassword: (formData: FormData) => Promise<FormState>;
  resetPassword: (formData: FormData) => Promise<FormState>;
  logout: () => Promise<FormState>;
  checkAuth: () => Promise<FormState>;
  updateAccount: (formData: FormData) => Promise<FormState>;
};

export type RegisterResponse = {
  data: User;
  message: string;
};

export type LoginResponse = {
  data: {
    user: User;
    accessToken: string;
  };
  message: string;
};

export type Response = {
  message: string;
};

export type User = {
  _id: string;
  username: string;
  email: string;
  avatar: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
};

export type FormState = {
  success?: string;
  error?: string;
};

export type RegisterSchemaType = z.infer<typeof registerSchema>;
export type LoginSchemaType = z.infer<typeof loginSchema>;
