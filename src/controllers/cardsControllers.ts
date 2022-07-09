import { Request, Response } from 'express';
import { TransactionTypes } from '../repositories/cardsRepository.js';
import buildCardService from '../services/createNewCardService.js';
import activateService from '../services/activateCardService.js';
import balanceService from '../services/balanceCheckService.js';
import cardLockService from '../services/cardLockService.js';

async function createNewCard(req: Request, res: Response) {

    let { apikey } = req.headers as any;
    let { cardType, employeeId } = req.body;
    let IdInt = parseInt(employeeId);

    const result = await buildCardService.validateCard(apikey, IdInt, cardType);
    const card = await buildCardService.buildCard(result.employeeId, result.fullName, result.cardType as TransactionTypes);
    res.status(201).send(card);
}

async function activateCard(req: Request, res: Response) {

    const { cardCVV, password } = req.body;
    const cardId = await activateService.validateCard(cardCVV);
    await activateService.activateCard(cardId, password);
    res.sendStatus(200);
};

async function cardBalance(req: Request, res: Response) {

    const { cardNumber } = req.body;
    const NumberInt = parseInt(cardNumber);
    const results = await balanceService.cardBalance(NumberInt);
    res.status(200).send(results);
};

async function lockCard(req: Request, res: Response) {

    const { cardNumber, cardPassword } = req.body;
    const NumberInt = parseInt(cardNumber);
    
    await cardLockService.validateCard(NumberInt, cardPassword, 'block');
    await cardLockService.blockCard(NumberInt);
    res.sendStatus(200);
};

async function unlockCard(req: Request, res: Response) {

    const { cardNumber, cardPassword } = req.body;
    const NumberInt = parseInt(cardNumber);

    await cardLockService.validateCard(NumberInt, cardPassword, 'unlock');
    await cardLockService.unblockCard(NumberInt);
    res.sendStatus(200);
}

const cardsController = {
    createNewCard,
    activateCard,
    cardBalance,
    lockCard,
    unlockCard
};

export default cardsController;