import { IsNotEmpty } from "class-validator";
import { Column } from "typeorm";

export class CreateTodoDto {
	@IsNotEmpty()
	title: string;

	@IsNotEmpty()
	descreption: string;

	@IsNotEmpty()
	@Column({ type: "bigint", nullable: true })
	dueDate: number;
}
