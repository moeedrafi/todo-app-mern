import { z } from "zod";
import { loginSchema, registerSchema } from "@/utils/schemas/authSchema";

export type TabsType = "All" | "Completed" | "Pending";

export type RegisterResponse = {
  data: User;
  message: string;
};

export type LoginResponse = {
  data: User;
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

export type Priority = "High" | "Medium" | "Low";

export type Todo = {
  _id: string;
  desc: string;
  user: string;
  priority: Priority;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
};

export type FormState = {
  success?: string;
  error?: string;
  user?: User;
  todo?: Todo;
  todos?: Todo[];
};

export type TodoResult = {
  success?: string;
  error?: string;
};

export type RegisterSchemaType = z.infer<typeof registerSchema>;
export type LoginSchemaType = z.infer<typeof loginSchema>;
