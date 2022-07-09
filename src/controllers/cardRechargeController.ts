import { Request, Response } from 'express';
import cardRechargeService from '../services/cardRechargeService.js';

export default async function cardRecharge(req: Request, res: Response) {

    const { companykey } = req.headers as any;
    const { cardNumber, rechargeAmount } = req.body;
    const cardNumberInt = parseInt(cardNumber);
    const AmountInt = parseInt(rechargeAmount);

    await cardRechargeService.validateCardRecharge(companykey, cardNumberInt);
    await cardRechargeService.rechargeCard(cardNumberInt, AmountInt);

    res.sendStatus(201);
};