import cardsService from './cardsServices.js';

async function cardBalance(id: number) {

    const cardId = await cardsService.findCardById(id);
    if (!cardId) throw { status: 404, message: 'Card not found' };

    const payments = await cardsService.findCardPayments(cardId.id);
    const recharges = await cardsService.findCardRecharges(cardId.id);
    const balance = recharges.reduce((acc, cur) => acc + cur.amount, 0) -
        payments.reduce((acc, cur) => acc + cur.amount, 0);

    return {
        balance,
        transactions: payments,
        recharges: recharges
    };
};

const balanceService = {
    cardBalance
};

export default balanceService;