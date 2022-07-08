import { faker } from '@faker-js/faker';
import Cryptr from 'cryptr';

import { validateCompany, validateCompanyEmployee } from './companies.js';
import { validateEmployee } from './employee.js';
import { checkEmployeeAlreadyCardType } from './cards.js';

import * as cardRepository from '../repositories/card.js';

export async function validateBusinessRules(apikey: string, employeeId: number, cardType: string) {

    const company = await validateCompany(apikey);
    const employee = await validateEmployee(employeeId);
    await validateCompanyEmployee(company.id, employeeId);
    await checkEmployeeAlreadyCardType(employeeId, cardType);
    return { employeeId, fullName: employee.fullName, cardType: cardType };
};

export async function createNewCard(employeeId: number, cardholderName: string, type: cardRepository.TransactionTypes) {

    const cardNumber = faker.finance.creditCardNumber('63[7-9]#-####-####-###L');
    const cardCVV = faker.finance.creditCardCVV();
    
    const cryptr = new Cryptr(cardCVV);
    const expiration = new Date(new Date().getFullYear() + 5, new Date().getMonth()).toISOString().substring(0, 7);

    await cardRepository.insert({
        employeeId,
        number: cardNumber,
        cardholderName: getFormattedName(cardholderName),
        securityCode: cryptr.encrypt(cardNumber),
        expirationDate: expiration,
        password: 'isBlocked',
        isVirtual: false,
        originalCardId: null,
        isBlocked: true,
        type
    });
};

export function convertTypes(apikey: string, employeeId: string, cardType: string) {

    apikey = apikey.toString();
    let employeeIdNumber = parseInt(employeeId);
    let cardTypeString = cardType.toString();
    return { apikey, employeeIdNumber, cardTypeString };
};

function getFormattedName(name: string) {

    const arrayName = name.split(' ');
    if (arrayName.length >= 3) {
        const firstName = arrayName[0];
        const middleName = arrayName[1];
        const lastName = arrayName[2];
        const middleNameFirstLetter = middleName.charAt(0);
        return `${firstName} ${middleNameFirstLetter} ${lastName}`;
    } else return name;
};
