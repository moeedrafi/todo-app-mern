import { Todo } from "../models/todo.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createTodo = asyncHandler(async (req, res) => {
  return res
    .status(201)
    .json(new ApiResponse(200, {}, "Todo created Successfully"));
});

const deleteTodo = asyncHandler(async (req, res) => {
  return res
    .status(201)
    .json(new ApiResponse(200, {}, "Todo deleted Successfully"));
});

export { createTodo, deleteTodo };
