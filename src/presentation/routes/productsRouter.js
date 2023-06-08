import {Router} from "express";
import ProductController from "../controllers/products.js";

const productRouter = Router();

productRouter.post("/", ProductController.post);
productRouter.get("/", ProductController.get);
productRouter.get("/:id",ProductController.getById);
productRouter.put("/:id",ProductController.put);
productRouter.delete("/:id", ProductController.delete);

export default productRouter;
