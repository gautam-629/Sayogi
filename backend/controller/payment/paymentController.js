import { STRIPE_API_KEY, STRIPE_SECRET_KEY } from "../../config"
import Stripe from 'stripe';
import ServiceRequestModel from "../../models/ServiceRequest";
const PaymentController = {
    async processPayment(req, res, next) {
        const stripe = new Stripe(STRIPE_SECRET_KEY);
        try {
            const paymentIntent = await stripe.paymentIntents.create({
                amount: req.body.amount,
                currency: 'usd',
                metadata: { integration_check: 'accept_a_payment' }
            });
            res.status(200).json({
                success: true,
                client_secret: paymentIntent.client_secret
            });
        } catch (error) {
            return next(error);
        }
    },

    async sendStripApi(req, res, next) {
        res.status(200).json({
            stripeApiKey: STRIPE_API_KEY
        })
    },

   async insertPaymentInfo(req,res,next){
        const {paymentInfo,serviceId}=req.body;
          try {
            const payment= await ServiceRequestModel.findById(serviceId);
            payment.paymentInfo=paymentInfo;
            await payment.save();

            res.status(201).json({
                success:true
            })
          } catch (error) {
             return next(error);
          }
    }
}

export default PaymentController;