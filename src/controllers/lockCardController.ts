import { Request, Response } from 'express';
import cardLockService from '../services/cardLockService.js';

export default async function lockCard(req: Request, res: Response) {

    const { cardNumber, cardPassword } = req.body;
    const cardNumberInt = parseInt(cardNumber);

    await cardLockService.validateCard(cardNumberInt, cardPassword, 'block');
    await cardLockService.blockCard(cardNumberInt);

    res.sendStatus(200);
};