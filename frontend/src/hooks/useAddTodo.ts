import { useActionState, useEffect } from "react";
import toast from "react-hot-toast";

import { useTodo } from "@/hooks/useTodo";
import { initialState } from "@/utils/constants";

export const useAddTodo = () => {
  const { addTodo } = useTodo();
  const [addTodoState, addTodoAction, isPending] = useActionState(
    addTodo,
    initialState
  );

  useEffect(() => {
    if (addTodoState.success) {
      toast.success(addTodoState.success);
    } else if (addTodoState.error) {
      toast.error(addTodoState.error);
    }
  }, [addTodoState]);

  return { addTodoAction, isPending };
};
