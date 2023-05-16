import { Router } from "express";
import SessionController from "../controllers/session.js";


const sessionRouter = Router();

sessionRouter.post("/login", SessionController.logIn);
sessionRouter.post("/singnup", SessionController.SignUp);

export default sessionRouter