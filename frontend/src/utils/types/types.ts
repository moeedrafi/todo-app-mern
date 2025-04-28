import { z } from "zod";
import { loginSchema, registerSchema } from "@/utils/schemas/authSchema";

export type TabsType = "All" | "Completed" | "Pending";

export type TodoContextType = {
  todos: Todo[];
  isLoading: boolean;
  addTodo: (prevState: TodoResult, formData: FormData) => Promise<TodoResult>;
  deleteTodo: (
    prevState: TodoResult,
    formData: FormData
  ) => Promise<TodoResult>;
  updateTodoStatus: (id: string) => Promise<TodoResult>;
};

export type RegisterResponse = {
  data: User;
  message: string;
};

export type LoginResponse = {
  data: {
    user: User;
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
};

export type LoginFormState = FormState & {
  user?: User;
};

export type RegisterFormState = FormState & {
  user?: User;
};

export type TodoResult = {
  success?: string;
  error?: string;
};

export type RegisterSchemaType = z.infer<typeof registerSchema>;
export type LoginSchemaType = z.infer<typeof loginSchema>;
