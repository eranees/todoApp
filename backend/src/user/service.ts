import { AppDataSource } from "../database/data-source";
import { AbstractApiResponse } from "../utils/api.response";
import { CustomError } from "../utils/custom-error.model";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./entities/User.entity";
import { hashPassword, verifyPassword } from "../utils/bcrypt.util";
import { Mailer } from "../mailer/service";
import { LoginDto } from "./dto/login.dto";
import { createAuthToken } from "../utils/jwt-token-generator";

export const create = async (userDto: CreateUserDto) => {
	const mailer = new Mailer();
	const user = new User();
	const existingUser = await AppDataSource.manager.findOne(User, {
		where: [{ email: userDto.email }, { username: userDto.username }],
	});
	if (existingUser) {
		throw new CustomError(
			"User Exists",
			409,
			"Account with the email or username already exists. Please login"
		);
	}
	user.name = userDto.name;
	user.username = userDto.username;
	user.email = userDto.email;
	user.password = await hashPassword(userDto.password);

	await AppDataSource.manager.save(User, user);
	const mailOptions = {
		from: process.env.MAIL_EMAIL,
		to: userDto.email,
		subject: "Account Created",
		text: `
    Congrulations! Acount Created Successfully
    Username: ${userDto.username}
    Password: ${userDto.password}
    `,
	};
	await mailer.sendMail(mailOptions);
	return AbstractApiResponse.created(
		"User created successfully, check email. "
	);
};

export const login = async (loginDto: LoginDto) => {
	const user = await AppDataSource.manager.findOne(User, {
		where: {
			email: loginDto.email.toLocaleLowerCase(),
			deleted: false,
		},
		select: {
			id: true,
			name: true,
			username: true,
			email: true,
			password: true,
		},
	});

	if (!user) {
		throw new CustomError("Bad request", 400, "User not found.");
	}
	const isValid = await verifyPassword(loginDto.password, user.password);

	if (!isValid) {
		throw new CustomError("Invalid", 401, "Invalid credentials.");
	}
	delete user.password;
	const token = createAuthToken(user.id);
	return AbstractApiResponse.success({ user, token });
};
