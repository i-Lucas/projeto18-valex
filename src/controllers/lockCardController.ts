import { Request, Response } from 'express';
import cardLockService from '../services/cardLockService.js';

export default async function lockCard(req: Request, res: Response) {

    const { cardId, cardPassword } = req.body;
    const cardNumberInt = parseInt(cardId);

    await cardLockService.validateCard(cardNumberInt, cardPassword, 'block');
    await cardLockService.blockCard(cardNumberInt);

    res.sendStatus(200);
};