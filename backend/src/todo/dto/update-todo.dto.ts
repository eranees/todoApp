import { IsOptional } from "class-validator";
import { Column } from "typeorm";

export class UpdateTodoDto {
	@IsOptional()
	title: string;

	@IsOptional()
	descreption: string;

	@IsOptional()
	@Column({ type: "bigint", nullable: true })
	dueDate: number;
}
