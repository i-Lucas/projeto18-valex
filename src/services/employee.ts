import * as employeeRepository from '../repositories/employee.js';

async function validate(employeeId: number) {
    const employee = await employeeRepository.findById(employeeId);
    if (!employee) throw { status: 404, message: 'Employee not found' };
    return employee;
};

const employeeService = {
    validate
};

export default employeeService;