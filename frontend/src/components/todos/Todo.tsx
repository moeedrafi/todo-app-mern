import { useTodo } from "@/hooks/useTodo";
import { Todo as TodoTypes } from "@/utils/types";

export const Todo = ({ todo }: { todo: TodoTypes }) => {
  const { updateTodoStatus } = useTodo();

  const handleChange = async () => {
    try {
      await updateTodoStatus(todo._id);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  return (
    <>
      <div key={todo._id} className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <input
            type="checkbox"
            checked={todo.isCompleted}
            className="w-5 h-5"
            onChange={handleChange}
          />
          <p className="text-lg">{todo.desc}</p>
        </div>

        <div className="flex gap-3">
          <button
            className={`px-2 py-1.5 rounded-lg text-white cursor-pointer ${
              todo.priority === "High"
                ? "bg-red-700"
                : todo.priority === "Medium"
                ? "bg-blue-500"
                : "bg-green-500"
            }`}
          >
            {todo.priority}
          </button>
          <button className="px-2 py-1.5 rounded-lg text-white bg-red-500 hover:bg-red-400 cursor-pointer">
            Delete
          </button>
        </div>
      </div>
    </>
  );
};
