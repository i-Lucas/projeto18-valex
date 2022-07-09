import { NextFunction, Request, Response } from "express";

async function validateActivation(req: Request, res: Response, next: NextFunction) {

    const { cardCVV, password } = req.body;
    
    if (!cardCVV) throw { status: 400, message: 'Missing Card CVV' };
    if (!password) throw { status: 400, message: 'Missing Card Password' };
    if (password.length !== 4) throw { status: 400, message: 'Invalid Card Password' };
    next();
};

async function validateNewCard(req: Request, res: Response, next: NextFunction) {

    const { employeeId, cardType } = req.body;
    const { apikey } = req.headers;

    if (!apikey) throw { status: 400, message: 'Missing API key' };
    if (!employeeId) throw { status: 400, message: 'Missing employee identifier' };
    if (!cardType) throw { status: 400, message: 'Missing card type' };

    const cardTypeList = ['groceries', 'restaurants', 'transport', 'education', 'health'];
    if (!cardTypeList.includes(cardType)) throw { status: 400, message: 'Invalid card type' };
    next();
};

async function validateIdentifier(req: Request, res: Response, next: NextFunction) {

    const { cardNumber } = req.body;
    if (!cardNumber) throw { status: 400, message: 'Missing Card Number' };
    next();
};

async function validateCardLock(req: Request, res: Response, next: NextFunction) {

    const { cardNumber, cardPassword } = req.body;

    if (!cardNumber) throw { status: 400, message: 'Missing Card Number' };
    if (!cardPassword) throw { status: 400, message: 'Missing Card Password' };
    next();
};

const cardsMiddleware = {

    validateActivation,
    validateNewCard,
    validateIdentifier,
    validateCardLock
};

export default cardsMiddleware;