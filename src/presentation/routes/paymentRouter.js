import { Router } from "express";
import PaymentController from "../controllers/payment.js";

const paymentRouter = Router();

paymentRouter.post('/create-payment-intent',PaymentController.createPaymentIntent);

export default paymentRouter;