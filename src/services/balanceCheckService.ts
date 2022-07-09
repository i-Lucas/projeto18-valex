import cardsService from './cardsServices.js';

async function cardBalance(id: number) {

    const cardId = await cardsService.findById(id);
    if (!cardId) throw { status: 404, message: 'Card not found' };

    const payments = await cardsService.payments(cardId.id);
    const recharges = await cardsService.recharges(cardId.id);
    const balance = payments.reduce((acc, cur) => acc + cur.amount, 0) - recharges.reduce((acc, cur) => acc + cur.amount, 0);

    return {
        balance,
        transactions: payments.length === 0 ? 'no transaction found' : payments,
        recharges: recharges.length === 0 ? 'no recharge done' : recharges
    };
};

const balanceService = {
    cardBalance
};

export default balanceService;