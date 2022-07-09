import { Router } from 'express';

import cardsController from '../controllers/card.js';
import cardsMiddleware from '../middlewares/cards.js';

const cardRouter = Router();

cardRouter.post('/create', cardsMiddleware.build, cardsController.build); // Create a new card
cardRouter.post('/activate', cardsMiddleware.activate, cardsController.activate); // Activate a card
cardRouter.get('/view'); // View a card
cardRouter.get('/transactions'); // View transactions for a card
cardRouter.put('/block'); // Block a card
cardRouter.put('/unlock'); // Unlock a card

export default cardRouter;