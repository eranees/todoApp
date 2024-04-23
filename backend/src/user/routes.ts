import express from "express";
import { createUserController, loginController } from "./controller";

const userRouter = express.Router();

// userRouter.post("/route", /middleware, handler);
userRouter.post("/create", createUserController);
userRouter.post("/login", loginController);

export default userRouter;
