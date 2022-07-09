import * as companyRepository from '../repositories/companyRepository.js';
import * as employeeRepository from '../repositories/employeeRepository.js';

async function validateCompany(companyKey: string) {
    const company = await companyRepository.findByApiKey(companyKey);
    if (!company) throw { status: 401, message: 'Invalid API key' };
    return company;
};

async function validateEmployee(companyId: number, employeeId: number) {

    const employee = await employeeRepository.findById(employeeId);
    if (employee.companyId !== companyId) throw { status: 404, message: 'This employee is not part of this company' };
    return employee;
};

async function checkCardfromCompany(companyId: number, thisCardId: number) {

    const companyCards = await companyRepository.findCompanyCards(companyId);
    const card = companyCards.find(card => card.cardId === thisCardId);
    if (!card) throw { status: 401, message: 'This card does not belong to your company' };
}

const companiesService = {
    validateCompany,
    validateEmployee,
    checkCardfromCompany
};

export default companiesService;