import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "dotenv";
import { CustomError } from "./custom-error.model";
config();

export const createAuthToken = (id: number) => {
	const token = jwt.sign({ _id: id.toString() }, process.env.TOKEN_SECRET, {
		expiresIn: process.env.JWT_EXPIRY,
	});
	return token;
};

export const verifyToken = (token: string) => {
	try {
		return jwt.verify(token, process.env.TOKEN_SECRET as string) as JwtPayload;
	} catch (error) {
		throw new CustomError("Invalid", 401, "Unauthorized.");
	}
};
