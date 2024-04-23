import { Request, Response, NextFunction } from "express";
import { create, login } from "./service";
import { CreateUserDto } from "./dto/create-user.dto";
import { validateAndTransform } from "../utils/validator";
import { LoginDto } from "./dto/login.dto";

export const createUserController = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const validationResult = await validateAndTransform(
			CreateUserDto,
			req.body
		);
		if (validationResult.error) {
			return res.status(400).json(validationResult.error);
		}
		const response = await create(req.body);
		res.status(response.status).json(response);
	} catch (error) {
		next(error);
	}
};

export const loginController = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const validationResult = await validateAndTransform(LoginDto, req.body);
		if (validationResult.error) {
			return res.status(400).json(validationResult.error);
		}
		const response = await login(req.body);
		res.status(response.status).json(response);
	} catch (error) {
		next(error);
	}
};
