import PaymentService from "../../services/paymentService.js";

class PaymentController {


  static createPaymentIntent = async (req, res, next) => {
    try {
      const { cartId } = req.body;
      const paymentService = new PaymentService()
      const paymentIntent = await paymentService.createPaymentIntent(cartId);

      res.json({ clientSecret: paymentIntent.clientSecret });
    } catch (e) {
      next(e)
    }
  }
}

export default PaymentController;
