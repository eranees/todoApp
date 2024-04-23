import { Exclude } from "class-transformer";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Todo } from "../../todo/entities/Todo.entity";

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ nullable: true })
	name: string;

	@Column()
	username: string;

	@Column({ unique: true })
	email: string;

	@Column({ nullable: true, name: "password" })
	@Exclude({ toPlainOnly: true })
	password: string;

	@Column({ type: "bigint", default: Date.now() })
	createdAt: number;

	@Column({ type: "bigint", default: Date.now() })
	updatedAt: number;

	@Column({ default: false })
	deleted: boolean;

	@OneToMany(() => Todo, (todo) => todo.user)
	todo: Todo[];
}
