import { NextFunction, Request, Response } from "express";

export async function activate(req: Request, res: Response, next: NextFunction) {

    const { cardCVV, password } = req.body;
    if (!cardCVV) throw { status: 400, message: 'Missing Card CVV' };
    if (!password) throw { status: 400, message: 'Missing Card Password' };
    if (password.length !== 4) throw { status: 400, message: 'Invalid Card Password' };
    next();
};

export async function build(req: Request, res: Response, next: NextFunction) {

    const { employeeId, cardType } = req.body;
    const { apikey } = req.headers;

    if (!apikey) throw { status: 400, message: 'Missing API key' };
    if (!employeeId) throw { status: 400, message: 'Missing employee identifier' };
    if (!cardType) throw { status: 400, message: 'Missing card type' };

    const cardTypeList = ['groceries', 'restaurants', 'transport', 'education', 'health'];
    if (!cardTypeList.includes(cardType)) throw { status: 400, message: 'Invalid card type' };
    next();
};

const cardsMiddleware = {
    activate,
    build
};

export default cardsMiddleware;