import { FindOptionsWhere, ILike } from "typeorm";
import { AppDataSource } from "../database/data-source";
import { User } from "../user/entities/User.entity";
import { AbstractApiResponse } from "../utils/api.response";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { Todo } from "./entities/Todo.entity";
import { UpdateTodoDto } from "./dto/update-todo.dto";
import { CustomError } from "../utils/custom-error.model";

export const createTodo = async (todoDto: CreateTodoDto, user: User) => {
	const todo = new Todo();
	todo.title = todoDto.title;
	todo.descreption = todoDto.descreption;
	todo.dueDate = todoDto.dueDate;
	todo.user = user;
	await AppDataSource.manager.save(Todo, todo);
	return AbstractApiResponse.created("Todo Added Successfully.");
};

export const todoAll = async (
	page: number,
	pageSize: number,
	sortBy: string = "updatedAt",
	sortOrder: "ASC" | "DESC" = "DESC",
	query: string,
	status: boolean,
	userId: number
) => {
	const skip = (page - 1) * pageSize;
	const whereCondition: FindOptionsWhere<Todo> = {
		user: {
			id: userId,
		},
	};
	if (status) {
		whereCondition.status = status;
	}

	if (query) {
		whereCondition.title = ILike(`%${query}%`);
	}

	const [todos, count] = await AppDataSource.manager.findAndCount(Todo, {
		where: whereCondition,
		select: {
			id: true,
			title: true,
			descreption: true,
			createdAt: true,
			updatedAt: true,
			status: true,
			dueDate: true,
		},
		skip,
		take: pageSize,
		order: {
			[sortBy]: sortOrder,
		},
	});

	if (!todos) {
		throw new CustomError("Not Found", 404, "Empty");
	}

	return AbstractApiResponse.success({ todos: todos, total: count });
};

export const oneTodo = async (todoId: number, userId: number) => {
	const todo = await AppDataSource.manager.findOne(Todo, {
		where: {
			id: todoId,
			user: { id: userId },
		},
	});
	// console.log(new Date(todo.dueDate * 1000).toLocaleString());
	if (!todo) {
		throw new CustomError("Not Found", 404, "Todo not found");
	}

	return AbstractApiResponse.success(todo);
};

export const deleteTodo = async (todoId: number, userId: number) => {
	const todo = await AppDataSource.manager
		.createQueryBuilder()
		.delete()
		.from(Todo)
		.where("id = :id", { id: todoId, userId: userId })
		.execute();
	if (todo.affected <= 0) {
		throw new CustomError("Not Found", 404, "Todo not found");
	}
	return AbstractApiResponse.success("Todo deleted successfully");
};

export const completeTodo = async (todoId: number, userId: number) => {
	const todo = await AppDataSource.manager.findOne(Todo, {
		where: {
			id: todoId,
			status: false,
			user: { id: userId },
		},
	});

	if (!todo) {
		throw new CustomError("Not Found", 404, "Todo not found");
	}

	todo.status = true;
	await AppDataSource.manager.save(todo);
	return AbstractApiResponse.success("Todo completed");
};

export const updateTodo = async (
	todoDto: UpdateTodoDto,
	todoId: number,
	userId: number
) => {
	const todo = await AppDataSource.manager.findOne(Todo, {
		where: {
			id: todoId,
			user: { id: userId },
		},
	});

	if (!todo) {
		throw new CustomError("Not Found", 404, "Todo not found");
	}

	todo.title = todoDto.title || todo.title;
	todo.descreption = todoDto.descreption || todo.descreption;
	todo.dueDate = todoDto.dueDate || todo.dueDate;
	await AppDataSource.manager.save(todo);
	return AbstractApiResponse.success("Todo Updated Successfully.");
};
