import { Request, Response } from 'express';
import buildCardService from '../services/createNewCardService.js';
import { TransactionTypes } from '../repositories/cardsRepository.js';

export default async function createNewCard(req: Request, res: Response) {

    const { companykey } = req.headers as any;
    const { cardType, employeeId } = req.body;
    const employeeIdInt = parseInt(employeeId);

    const result = await buildCardService.validateCard(companykey, employeeIdInt, cardType);
    const card = await buildCardService.buildCard(result.employeeId, result.fullName, result.cardType as TransactionTypes);

    res.status(201).send(card);
};