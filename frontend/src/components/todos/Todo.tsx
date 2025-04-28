import { useState } from "react";
import { TabsType } from "@/utils/types";

type TodoProps = {
  id: string;
  title: string;
  completed: boolean;
};

const dummyTodos: TodoProps[] = [
  {
    id: "1",
    title: "Go Outside",
    completed: false,
  },
  {
    id: "2",
    title: "Complete DSA Problem",
    completed: true,
  },
  {
    id: "3",
    title: "Refactor Todo App",
    completed: false,
  },
];

export const Todo = ({ isActiveTab }: { isActiveTab: TabsType }) => {
  const [todos, setTodos] = useState<TodoProps[]>(dummyTodos);
  const filteredTodos = todos.filter((todo) => {
    if (isActiveTab === "All") return true;
    if (isActiveTab === "Completed") return todo.completed;
    return !todo.completed;
  });

  return (
    <>
      {filteredTodos.map((todo) => (
        <div key={todo.id} className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <input
              type="checkbox"
              checked={todo.completed}
              className="w-5 h-5"
            />
            <p className="text-lg">{todo.title}</p>
          </div>
          <button className="px-2 py-1.5 rounded-lg text-white bg-red-500 hover:bg-red-400 cursor-pointer">
            Delete
          </button>
        </div>
      ))}
    </>
  );
};
