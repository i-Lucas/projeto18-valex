import { Request, Response } from 'express';
import { TransactionTypes } from '../repositories/card.js';
import buildCardService from '../services/build.js';
import activateService from '../services/activate.js';

async function build(req: Request, res: Response) {

    let { apikey } = req.headers as any;
    let { cardType, employeeId } = req.body;
    let IdInt = parseInt(employeeId);

    const result = await buildCardService.validate(apikey, IdInt, cardType);
    const card = await buildCardService.build(result.employeeId, result.fullName, result.cardType as TransactionTypes);
    res.status(201).send(card);
}

async function activate(req: Request, res: Response) {

    const { cardCVV, password } = req.body;
    const cardId = await activateService.validate(cardCVV, password);
    const result = await activateService.activate(cardId, password);

    result ? res.sendStatus(200) :
        res.status(500).send('Something went wrong :/');
};

const cardsController = {
    build,
    activate
};

export default cardsController;