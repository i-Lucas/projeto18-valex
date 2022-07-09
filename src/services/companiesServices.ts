import * as companyRepository from '../repositories/companyRepository.js';
import * as employeeRepository from '../repositories/employeeRepository.js';

async function validateCompany(apiKey: string) {
    const company = await companyRepository.findByApiKey(apiKey);
    if (!company) throw { status: 401, message: 'Invalid API key' };
    return company;
};

async function validateEmployee(companyId: number, employeeId: number) {

    const employee = await employeeRepository.findById(employeeId);
    if (employee.companyId !== companyId) throw { status: 404, message: 'This employee is not part of this company' };
    return employee;
};

const companiesService = {
    validateCompany,
    validateEmployee
};

export default companiesService;