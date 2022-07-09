import { NextFunction, Request, Response } from "express";

export default async function validatePurchases(req: Request, res: Response, next: NextFunction) {

    const { cardId, cardPassword, businessId, amount } = req.body;

    if (!cardId) throw { status: 400, message: 'Missing card identifier' };
    if (!cardPassword) throw { status: 400, message: 'Missing card Password' };
    if (!businessId) throw { status: 400, message: 'Missing business identifier' };
    if (!amount) throw { status: 400, message: 'Missing amount' };
    if (typeof (amount) !== 'number') throw { status: 400, message: 'Invalid amount' };
    if (amount <= 0) throw { status: 400, message: 'Invalid amount' };
    
    next();
};