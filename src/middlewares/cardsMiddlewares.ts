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
    const { companykey } = req.headers;

    if (!companykey) throw { status: 400, message: 'Missing API key' };
    if (!employeeId) throw { status: 400, message: 'Missing employee identifier' };
    if (!cardType) throw { status: 400, message: 'Missing card type' };

    const cardTypeList = ['groceries', 'restaurants', 'transport', 'education', 'health'];
    if (!cardTypeList.includes(cardType)) throw { status: 400, message: 'Invalid card type' };
    next();
};

async function validateIdentifier(req: Request, res: Response, next: NextFunction) {

    const { cardId } = req.body;
    if (!cardId) throw { status: 400, message: 'Missing card identifier' };
    next();
};

async function validateCardLock(req: Request, res: Response, next: NextFunction) {

    const { cardId, cardPassword } = req.body;

    if (!cardId) throw { status: 400, message: 'Missing card identifier' };
    if (!cardPassword) throw { status: 400, message: 'Missing card Password' };
    next();
};

async function validateCardRecharge(req: Request, res: Response, next: NextFunction) {

    const { companykey } = req.headers;
    const { cardId, rechargeAmount } = req.body;

    if (!companykey) throw { status: 400, message: 'Missing API key' };
    if (!cardId) throw { status: 400, message: 'Missing card identifier' };
    if (typeof (rechargeAmount) !== 'number') throw { status: 400, message: 'Invalid recharge amount' };
    if (rechargeAmount <= 0) throw { status: 400, message: 'Invalid Recharge Amount' };
    if (!rechargeAmount) throw { status: 400, message: 'Missing Recharge Amount' };
    next();
};

async function validatePurchases(req: Request, res: Response, next: NextFunction) {

    const { cardId, cardPassword, businessId, amount } = req.body;

    if (!cardId) throw { status: 400, message: 'Missing card identifier' };
    if (!cardPassword) throw { status: 400, message: 'Missing card Password' };
    if (!businessId) throw { status: 400, message: 'Missing business identifier' };
    if (!amount) throw { status: 400, message: 'Missing amount' };
    if (typeof (amount) !== 'number') throw { status: 400, message: 'Invalid amount' };
    if (amount <= 0) throw { status: 400, message: 'Invalid amount' };
    next();
};

const cardsMiddleware = {

    validateActivation,
    validateNewCard,
    validateIdentifier,
    validateCardLock,
    validateCardRecharge,
    validatePurchases
};

export default cardsMiddleware;