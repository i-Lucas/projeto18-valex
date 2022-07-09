import checkCardStatus from './cardStatusService.js';
import cardsService from './cardsServices.js';
import validateBusiness from './businessServices.js';
import balanceService from './balanceCheckService.js';

async function validateNewPurchase(cardId: number, cardPassword: string, businessId: number, amount: number) {

    const card = await checkCardStatus(cardId);
    const validatePassword = await cardsService.validateCardPassword(cardId, cardPassword);

    if (!validatePassword) throw { status: 401, message: 'Invalid card password' };
    const business = await validateBusiness(businessId);

    if (card.type !== business.type)
        throw { status: 403, message: 'This card is not compatible with this business' };

    const cardBalance = await balanceService.cardBalance(cardId);
    if (cardBalance.balance < amount) throw { status: 403, message: 'Insufficient funds' };
};

async function savePurchase(cardId: number, businessId: number, amount: number) {
    await cardsService.saveCardPurchase(cardId, businessId, amount);
};

const purchasesCardServices = {
    validateNewPurchase,
    savePurchase
};

export default purchasesCardServices;