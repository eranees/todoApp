import jwt, { JwtPayload } from "jsonwebtoken";
import { Response, NextFunction } from "express";
import { AppDataSource } from "../../database/data-source";
import { User } from "../../user/entities/User.entity";
import { CustomError } from "../../utils/custom-error.model";
export const auth = async (req: any, res: Response, next: NextFunction) => {
	try {
		const token = req.header("Authorization");
		const decoded: JwtPayload = jwt.verify(
			token,
			process.env.TOKEN_SECRET
		) as JwtPayload;
		const user = await AppDataSource.manager.findOne(User, {
			where: { id: decoded._id, deleted: false },
		});
		if (!user) {
			throw new Error();
		}
		delete user.password;
		req.token = token;
		req.user = user;
		next();
	} catch (e) {
		res.status(401).send({ error: "Unauthorized!.." });
	}
};
