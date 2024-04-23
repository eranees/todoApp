import { NextFunction, Response } from "express";
import {
	completeTodo,
	createTodo,
	deleteTodo,
	oneTodo,
	todoAll,
	updateTodo,
} from "./service";
import { validateAndTransform } from "../utils/validator";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { User } from "../user/entities/User.entity";
import { UpdateTodoDto } from "./dto/update-todo.dto";

export const createTodoController = async (
	req: any,
	res: Response,
	next: NextFunction
) => {
	try {
		const validationResult = await validateAndTransform(
			CreateTodoDto,
			req.body
		);
		if (validationResult.error) {
			return res.status(400).json(validationResult.error);
		}
		const user: User = req.user;
		const response = await createTodo(req.body, user);
		res.status(response.status).json(response);
	} catch (error) {
		next(error);
	}
};

export const todoAllController = async (
	req: any,
	res: Response,
	next: NextFunction
) => {
	try {
		const page = parseInt(req.query.page as string) || 1;
		const pageSize = parseInt(req.query.pageSize as string) || 10;
		const sortBy = req.query.sortBy as string;
		const sortOrder =
			(req.query.sortOrder as string) === "ASC" ? "ASC" : "DESC";
		const query = (req.query.query as string) || "";
		const status = Boolean(req.query.status as string);
		const response = await todoAll(
			page,
			pageSize,
			sortBy,
			sortOrder,
			query,
			status,
			+req.user.id
		);
		res.json(response).status(response.status);
	} catch (error) {
		next(error);
	}
};

export const oneTodoController = async (
	req: any,
	res: Response,
	next: NextFunction
) => {
	try {
		const response = await oneTodo(+req.params.id, +req.user.id);
		res.json(response).status(response.status);
	} catch (error) {
		next(error);
	}
};

export const deleteOneTodoController = async (
	req: any,
	res: Response,
	next: NextFunction
) => {
	try {
		const response = await deleteTodo(+req.params.id, +req.user.id);
		res.json(response).status(response.status);
	} catch (error) {
		next(error);
	}
};

export const completeTodoController = async (
	req: any,
	res: Response,
	next: NextFunction
) => {
	try {
		const response = await completeTodo(+req.params.id, +req.user.id);
		res.json(response).status(response.status);
	} catch (error) {
		next(error);
	}
};

export const updateTodoController = async (
	req: any,
	res: Response,
	next: NextFunction
) => {
	try {
		const validationResult = await validateAndTransform(
			UpdateTodoDto,
			req.body
		);
		if (validationResult.error) {
			return res.status(400).json(validationResult.error);
		}
		const response = await updateTodo(req.body, +req.params.id, +req.user.id);
		res.status(response.status).json(response);
	} catch (error) {
		next(error);
	}
};
