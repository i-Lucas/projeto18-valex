import * as cardRepository from '../repositories/cardsRepository.js';
import * as paymentsRepository from '../repositories/paymentRepository.js';
import * as rechargesRepository from '../repositories/rechargeRepository.js';

async function validateEmployeeCardType(employeeId: number, cardType: string) {

    const cardTypeEnum = cardType as cardRepository.TransactionTypes;
    const card = await cardRepository.findByTypeAndEmployeeId(cardTypeEnum, employeeId);
    if (card.length !== 0) throw { status: 409, message: 'This employee already has a card of this type' };
    return card;
};

async function findByCode(code: string) {
    const card = await cardRepository.findByCVV(code);
    if (!card) throw { status: 404, message: 'Card not found' };
    return card;
};

async function activate(cardId: number, password: string) {
    await cardRepository.update(cardId, { isBlocked: false, password });
    return true;
};

async function findById(cardId: number) {

    const card = await cardRepository.findById(cardId);
    if (!card) throw { status: 404, message: 'Card not found' };
    return card;
};

async function payments(cardId: number) {

    const payments = await paymentsRepository.findByCardId(cardId);
    return payments;
};

async function recharges(cardId: number) {

    const recharges = await rechargesRepository.findByCardId(cardId);
    return recharges;
}

const cardsService = {
    validateEmployeeCardType,
    findByCode,
    activate,
    findById,
    payments,
    recharges
};

export default cardsService;