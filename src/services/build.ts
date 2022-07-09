import { faker } from '@faker-js/faker';
import encryptionSystem from './encrypted.js';
import companiesService from './companies.js';
import employeeService from './employee.js';
import cardsService from './cards.js';

import * as cardRepository from '../repositories/card.js';

async function validate(apikey: string, employeeId: number, cardType: string) {

    const company = await companiesService.validate(apikey);
    const employee = await employeeService.validate(employeeId);

    await companiesService.validateEmployee(company.id, employeeId);
    await cardsService.validateEmployeeCardType(employeeId, cardType);

    return {
        employeeId,
        fullName: employee.fullName,
        cardType: cardType
    };
};

async function build(employeeId: number, cardholderName: string, type: cardRepository.TransactionTypes) {

    const cardNumber = faker.finance.creditCardNumber('63[7-9]#-####-####-###L');
    const cardCVV = faker.finance.creditCardCVV();
    const encrypted = encryptionSystem.encrypted(cardCVV);
    const expiration = new Date(new Date().getFullYear() + 5, new Date().getMonth()).toISOString().substring(0, 7);

    await cardRepository.insert({

        employeeId,
        number: cardNumber,
        cardholderName: getFormattedName(cardholderName),
        securityCode: encrypted,
        expirationDate: expiration,
        password: 'isBlocked',
        isVirtual: false,
        originalCardId: null,
        isBlocked: true,
        type

    });

    return {
        cardNumber,
        cardCVV
    };
};

function getFormattedName(name: string) {

    const arrayName = name.split(' ');

    if (arrayName.length >= 3) {

        const firstName = arrayName[0];
        const middleName = arrayName[1];
        const lastName = arrayName[2];
        const middleNameFirstLetter = middleName.charAt(0);

        return `${firstName} ${middleNameFirstLetter} ${lastName}`;

    } else {

        return name;
    }
};

const buildCardService = {
    validate,
    build
};

export default buildCardService;