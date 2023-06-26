import express from 'express'
import { CommentsController } from '../controller';
import auth from '../middlewares/auth';
let router=express.Router();

router.post('/create',auth,CommentsController.create);

export default router;