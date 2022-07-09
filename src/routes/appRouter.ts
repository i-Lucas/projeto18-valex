import { Router } from 'express';
import cardRouter from './cardsRoutes.js';
import refillsRouter from './rechargeRoutes.js';
import purchasesRouter from './purchasesRoutes.js';

const appRouter = Router();

appRouter.use(cardRouter);
appRouter.use(refillsRouter);
appRouter.use(purchasesRouter);

export default appRouter;