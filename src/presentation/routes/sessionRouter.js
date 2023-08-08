import { Router } from "express";
import SessionController from "../controllers/session.js";
import auth from "../middlewares/auth.js"
import verifyToken from "../middlewares/verifyToken.js";

const sessionRouter = Router();

sessionRouter.post("/login", SessionController.logIn);
sessionRouter.post("/signup", SessionController.SignUp);
sessionRouter.post("/logout", SessionController.logOut);
sessionRouter.post("/forgot-password", SessionController.forgotPassword);
sessionRouter.get("/current",auth,SessionController.current);
sessionRouter.post("/reset-password/:token",verifyToken,SessionController.resetPassword);

export default sessionRouter;