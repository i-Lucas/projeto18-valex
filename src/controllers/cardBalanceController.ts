import { Request, Response } from 'express';
import balanceService from '../services/balanceCheckService.js';

export default async function cardBalance(req: Request, res: Response) {

    const { cardId } = req.body;
    const NumberInt = parseInt(cardId);
    const results = await balanceService.cardBalance(NumberInt);

    res.status(200).send(results);
};