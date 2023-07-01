import express from 'express'
import { ServiceReqest } from '../controller';
import auth from '../middlewares/auth';

let router=express.Router();

router.post('/create',auth,ServiceReqest.serviceRequest);
router.get('/getall',ServiceReqest.getAllServiceRequest);
router.patch('/update',auth,ServiceReqest.UpdateOne);

export default router;