import { Request, Response } from 'express';
import { TransactionTypes } from '../repositories/card.js';
import { validateNewCardBusinessRules, createNewCard, convertTypes } from '../services/newCard.js';
import { validateActivateCardBusinessRules, activateCardService } from '../services/activateCard.js';

export async function createCard(req: Request, res: Response) {

    let { apikey } = req.headers as any;
    let { cardType, employeeId } = req.body;

    const data = convertTypes(apikey, employeeId, cardType);
    const result = await validateNewCardBusinessRules(data.apikey, data.employeeIdNumber, data.cardTypeString);
    const cardData = await createNewCard(result.employeeId, result.fullName, result.cardType as TransactionTypes);
    res.status(201).send(cardData);
}

export async function activateCard(req: Request, res: Response) {

    const { cardCVV, password } = req.body;
    const cardId = await validateActivateCardBusinessRules(cardCVV, password);
    const result = await activateCardService(cardId, password);
    result ? res.sendStatus(200) : res.status(500).send('Something went wrong :/');
};