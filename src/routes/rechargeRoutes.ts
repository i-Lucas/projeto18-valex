import { Router } from 'express';

import cardsMiddleware from '../middlewares/cardsMiddlewares.js';
import cardsController from '../controllers/cardsControllers.js';

const rechargeRouter = Router();

rechargeRouter.post('/recharge', cardsMiddleware.validateCardRecharge, cardsController.cardRecharge); // Refill a card

export default rechargeRouter;