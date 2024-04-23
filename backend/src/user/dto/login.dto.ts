import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginDto {
	@IsNotEmpty()
	@IsEmail()
	@Transform(({ value }) => value?.toLowerCase().trim())
	email: string;

	@IsNotEmpty()
	password: string;
}
