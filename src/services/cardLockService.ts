import cardsService from './cardsServices.js';
import currentMonthAndYear from '../utils/currentDate.js';
import encryptionSystem from './encryptionServices.js';

async function validateCard(cardId: number, password: string, operation: string) {

    const card = await cardsService.findCardById(cardId);
    if (!card) throw { status: 404, message: 'Card not found' };

    if (! await cardsService.validateCardPassword(card.id, encryptionSystem.encryptIt(password)))
        throw { status: 401, message: 'Invalid password' };

    if (operation === 'block') {
        if (await cardsService.checkBlocked(card.id))
            throw { status: 400, message: 'This card already blocked' };
    }

    else if (operation === 'unlock') {
        if (!await cardsService.checkBlocked(card.id))
            throw { status: 400, message: 'This card already unlocked' };
    }

    if (currentMonthAndYear() > card.expirationDate) throw { status: 400, message: 'This card expired' };
    return true;
};

async function blockCard(cardId: number) {
    await cardsService.blockCard(cardId);
    return true;
};

async function unblockCard(cardId: number) {
    await cardsService.unblockCard(cardId);
    return true;
}

const cardLockService = {
    validateCard,
    blockCard,
    unblockCard
};

export default cardLockService;