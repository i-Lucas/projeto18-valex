import * as cardRepository from '../repositories/card.js';
import { TransactionTypes } from '../repositories/card.js';

export async function checkEmployeeAlreadyCardType(employeeId: number, cardType: string) {

    const cardTypeEnum = cardType as TransactionTypes;
    const card = await cardRepository.findByTypeAndEmployeeId(cardTypeEnum, employeeId);
    if (card.length !== 0) throw { status: 409, message: 'This employee already has a card of this type' };
    return card;
}