import { Router } from 'express';

import createNewCard from '../controllers/newCardController.js';
import validateNewCard from '../middlewares/newCardMiddleware.js';

import activateCard from '../controllers/activateCardController.js';
import validateActivation from '../middlewares/cardActivationMiddleware.js';

import cardBalance from '../controllers/cardBalanceController.js';
import validateIdentifier from '../middlewares/cardIdentifierMiddleware.js';

import lockCard from '../controllers/lockCardController.js';
import unlockCard from '../controllers/unlockCardController.js';
import validateCardLock from '../middlewares/cardLockMiddleware.js';

const cardRouter = Router();

cardRouter.post('/create', validateNewCard, createNewCard); // Create a new card
cardRouter.post('/activate', validateActivation, activateCard); // Activate a card
cardRouter.get('/view'); // View a card
cardRouter.get('/transactions', validateIdentifier, cardBalance); // View transactions for a card
cardRouter.put('/block', validateCardLock, lockCard); // Block a card
cardRouter.put('/unlock', validateCardLock, unlockCard); // Unlock a card

export default cardRouter;