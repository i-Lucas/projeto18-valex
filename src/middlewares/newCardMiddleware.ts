import { NextFunction, Request, Response } from "express";

export default async function validateNewCard(req: Request, res: Response, next: NextFunction) {

    const { employeeId, cardType } = req.body;
    const { companykey } = req.headers;

    if (!companykey) throw { status: 400, message: 'Missing API key' };
    if (!employeeId) throw { status: 400, message: 'Missing employee identifier' };
    if (!cardType) throw { status: 400, message: 'Missing card type' };

    const cardTypeList = ['groceries', 'restaurants', 'transport', 'education', 'health'];
    if (!cardTypeList.includes(cardType)) throw { status: 400, message: 'Invalid card type' };
    
    next();
};