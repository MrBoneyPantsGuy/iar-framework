const Salesman = require('../models/Salesman');
const orangeService = require('../services/orangehrm-service');
const salesmanapi = require('../apis/salesman-api');
const authService = require('../services/auth-service');

exports.fetchAllEmployees = async (req, res) => {
    let employees = await orangeService.getAllEmployees()
        .then(result => result.data)
        .then(employee => employee.forEach(entry => {
            let employee = JSON.parse(entry);
            let tmpSalesman = new Salesman(employee.firstname, employee.lastname, employee.employeeId, employee.department);
            salesmanapi.createSalesman(tmpSalesman);
        }));
    res.status(200).send(employees);
}