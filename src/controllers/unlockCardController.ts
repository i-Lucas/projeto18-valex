import { Request, Response } from 'express';
import cardLockService from '../services/cardLockService.js';

export default async function unlockCard(req: Request, res: Response) {

    const { cardId, cardPassword } = req.body;
    const cardNumberInt = parseInt(cardId);

    await cardLockService.validateCard(cardNumberInt, cardPassword, 'unlock');
    await cardLockService.unblockCard(cardNumberInt);

    res.sendStatus(200);
};
