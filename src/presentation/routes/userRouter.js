import { Router } from "express";
import UserController from "../controllers/users.js";


const userRouter = Router();

userRouter.get("/", UserController.get);
userRouter.get("/:id", UserController.getOne);
userRouter.post("/", UserController.post);

export default userRouter;
