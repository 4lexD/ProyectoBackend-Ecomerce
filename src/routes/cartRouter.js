import { Router } from "express";
import CartController from "../controllers/carts.js";

const cartRouter = Router();

cartRouter.post("/",CartController.post);
cartRouter.get("/:id",CartController.get);
cartRouter.post("/:cid/product/:pid",CartController.postInCart);

export default cartRouter;