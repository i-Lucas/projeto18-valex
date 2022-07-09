import cardsService from './cardsServices.js';
import currentDate from '../utils/currentDate.js';

export default async function checkCardStatus(cardId: number) {
    const card = await cardsService.findCardById(cardId);
    if (!card) throw { status: 404, message: 'Card not found' };
    if (card.isBlocked) throw { status: 403, message: 'This card is blocked' };
    if (card.expirationDate < currentDate()) throw { status: 403, message: 'This card is expired' };
    return card;
};