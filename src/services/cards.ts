import * as cardRepository from '../repositories/card.js';

async function validateEmployeeCardType(employeeId: number, cardType: string) {

    const cardTypeEnum = cardType as cardRepository.TransactionTypes;
    const card = await cardRepository.findByTypeAndEmployeeId(cardTypeEnum, employeeId);
    if (card.length !== 0) throw { status: 409, message: 'This employee already has a card of this type' };
    return card;
};

export async function findByCode(code: string) {
    const card = await cardRepository.findByCVV(code);
    if (!card) throw { status: 404, message: 'Card not found' };
    return card;
};

export async function activate(cardId: number, password: string) {
    await cardRepository.update(cardId, { isBlocked: false, password });
    return true;
};

const cardsService = {
    validateEmployeeCardType,
    findByCode,
    activate
};

export default cardsService;