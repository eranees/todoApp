import express, { Request, Response } from "express";
const homeRouter = express.Router();

homeRouter.get("/", (req: Request, res: Response) =>
	res.json({ message: "Welcome to out application" })
);

export default homeRouter;
