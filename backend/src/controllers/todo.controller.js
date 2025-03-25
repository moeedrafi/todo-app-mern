import { Todo } from "../models/todo.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createTodo = asyncHandler(async (req, res) => {
  const { desc, priority } = req.body;
  if (!desc || !priority) {
    throw new ApiError(400, "All fields are required");
  }

  try {
    const todo = await Todo.create({
      desc,
      priority,
      user: req.user._id,
    });

    return res
      .status(201)
      .json(new ApiResponse(201, todo, "Todo created Successfully"));
  } catch (error) {
    if (error.code === 11000) {
      throw new ApiError(400, "Todo description must be unique");
    }
    throw new ApiError(400, error.message || "Something went wrong");
  }
});

const deleteTodo = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const todo = await Todo.findByIdAndDelete(id);
  if (!todo) {
    throw new ApiResponse(400, "Todo doesnt exists");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Todo deleted Successfully"));
});

const getTodos = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const pageNumber = parseInt(page, 10);
  const pageSize = parseInt(limit, 10);
  if (pageNumber < 1 || pageSize < 1) {
    throw new ApiError(400, "Page and limit must be positive numbers");
  }

  const totalTodos = await Todo.countDocuments({ user: req.user._id });
  const totalPages = Math.ceil(totalTodos / pageSize);

  const todos = await Todo.find({ user: req.user._id })
    .sort({ createdAt: -1 })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize);

  if (!todos.length) {
    throw new ApiError(404, "No todos found");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        todos,
        pagination: {
          totalTodos,
          totalPages,
          currentPage: pageNumber,
          pageSize,
          hasPrevPage: pageNumber > 1,
          hasNextPage: pageNumber < totalPages,
        },
      },
      "Todo fetched Successfully"
    )
  );
});

const updateTodoStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const todo = await Todo.findById(id);
  if (!todo) {
    throw new ApiError(404, "Todo not found");
  }

  todo.isCompleted = !todo.isCompleted;
  await todo.save();

  res.status(200).json(200, todo, "Updated Successfully");
});

export { createTodo, deleteTodo, getTodos, updateTodoStatus };
