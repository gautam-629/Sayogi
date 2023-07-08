import express from 'express'
import { CommentsController } from '../controller';
import auth from '../middlewares/auth';
let router=express.Router();

router.post('/create',auth,CommentsController.create);
router.post('/createreview',auth,CommentsController.Review);

export default router;