import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middleware/errorHandler.middleware.js";

const app = new express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

import userRouter from "./routes/user.routes.js";
import todoRouter from "./routes/todo.routes.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/todos", todoRouter);

app.use(errorHandler);

export { app };
