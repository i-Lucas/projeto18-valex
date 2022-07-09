import * as cardRepository from '../repositories/card.js';

export async function checkEmployeeAlreadyCardType(employeeId: number, cardType: string) {

    const cardTypeEnum = cardType as cardRepository.TransactionTypes;
    const card = await cardRepository.findByTypeAndEmployeeId(cardTypeEnum, employeeId);
    if (card.length !== 0) throw { status: 409, message: 'This employee already has a card of this type' };
    return card;
};

export async function findCardByCvv(cvv: string) {
    const card = await cardRepository.findByCVV(cvv);
    if (!card) throw { status: 404, message: 'Card not found' };
    return card;
};

export async function activateCard(cardId: number, password: string) {
    await cardRepository.update(cardId, { isBlocked: false, password });
    return true;
};