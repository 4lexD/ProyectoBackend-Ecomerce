import { Router } from "express";
import CartController from "../controllers/carts.js";
import auth from "../middlewares/auth.js";

const cartRouter = Router();

cartRouter.get("/:id",auth,CartController.get);
cartRouter.post("/",auth,CartController.post);
cartRouter.post("/:cid/product/:pid",auth,CartController.postInCart);
cartRouter.put('/:cid/product/:pid',auth,CartController.putOne);
cartRouter.put('/:cid',auth,CartController.put);
cartRouter.delete('/:cid',auth,CartController.delete);
cartRouter.delete('/:cid/product/:pid',auth, CartController.deleteOne);
cartRouter.post('/:cid/user/:uid',auth, CartController.postUserInCart);
cartRouter.post('/:cid/purcharse',auth,CartController.purcharse)
export default cartRouter;