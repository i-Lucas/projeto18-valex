import cardsService from './cardsServices.js';
import encryptionSystem from './encryptionServices.js';
import currentMonthAndYear from '../utils/currentDate.js';

async function validateCard(cardCVV: string) {

    const encrypted = encryptionSystem.encryptIt(cardCVV);
    const card = await cardsService.findCardByCode(encrypted);
    if (!card.isBlocked) throw { status: 400, message: 'This card already activated' };
    if (currentMonthAndYear() > card.expirationDate) throw { status: 400, message: 'This card expired' };
    return card.id;
};

async function activateCard(cardId: number, password: string) {

    const encrypted = encryptionSystem.encryptIt(password);
    await cardsService.activateCard(cardId, encrypted);
};

const activateService = {
    validateCard,
    activateCard
};

export default activateService;