import { NextFunction, Request, Response } from "express";

export default async function validateCardLock(req: Request, res: Response, next: NextFunction) {

    const { cardId, cardPassword } = req.body;

    if (!cardId) throw { status: 400, message: 'Missing card identifier' };
    if (!cardPassword) throw { status: 400, message: 'Missing card Password' };
    
    next();
};