const Salesman = require('../models/Salesman');
const Salesorder = require('../models/Salesorders');
const orangeService = require('../services/orangehrm-service');
const opencrxService = require('../services/opencrx-service');
const salesmanapi = require('../apis/salesman-api');

exports.fetchAllEmployees = async (req, res) => {
    let employees = await orangeService.getAllEmployees()
        .then(result => result.data)
        .then(employee => employee.forEach(entry => {
            let employee = JSON.parse(entry);
            let tmpSalesman = new Salesman(undefined, employee.firstname, employee.lastname, employee.employeeId, employee.department);
        }));
    res.status(200).send(employees);
}

exports.getAllSalesorders = async (req, res) => {
    let salesorders = await opencrxService.getSalesorders()
        .then(result => result.data)
        .then(salesorder => salesorder.forEach(entry => {
            let salesorder = JSON.parse(entry);
            let order = new Salesorder(salesorder._id, salesorder.customername, salesorder.clientRankingNumber, salesorder.salesmanId, salesorder.itemsHooverGo, salesorder.itemsHooverClean, salesorder.year);
        }))
        .catch(err => {
            console.log(err)
        })
    res.status(200).send(salesorders);
}