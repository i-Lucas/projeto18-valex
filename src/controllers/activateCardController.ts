import { Request, Response } from 'express';
import activateService from '../services/activateCardService.js';

export default async function activateCard(req: Request, res: Response) {

    const { cardCVV, cardPassword } = req.body;
    const cardId = await activateService.validateCard(cardCVV);

    await activateService.activateCard(cardId, cardPassword);

    res.sendStatus(200);
};