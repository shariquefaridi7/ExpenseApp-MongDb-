import express from 'express';
import { createPayment } from '../controllers/premiumConroller.js';
import  authen from '../middleware/authen.js'

const router =express.Router();

router.post("/",authen,createPayment);

export default router ;

