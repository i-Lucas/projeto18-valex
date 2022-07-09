import { Request, Response } from 'express';
import { TransactionTypes } from '../repositories/card.js';
import buildCardService from '../services/build.js';
import activateService from '../services/activate.js';
import balanceService from '../services/balance.js';

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

async function balance(req: Request, res: Response) {

    const { cardNumber } = req.body;
    const NumberInt = parseInt(cardNumber);

    const results = await balanceService.balance(NumberInt);
    res.status(200).send(results);
};

const cardsController = {
    build,
    activate,
    balance
};

export default cardsController;