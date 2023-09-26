import express from 'express'
import { HiredUserController } from '../controller';
import auth from '../middlewares/auth';
import admin from '../middlewares/admin';

let router=express.Router();

router.get('/gethireduser',[auth,admin],HiredUserController.findHiredUser)
router.patch('/updateuser',[auth,admin],HiredUserController.updateUser)
export default router;
