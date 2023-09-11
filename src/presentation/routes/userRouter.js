import { Router } from "express";
import UserController from "../controllers/users.js";
import isAdmin from "../middlewares/isAdmin.js";
import auth from "../middlewares/auth.js";

const userRouter = Router();

userRouter.get("/", auth,isAdmin ,UserController.get);
userRouter.get("/:id", auth,isAdmin, UserController.getOne);
userRouter.post("/", auth,isAdmin ,UserController.post);
userRouter.delete("/:id",auth,isAdmin,UserController.delete);
userRouter.put("/:id",auth,isAdmin,UserController.put);
userRouter.post("/:uid/role/:rid",auth,isAdmin,UserController.addRole);

export default userRouter;
