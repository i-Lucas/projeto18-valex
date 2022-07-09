import { Router } from 'express';

const refillsRouter = Router();

refillsRouter.post('/refill'); // Refill a card

export default refillsRouter;