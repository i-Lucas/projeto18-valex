import cardsService from './cardsServices.js';
import encryptionSystem from './encryptionServices.js';

async function validateCard(cardCVV: string, password: string) {

    const encrypted = encryptionSystem.encryptIt(cardCVV);
    const card = await cardsService.findByCode(encrypted);
    if(!card.isBlocked) throw { status: 400, message: 'This card already activated' };
    const currentDate = new Date(new Date().getFullYear(), new Date().getMonth()).toISOString().substring(0, 7);
    if(currentDate > card.expirationDate) throw { status: 400, message: 'This card expired' };
    return card.id;
};

async function activateCard(cardId: number, password: string) {

    const encrypted = encryptionSystem.encryptIt(password);
    const result = await cardsService.activate(cardId, encrypted);
    return result ? true : false;
};

const activateService = {
    validateCard,
    activateCard
};

export default activateService;