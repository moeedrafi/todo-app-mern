import { z } from "zod";
import { loginSchema, registerSchema } from "@/utils/schemas/authSchema";

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
  login: (prevState: FormState, formData: FormData) => Promise<FormState>;
  register: (prevState: FormState, formData: FormData) => Promise<FormState>;
  verifyEmail: (token: string) => Promise<FormState>;
  forgotPassword: (
    prevState: FormState,
    formData: FormData
  ) => Promise<FormState>;
  resetPassword: (
    prevState: FormState,
    formData: FormData
  ) => Promise<FormState>;
  logout: () => void;
  checkAuth: () => void;
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
