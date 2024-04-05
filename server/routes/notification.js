import express from 'express'
import { NotificationController } from '../controller';
import auth from '../middlewares/auth';

let router=express.Router();

router.post('/create',auth,NotificationController.create);
router.get('/getNotification',auth,NotificationController.findNotification);

export default router;