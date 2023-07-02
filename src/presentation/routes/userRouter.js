import { Router } from "express";
import UserController from "../controllers/users.js";
import isAdmin from "../middlewares/isAdmin.js";
import auth from "../middlewares/auth.js";

const userRouter = Router();

userRouter.get("/", auth,isAdmin ,UserController.get);
userRouter.get("/:id", auth,isAdmin, UserController.getOne);
userRouter.post("/", auth,isAdmin ,UserController.post);

export default userRouter;
