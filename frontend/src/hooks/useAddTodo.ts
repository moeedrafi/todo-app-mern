import toast from "react-hot-toast";
import { useActionState, useEffect } from "react";

import { initialState } from "@/utils/constants";
import { useTodo } from "@/contexts/TodoContext";
import { addTodoService } from "@/services/todoService";

export const useAddTodo = () => {
  const { setTodos } = useTodo();
  const [state, action, isPending] = useActionState(
    addTodoService,
    initialState
  );

  useEffect(() => {
    if (state.success && state.todo) {
      const newTodo = state.todo;
      setTodos((prev) => [newTodo, ...prev]);
      toast.success(state.success);
    } else if (state.error) {
      toast.error(state.error);
    }
  }, [state, setTodos]);

  return { action, isPending };
};
