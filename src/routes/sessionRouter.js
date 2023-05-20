import { Router } from "express";
import SessionController from "../controllers/session.js";
import auth from "../middlewares/auth.js";


const sessionRouter = Router();

sessionRouter.post("/login", SessionController.logIn);
sessionRouter.post("/singnup", SessionController.SignUp);
sessionRouter.get('/private', auth, (req, res) => {
    const {email, role} = req.session.user;
    res.send(`Bienvenido, ${email}! tu rol es: ${role}.`);
  });
export default sessionRouter;