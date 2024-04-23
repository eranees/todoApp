import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import { config } from "dotenv";
config();

export const AppDataSource = new DataSource({
	type: process.env.DATABASE_TYPE,
	host: process.env.DATABASE_HOST,
	port: process.env.PGPORT,
	username: process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD,
	database: process.env.POSTGRES_DB,
	synchronize: true,
	logging: false,
	entities: [__dirname + "/../**/*.entity{.ts,.js}"],
	migrations: [__dirname + `/migrations/${process.env.NODE_ENV}/*{.ts,.js}`],
	cli: {
		entitiesDir: "src",
		migrationsDir: "src/database/migrations",
		subscribersDir: "subscriber",
	},
} as DataSourceOptions);
