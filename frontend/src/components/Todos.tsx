import { TabsType } from "@/utils/types";
import { Todo } from "@/components/Todo";

interface TodosProps {
  isActiveTab: TabsType;
}

export const Todos = ({ isActiveTab }: TodosProps) => {
  return (
    <>
      {isActiveTab === "All" ? (
        <Todo isActiveTab={isActiveTab} />
      ) : isActiveTab === "Pending" ? (
        <Todo isActiveTab={isActiveTab} />
      ) : (
        <Todo isActiveTab={isActiveTab} />
      )}
    </>
  );
};
