import { Router } from "express";
import SessionController from "../controllers/session.js";
import auth from "../middlewares/auth.js"

const sessionRouter = Router();

sessionRouter.post("/login", SessionController.logIn);
sessionRouter.post("/signup", SessionController.SignUp);
sessionRouter.post("/logout", SessionController.logOut);
sessionRouter.get("/current",auth,SessionController.current);

export default sessionRouter;