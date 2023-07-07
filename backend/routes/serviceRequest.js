import express from 'express'
import { ServiceReqest } from '../controller';
import auth from '../middlewares/auth';

let router=express.Router();

router.post('/create',auth,ServiceReqest.serviceRequest);
router.get('/getall',ServiceReqest.getAllServiceRequest);
router.patch('/update',auth,ServiceReqest.UpdateOne);
router.get('/receiver',auth,ServiceReqest.findOneReceiver);
router.get('/provider',auth,ServiceReqest.findOneProvider);
router.get('/servicehistory',auth,ServiceReqest.findServiceHistory);
export default router;