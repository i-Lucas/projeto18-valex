import cardsService from './cards.js';
import encryptionSystem from './encrypted.js';

async function validate(cardCVV: string, password: string) {

    const encrypted = encryptionSystem.encrypted(cardCVV);
    const card = await cardsService.findByCode(encrypted);
    if(!card.isBlocked) throw { status: 400, message: 'This card already activated' };
    const currentDate = new Date(new Date().getFullYear(), new Date().getMonth()).toISOString().substring(0, 7);
    if(currentDate > card.expirationDate) throw { status: 400, message: 'This card expired' };
    return card.id;
};

async function activate(cardId: number, password: string) {

    const encrypted = encryptionSystem.encrypted(password);
    const result = await cardsService.activate(cardId, encrypted);
    return result ? true : false;
};

const activateService = {
    validate,
    activate
};

export default activateService;