import { Request, Response } from 'express';
import cardPurchaseService from '../services/purchasesCardServices.js';

export default async function cardPurchase(req: Request, res: Response) {

    const { cardId, cardPassword, businessId, amount } = req.body;
    const cardNumberInt = parseInt(cardId);
    const amountInt = parseInt(amount);
    const businessIdInt = parseInt(businessId);

    await cardPurchaseService.validateNewPurchase(cardNumberInt, cardPassword, businessIdInt, amountInt);
    await cardPurchaseService.savePurchase(cardNumberInt, businessIdInt, amountInt);
    res.sendStatus(201);
};