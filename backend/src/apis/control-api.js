const Salesman = require('../models/Salesman');
const Salesorder = require('../models/Salesorders');
const Customer = require('../models/Customers');
const orangeService = require('../services/orangehrm-service');
const opencrxService = require('../services/opencrx-service');
const dbService = require('../services/db-service');

exports.fetchAllEmployees = async (req, res) => {
    let employees = await orangeService.getAllEmployees()
        .then(result => result.data)
        .then(employee => employee.forEach(entry => {
            let tmpSalesman = new Salesman(undefined, entry.firstName, entry.lastName, entry.employeeId, entry.unit, entry.code);
            if(tmpSalesman.department === 'Sales') {
                dbService.storeSalesman(tmpSalesman);
            }
        }));
    res.status(200).send(employees);
}

exports.getAllCustomers = async (req, res) => {
    let c = [];
    let customers = await opencrxService.getAllCustomers()
        .then(customer => customer.forEach(entry => {
            let customer = new Customer(entry._id, entry.name, entry.accountRating);
            c.push(customer);
        }))
        .catch(err => { console.log(err) })
    res.status(200).send(c);
}

exports.getAllSalesorders = async (req, res) => {
    let s = [];
    let salesorders = await opencrxService.getSalesorders()
        .then(salesorder => salesorder.forEach(entry => {
            let order = new Salesorder(entry._id, entry.customername, entry.clientRankingNumber, entry.salesmanId, entry.itemsHooverGo, entry.itemsHooverClean, entry.year);
            s.push(order);
        }))
        .catch(err => {
            console.log(err)
        })
    let storage = await dbService.storeRecord(s[0]).then(console.log);
    res.status(200).send(s);
}