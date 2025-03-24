import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { createTodo, deleteTodo } from "../controllers/todo.controller.js";

const router = Router();

router.route("/").post(verifyJWT, createTodo);
router.route("/:id").delete(verifyJWT, deleteTodo);

export default router;
