const Salesman = require('../models/Salesman');
const Salesorder = require('../models/Salesorders');
const orangeService = require('../services/orangehrm-service');
const opencrxService = require('../services/opencrx-service');
const dbService = require('../services/db-service');

exports.fetchAllEmployees = async (req, res) => {
    let employees = await orangeService.getAllEmployees()
        .then(result => result.data)
        .then(employee => employee.forEach(entry => {
            let tmpSalesman = new Salesman(undefined, entry.firstName, entry.lastName, entry.employeeId, entry.unit);
            if(tmpSalesman.department === 'Sales') {
                dbService.storeSalesman(tmpSalesman);
            }
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