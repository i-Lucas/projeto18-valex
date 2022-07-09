import { Request, Response } from 'express';

import { TransactionTypes } from '../repositories/cardsRepository.js';
import buildCardService from '../services/createNewCardService.js';
import activateService from '../services/activateCardService.js';
import balanceService from '../services/balanceCheckService.js';
import cardLockService from '../services/cardLockService.js';
import cardRechargeService from '../services/cardRechargeService.js';
import cardPurchaseService from '../services/purchasesCardServices.js';

async function createNewCard(req: Request, res: Response) {

    const { companykey } = req.headers as any;
    const { cardType, employeeId } = req.body;
    const employeeIdInt = parseInt(employeeId);

    const result = await buildCardService.validateCard(companykey, employeeIdInt, cardType);
    const card = await buildCardService.buildCard(result.employeeId, result.fullName, result.cardType as TransactionTypes);
    
    res.status(201).send(card);
};

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
    const cardNumberInt = parseInt(cardNumber);

    await cardLockService.validateCard(cardNumberInt, cardPassword, 'block');
    await cardLockService.blockCard(cardNumberInt);

    res.sendStatus(200);
};

async function unlockCard(req: Request, res: Response) {

    const { cardNumber, cardPassword } = req.body;
    const cardNumberInt = parseInt(cardNumber);

    await cardLockService.validateCard(cardNumberInt, cardPassword, 'unlock');
    await cardLockService.unblockCard(cardNumberInt);

    res.sendStatus(200);
};

async function cardRecharge(req: Request, res: Response) {

    const { companykey } = req.headers as any;
    const { cardNumber, rechargeAmount } = req.body;
    const cardNumberInt = parseInt(cardNumber);
    const AmountInt = parseInt(rechargeAmount);

    await cardRechargeService.validateCardRecharge(companykey, cardNumberInt);
    await cardRechargeService.rechargeCard(cardNumberInt, AmountInt);

    res.sendStatus(201);
};

async function cardPurchase(req: Request, res: Response) {

    const { cardId, cardPassword, businessId, amount } = req.body;
    const cardNumberInt = parseInt(cardId);
    const amountInt = parseInt(amount);
    const businessIdInt = parseInt(businessId);

    await cardPurchaseService.validateNewPurchase(cardNumberInt, cardPassword, businessIdInt, amountInt);
    await cardPurchaseService.savePurchase(cardNumberInt, businessIdInt, amountInt);
    res.sendStatus(201);
};

const cardsController = {

    createNewCard,
    activateCard,
    cardBalance,
    lockCard,
    unlockCard,
    cardRecharge,
    cardPurchase
};

export default cardsController;