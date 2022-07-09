import { Router } from 'express';

import cardPurchase from '../controllers/cardPurchaseController.js';
import validatePurchases from '../middlewares/cardPurchasesMiddleware.js';

const purchasesRouter = Router();

purchasesRouter.post('/purchases', validatePurchases, cardPurchase); // Create a new purchase

export default purchasesRouter;