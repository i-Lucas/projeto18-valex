import { Router } from 'express';

import cardsController from '../controllers/cardsControllers.js';
import cardsMiddleware from '../middlewares/cardsMiddlewares.js';

const cardRouter = Router();

cardRouter.post('/create', cardsMiddleware.validateNewCard, cardsController.createNewCard); // Create a new card
cardRouter.post('/activate', cardsMiddleware.validateActivation, cardsController.activateCard); // Activate a card
cardRouter.get('/view'); // View a card
cardRouter.get('/transactions', cardsMiddleware.validateIdentifier, cardsController.cardBalance); // View transactions for a card
cardRouter.put('/block', cardsMiddleware.validateCardLock, cardsController.lockCard); // Block a card
cardRouter.put('/unlock', cardsMiddleware.validateCardLock, cardsController.unlockCard); // Unlock a card

export default cardRouter;