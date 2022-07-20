import * as cardRepository from '../repositories/cardsRepository.js';
import * as paymentsRepository from '../repositories/paymentRepository.js';
import * as rechargesRepository from '../repositories/rechargeRepository.js';

import currentMonthAndYear from '../utils/currentDate.js';
import encryptionSystem from './encryptionServices.js';

async function validateEmployeeCardType(employeeId: number, cardType: string) {

    const cardTypeEnum = cardType as cardRepository.TransactionTypes;
    const card = await cardRepository.findByTypeAndEmployeeId(cardTypeEnum, employeeId);
    if (card.length !== 0) throw { status: 409, message: 'This employee already has a card of this type' };
    return card;
};

async function findCardByCode(code: string) {
    const card = await cardRepository.findByCVV(code);
    if (!card) throw { status: 404, message: 'Card not found' };
    return card;
};

async function activateCard(cardId: number, password: string) {
    await cardRepository.update(cardId, { isBlocked: false, password });
};

async function findCardById(cardId: number) {

    const card = await cardRepository.findById(cardId);
    if (!card) throw { status: 404, message: 'Card not found' };
    return card;
};

async function findCardPayments(cardId: number) {

    const payments = await paymentsRepository.findByCardId(cardId);
    return payments;
};

async function findCardRecharges(cardId: number) {

    const recharges = await rechargesRepository.findByCardId(cardId);
    return recharges;
};

async function checkCardExpiration(cardId: number) {

    const card = await cardRepository.findById(cardId);
    if (currentMonthAndYear() > card.expirationDate) return false;
    return true;
};

async function checkBlocked(cardId: number) {

    const card = await cardRepository.findById(cardId);
    if (card.isBlocked) return true;
    else return false;
};

async function validateCardPassword(cardId: number, password: string) {

    const card = await cardRepository.findById(cardId);
    if (card.password !== password) return false;
    return true;
};

async function blockCard(cardId: number) {
    await cardRepository.update(cardId, { isBlocked: true });
};

async function unblockCard(cardId: number) {
    await cardRepository.update(cardId, { isBlocked: false });
};

async function rechargeCard(cardId: number, amount: number) {
    await rechargesRepository.insert({ cardId, amount });
};

async function saveCardPurchase(cardId: number, businessId: number, amount: number) {
    await paymentsRepository.insert({ cardId, businessId, amount });
};

const cardsService = {

    validateEmployeeCardType,
    findCardByCode,
    activateCard,
    findCardById,
    findCardPayments,
    findCardRecharges,
    checkCardExpiration,
    checkBlocked,
    validateCardPassword,
    blockCard,
    unblockCard,
    rechargeCard,
    saveCardPurchase
};

export default cardsService;