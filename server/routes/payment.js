import express from 'express'
// import auth from '../middlewares/auth';
let router=express.Router();
import { PaymentController } from '../controller';
router.post('/payment/process',PaymentController.processPayment);
router.get('/stripeapi',PaymentController.sendStripApi);
router.post('/paymentinfo',PaymentController.insertPaymentInfo)
export default router;