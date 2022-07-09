import * as businessServices from '../repositories/businessRepository.js';

export default async function validateBusiness(businessId: number) {

    const business = await businessServices.findById(businessId);
    if (!business) throw { status: 404, message: 'Business not found' };
    return business;
};