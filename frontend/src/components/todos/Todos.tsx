import { TabsType } from "@/utils/types";
import { Todo } from "@/components/todos/Todo";

interface TodosProps {
  isActiveTab: TabsType;
}

export const Todos = ({ isActiveTab }: TodosProps) => {
  return (
    <div
      role="tabpanel"
      className="mt-6"
      id={`panel-${isActiveTab.toLowerCase()}`}
      aria-labelledby={`tab-${isActiveTab.toLowerCase()}`}
    >
      <Todo isActiveTab={isActiveTab} />
    </div>
  );
};
