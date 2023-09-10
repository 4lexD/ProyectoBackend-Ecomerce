import Stripe from 'stripe';
import CartManager from '../domain/managers/cartManager.js';
import config from '../config/config.js';
import logger from '../shared/pino/logger.js';
const {SECRET_KEY_STRIPE} = config
class PaymentService {
  constructor() {
    this.service = new Stripe(SECRET_KEY_STRIPE);
    this.CartManager = new CartManager();
  }

  async createPaymentIntent(cartId) {
    try {
      const ticket = await this.CartManager.checkOut(cartId);
        logger.info(ticket)
      const paymentIntent = await this.service.paymentIntents.create({
        amount: Math.round(Number(ticket.amount) * 100),
        currency: 'ars',
      });

      return {
        clientSecret: paymentIntent.client_secret,
        ticketId: ticket.id
      };
    } catch (error) {
      throw new Error(`Error al crear el pago: ${error.message}`);
    }
  }
}

export default PaymentService;
