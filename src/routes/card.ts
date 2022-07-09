import { Router } from 'express';

import { createCard, activateCard } from '../controllers/card.js';
import { newCardSchema } from '../middlewares/newCard.js';
import { activateSchema } from '../middlewares/activateCard.js';

const cardRouter = Router();

cardRouter.post('/create', newCardSchema, createCard); // Create a new card
cardRouter.post('/activate', activateSchema, activateCard); // Activate a card
cardRouter.get('/view'); // View a card
cardRouter.get('/transactions'); // View transactions for a card
cardRouter.put('/block'); // Block a card
cardRouter.put('/unlock'); // Unlock a card

export default cardRouter;