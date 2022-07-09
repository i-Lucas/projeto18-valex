import * as cardRepository from '../repositories/card.js';
import encryptionSystem from './encrypted.js';

export async function validateActivateCardBusinessRules(cardCVV: string, password: string) {

    const encrypted = encryptionSystem.encrypted(cardCVV);
    const card = await cardRepository.findByCVV(encrypted);
    if (!card) throw { status: 404, message: 'Card not found' };
    if(!card.isBlocked) throw { status: 400, message: 'This card already activated' };
    const currentDate = new Date(new Date().getFullYear(), new Date().getMonth()).toISOString().substring(0, 7);
    if(currentDate > card.expirationDate) throw { status: 400, message: 'This card expired' };
    return card.id;
}

export async function activateCardService(cardId: number, password: string) {

    const encrypted = encryptionSystem.encrypted(password);
    await cardRepository.update(cardId, { isBlocked: false, password: encrypted });
    return true;
}