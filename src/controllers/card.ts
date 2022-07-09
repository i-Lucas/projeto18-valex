import { Request, Response } from 'express';
import { TransactionTypes } from '../repositories/card.js';
import { validateBusinessRules, createNewCard, convertTypes } from '../services/newCard.js';

export async function createCard(req: Request, res: Response) {

    let { apikey } = req.headers as any;
    let { cardType, employeeId } = req.body;

    const data = convertTypes(apikey, employeeId, cardType);
    const result = await validateBusinessRules(data.apikey, data.employeeIdNumber, data.cardTypeString);
    const cardData = await createNewCard(result.employeeId, result.fullName, result.cardType as TransactionTypes);
    res.status(201).send(cardData);
}