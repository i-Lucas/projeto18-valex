import companiesService from './companiesServices.js';
import cardsService from './cardsServices.js';
import currentDate from '../utils/currentDate.js';

async function validateCardRecharge(companyKey: string, cardId: number) {

    const company = await companiesService.validateCompany(companyKey);
    const card = await cardsService.findCardById(cardId);
    if (!card) throw { status: 404, message: 'Card not found' };
    if (card.isBlocked) throw { status: 403, message: 'This card is blocked' };
    if (card.expirationDate < currentDate()) throw { status: 403, message: 'This card is expired' };
    await companiesService.checkCardfromCompany(company.id, card.id);
};

async function rechargeCard(cardId: number, amount: number) {
    await cardsService.rechargeCard(cardId, amount);
};

const cardRechargeService = {
    validateCardRecharge,
    rechargeCard
};

export default cardRechargeService;