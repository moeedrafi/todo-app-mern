import API from "@/utils/api";
import { AxiosError } from "axios";
import { createContext, useContext, useEffect, useState } from "react";

import {
  Priority,
  Todo,
  TodoContextType,
  TodoResult,
} from "@/utils/types/types";

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const addTodo = async (
    prevState: TodoResult,
    formData: FormData
  ): Promise<TodoResult> => {
    const desc = formData.get("desc") as string;
    const priority = formData.get("priority") as Priority;
    if (!desc || !priority) {
      return { error: "All Fields are required" };
    }

    try {
      const response = await API.post("/api/v1/todos", { desc, priority });
      setTodos((prev) => [response.data.data, ...prev]);

      return { success: response.data.message };
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      return { error: err?.response?.data?.message || "Something went wrong." };
    }
  };

  const getTodos = async (): Promise<TodoResult> => {
    try {
      const storedTodos = localStorage.getItem("todos");
      if (storedTodos) {
        setTodos(JSON.parse(storedTodos));
      }

      const response = await API.get("/api/v1/todos");
      setTodos([...response.data.data]);
      localStorage.setItem("todos", JSON.stringify(response.data.data));

      return { success: response.data.message };
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

  const updateTodoStatus = async (id: string): Promise<TodoResult> => {
    try {
      const response = await API.patch(`/api/v1/todos/${id}/status`);

      setTodos((prev) =>
        prev.map((todo) => (todo._id === id ? response.data.data : todo))
      );

      return { success: response.data.message };
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      return { error: err?.response?.data?.message || "Something went wrong." };
    }
  };

  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);
      try {
        await getTodos();
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const value = { todos, addTodo, deleteTodo, updateTodoStatus, isLoading };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider.");
  }
  return context;
};
