import { Request, Response } from 'express';
import { TransactionTypes } from '../repositories/cardsRepository.js';
import buildCardService from '../services/createNewCardService.js';
import activateService from '../services/activateCardService.js';
import balanceService from '../services/balanceCheckService.js';

async function createNewCard(req: Request, res: Response) {

    let { apikey } = req.headers as any;
    let { cardType, employeeId } = req.body;
    let IdInt = parseInt(employeeId);

    const result = await buildCardService.validateCard(apikey, IdInt, cardType);
    const card = await buildCardService.buildCard(result.employeeId, result.fullName, result.cardType as TransactionTypes);
    res.status(201).send(card);
}

async function activateCard(req: Request, res: Response) {

    const { cardCVV, password } = req.body;
    const cardId = await activateService.validateCard(cardCVV, password);
    const result = await activateService.activateCard(cardId, password);

    result ? res.sendStatus(200) :
        res.status(500).send('Something went wrong :/');
};

async function cardBalance(req: Request, res: Response) {

    const { cardNumber } = req.body;
    const NumberInt = parseInt(cardNumber);

    const results = await balanceService.cardBalance(NumberInt);
    res.status(200).send(results);
};

const cardsController = {
    createNewCard,
    activateCard,
    cardBalance
};

export default cardsController;