import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {
	name: string;

	@IsNotEmpty()
	username: string;

	@IsNotEmpty()
	@Transform(({ value }) => value?.toLowerCase().trim())
	@IsEmail()
	email: string;

	password: string;
}
