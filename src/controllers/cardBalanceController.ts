import { Request, Response } from 'express';
import balanceService from '../services/balanceCheckService.js';

export default async function cardBalance(req: Request, res: Response) {

    const { cardNumber } = req.body;
    const NumberInt = parseInt(cardNumber);
    const results = await balanceService.cardBalance(NumberInt);

    res.status(200).send(results);
};