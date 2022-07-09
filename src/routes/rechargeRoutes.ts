import { Router } from 'express';

import cardRecharge from '../controllers/cardRechargeController.js';
import validateCardRecharge from '../middlewares/cardRechargeMiddleware.js';

const rechargeRouter = Router();

rechargeRouter.post('/recharge', validateCardRecharge, cardRecharge); // Refill a card

export default rechargeRouter;