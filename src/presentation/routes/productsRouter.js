import {Router} from "express";
import ProductController from "../controllers/products.js";
import authorization from "../middlewares/authorization.js";
import auth from "../middlewares/auth.js";


const productRouter = Router();

productRouter.get("/",ProductController.get);
productRouter.get("/:id",ProductController.getById);

productRouter.post("/",auth, authorization("postProducts"),ProductController.post);
productRouter.put("/:id", auth, authorization("updateProducts"),ProductController.put);
productRouter.delete("/:id", auth, authorization("deleteProducts"),ProductController.delete);

export default productRouter;

