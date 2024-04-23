import express from "express";
import {
	completeTodoController,
	createTodoController,
	deleteOneTodoController,
	oneTodoController,
	todoAllController,
	updateTodoController,
} from "./controller";
import { auth } from "../middleware/jwt";

const todoRouter = express.Router();

todoRouter.post("/", auth, createTodoController);
todoRouter.get("/", auth, todoAllController);
todoRouter.delete("/:id", auth, deleteOneTodoController);
todoRouter.get("/:id", auth, oneTodoController);
todoRouter.post("/:id", auth, completeTodoController);
todoRouter.patch("/:id", auth, updateTodoController);

export default todoRouter;
