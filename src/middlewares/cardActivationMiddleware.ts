import { NextFunction, Request, Response } from "express";

export default async function validateActivation(req: Request, res: Response, next: NextFunction) {

    const { cardCVV, cardPassword } = req.body;

    if (!cardCVV) throw { status: 400, message: 'Missing Card CVV' };
    if (!cardPassword) throw { status: 400, message: 'Missing Card Password' };
    if (cardPassword.length !== 4) throw { status: 400, message: 'Invalid Card Password' };
    
    next();
};