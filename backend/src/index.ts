import express, { Express, Request, Response } from "express";
import { AppDataSource } from "./database/data-source";
import { config } from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import errorHandler from "./middleware/error/error-handler.middleware";
import userRouter from "./user/routes";
import homeRouter from "./home/routes";
import todoRouter from "./todo/routes";

config();
const PORT = process.env.APP_PORT || 3001;
const app: Express = express();
app.use(bodyParser.json());
app.use(cors());

AppDataSource.initialize()
	.then(async () => {
		// ##### ROUTES #####
		app.use("/", homeRouter);
		app.use("/auth", userRouter);
		app.use("/todo", todoRouter);
		app.use(errorHandler);
		// ##### SERVER #####
		app.listen(PORT, () => {
			console.log(`🚀 Server is running at ${PORT} 🚀`);
		});
	})
	.catch(async (error) => console.log(error.message));
