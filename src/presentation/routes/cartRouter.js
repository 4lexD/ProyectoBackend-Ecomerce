import { Router } from "express";
import CartController from "../controllers/carts.js";

const cartRouter = Router();

cartRouter.get("/:id",CartController.get);
cartRouter.post("/",CartController.post);
cartRouter.post("/:cid/product/:pid",CartController.postInCart);
cartRouter.put('/:cid/product/:pid',CartController.putOne);
cartRouter.put('/:cid',CartController.put);
cartRouter.delete('/:cid',CartController.delete);
cartRouter.delete('/:cid/product/:pid', CartController.deleteOne);
cartRouter.post('/:cid/user/:uid', CartController.postUserInCart);
cartRouter.post('/:cid/purcharse',CartController.purcharse)
export default cartRouter;