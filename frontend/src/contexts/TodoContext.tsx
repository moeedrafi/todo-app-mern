import { createContext, useContext, useEffect, useState } from "react";

import { Todo } from "@/utils/types/types";
import { getTodosService } from "@/services/todoService";

export type TodoContextType = {
  todos: Todo[];
  isLoading: boolean;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTodos = async () => {
      const cached = localStorage.getItem("todos");
      if (cached) {
        setTodos(JSON.parse(cached));
      }

      const result = await getTodosService();

      if (result.success && result.todos) {
        setTodos(result.todos);
      } else {
        setTodos([]);
      }

      setIsLoading(false);
    };

    fetchTodos();
  }, []);

  const value = { todos, isLoading, setIsLoading, setTodos };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider.");
  }
  return context;
};
