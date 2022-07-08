import { Router } from 'express';
import cardRouter from './card.js';
import refillsRouter from './refills.js';
import purchasesRouter from './purchases.js';

const router = Router();

router.use(cardRouter);
router.use(refillsRouter);
router.use(purchasesRouter);

export default router;