import * as companyRepository from '../repositories/company.js';
import * as employeeRepository from '../repositories/employee.js';

export async function validateCompany(apiKey: string) {
    const company = await companyRepository.findByApiKey(apiKey);
    if (!company) throw { status: 401, message: 'Invalid API key' };
    return company;
};

export async function validateCompanyEmployee(companyId: number, employeeId: number) {

    const employee = await employeeRepository.findById(employeeId);
    if(employee.companyId !== companyId) throw { status: 404, message: 'This employee is not part of this company' };
    return employee;
};