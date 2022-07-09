import { NextFunction, Request, Response } from "express";

export default async function validateCardRecharge(req: Request, res: Response, next: NextFunction) {

    const { companykey } = req.headers;
    const { cardId, rechargeAmount } = req.body;

    if (!companykey) throw { status: 400, message: 'Missing API key' };
    if (!cardId) throw { status: 400, message: 'Missing card identifier' };
    if (typeof (rechargeAmount) !== 'number') throw { status: 400, message: 'Invalid recharge amount' };
    if (rechargeAmount <= 0) throw { status: 400, message: 'Invalid Recharge Amount' };
    if (!rechargeAmount) throw { status: 400, message: 'Missing Recharge Amount' };
    
    next();
};