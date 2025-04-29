import { AxiosError } from "axios";
import API from "@/utils/api";
import { FormState, Priority, TodoResult } from "@/utils/types/types";

export const addTodoService = async (
  _: TodoResult,
  formData: FormData
): Promise<FormState> => {
  const desc = formData.get("desc") as string;
  const priority = formData.get("priority") as Priority;
  if (!desc || !priority) {
    return { error: "All Fields are required" };
  }

  try {
    const response = await API.post("/api/v1/todos", { desc, priority });

    return { success: response.data.message, todo: response.data.data };
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    return { error: err?.response?.data?.message || "Something went wrong." };
  }
};

export const getTodosService = async (): Promise<FormState> => {
  try {
    const response = await API.get("/api/v1/todos");
    localStorage.setItem("todos", JSON.stringify(response.data.data));

    return { success: response.data.message, todos: response.data.data };
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    return { error: err?.response?.data?.message || "Something went wrong." };
  }
};

export const deleteTodoService = async (
  _: TodoResult,
  formData: FormData
): Promise<FormState> => {
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

export const updateTodoStatusService = async (
  id: string
): Promise<FormState> => {
  try {
    const response = await API.patch(`/api/v1/todos/${id}/status`);

    return { success: response.data.message, todo: response.data.data };
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    return { error: err?.response?.data?.message || "Something went wrong." };
  }
};
