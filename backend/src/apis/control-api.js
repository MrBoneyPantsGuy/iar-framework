const Salesman = require('../models/Salesman');
const orangeService = require('../services/orangehrm-service');
const authService = require('../services/auth-service');
const {ObjectId} = require("mongodb");

exports.fetchAllEmployees = async (req, res) => {
    let employees = await orangeService.getAllEmployees()
        .then(result => result.data)
        .then(employee => employee.forEach(entry => {
            let employee = JSON.parse(entry);
            let tmpSalesman = new Salesman(undefined, employee.firstname, employee.lastname, employee.employeeId, employee.department);
            // TODO store salesman in database
        }));
    res.status(200).send(employees);
}