import {Router} from "express";
import RoleController from "../controllers/roles.js";
import isAdmin from "../middlewares/isAdmin.js";
import auth from "../middlewares/auth.js";

const roleRouter = Router();

roleRouter.post('/', auth,isAdmin ,RoleController.post);
roleRouter.get('/', auth,isAdmin,RoleController.get);
roleRouter.get('/:id', auth,isAdmin,RoleController.getOne);
roleRouter.put('/:id', auth,isAdmin,RoleController.update);
roleRouter.delete('/:id', auth,isAdmin,RoleController.delete);

export default roleRouter;
