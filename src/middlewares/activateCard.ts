import { NextFunction, Request, Response } from "express";

export async function activateSchema(req: Request, res: Response, next: NextFunction) {

    const { cardCVV, password } = req.body;
    if (!cardCVV) throw { status: 400, message: 'Missing Card CVV' };
    if (!password) throw { status: 400, message: 'Missing Card Password' };
    if (password.length !== 4) throw { status: 400, message: 'Invalid Card Password' };
    next();
}