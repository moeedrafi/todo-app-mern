import { AxiosError } from "axios";
import { createContext, useContext, useState } from "react";

import { Todo, TodoContextType, TodoResult } from "@/utils/types";

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = async (
    prevState: TodoResult,
    formData: FormData
  ): Promise<TodoResult> => {
    const desc = formData.get("desc");
    const priority = formData.get("priority");

    if (!desc || !priority) {
      return { error: "All Fields are required" };
    }

    try {
      return { success: "" };
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      return { error: err?.response?.data?.message || "Something went wrong." };
    }
  };

  const deleteTodo = async (
    prevState: TodoResult,
    formData: FormData
  ): Promise<TodoResult> => {
    const desc = formData.get("desc");
    const priority = formData.get("priority");

    if (!desc || !priority) {
      return { error: "All Fields are required" };
    }

    try {
      return { success: "" };
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      return { error: err?.response?.data?.message || "Something went wrong." };
    }
  };

  const value = { todos, addTodo, deleteTodo };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider.");
  }
  return context;
};
