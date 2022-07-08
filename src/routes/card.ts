import { Router } from 'express';

const cardRouter = Router();

cardRouter.post('/create'); // Create a new card
cardRouter.post('/activate'); // Activate a card
cardRouter.get('/view'); // View a card
cardRouter.get('/transactions'); // View transactions for a card
cardRouter.put('/block'); // Block a card
cardRouter.put('/unlock'); // Unlock a card

export default cardRouter;