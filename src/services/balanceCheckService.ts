import cardsService from './cardsServices.js';

async function cardBalance(id: number) {

    const cardId = await cardsService.findCardById(id);
    if (!cardId) throw { status: 404, message: 'Card not found' };

    const payments = await cardsService.findCardPayments(cardId.id);
    const recharges = await cardsService.findCardRecharges(cardId.id);
    const balance = payments.reduce((acc, cur) => acc + cur.amount, 0) -
        recharges.reduce((acc, cur) => acc + cur.amount, 0);

    return {
        balance: balance !== 0 ? `$ ${balance}` : '$ 0.00',
        transactions: payments.length === 0 ? 'no transaction found' : payments,
        recharges: recharges.length === 0 ? 'no recharge done' : recharges
    };
};

const balanceService = {
    cardBalance
};

export default balanceService;