import * as employeeRepository from '../repositories/employeeRepository.js';

async function validateEmployee(employeeId: number) {
    const employee = await employeeRepository.findById(employeeId);
    if (!employee) throw { status: 404, message: 'Employee not found' };
    return employee;
};

const employeeService = {
    validateEmployee
};

export default employeeService;