import { TabsType } from "@/utils/types";
import { useTodo } from "@/hooks/useTodo";
import { Todo } from "@/components/todos/Todo";

interface TodosProps {
  isActiveTab: TabsType;
}

const PRIORITY_ORDER = {
  High: 1,
  Medium: 2,
  Low: 3,
};

export const Todos = ({ isActiveTab }: TodosProps) => {
  const { todos } = useTodo();

  const sortedTodos = [...todos].sort(
    (a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]
  );

  const filteredTodos = sortedTodos.filter((todo) =>
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
