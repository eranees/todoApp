import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../user/entities/User.entity";

@Entity()
export class Todo {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;

	@Column()
	descreption: string;

	@Column({ type: "bigint", default: Date.now() })
	createdAt: number;

	@Column({ type: "bigint", default: Date.now() })
	updatedAt: number;

	@Column({ type: "bigint", nullable: true })
	dueDate: number;

	@Column({ default: false })
	status: boolean;

	@ManyToOne(() => User, (user) => user.todo)
	user: User;
}
