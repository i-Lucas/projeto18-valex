import { Router } from 'express';

import cardsMiddleware from '../middlewares/cardsMiddlewares.js';
import cardsController from '../controllers/cardsControllers.js';

const purchasesRouter = Router();

purchasesRouter.post('/purchases', cardsMiddleware.validatePurchases, cardsController.cardPurchase); // Create a new purchase

export default purchasesRouter;