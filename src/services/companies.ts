import * as companyRepository from '../repositories/company.js';

export async function validateCompany(apiKey: string) {
    const company = await companyRepository.findByApiKey(apiKey);
    if (!company) throw { status: 401, message: 'Invalid API key' };
    return company;
}