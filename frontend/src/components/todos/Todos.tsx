import { TabsType } from "@/utils/types";
import { useTodo } from "@/hooks/useTodo";
import { Todo } from "@/components/todos/Todo";

interface TodosProps {
  isActiveTab: TabsType;
}

export const Todos = ({ isActiveTab }: TodosProps) => {
  const { todos } = useTodo();

  const filteredTodos = todos.filter((todo) =>
    isActiveTab === "All"
      ? todo
      : isActiveTab === "Completed"
      ? todo.isCompleted
      : !todo.isCompleted
  );

  return (
    <div
      role="tabpanel"
      className="mt-6 flex flex-col gap-3"
      id={`panel-${isActiveTab.toLowerCase()}`}
      aria-labelledby={`tab-${isActiveTab.toLowerCase()}`}
    >
      {filteredTodos.map((todo) => (
        <Todo key={todo._id} todo={todo} />
      ))}
    </div>
  );
};
