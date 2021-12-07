const Salesman = require('../models/Salesman');
const Salesorder = require('../models/Salesorders');
const Customer = require('../models/Customers');
const orangeService = require('../services/orangehrm-service');
const opencrxService = require('../services/opencrx-service');
const dbService = require('../services/db-service');

exports.fetchAllEmployees = async (req, res) => {
    let result = [];
    let employees = await orangeService.getAllEmployees()
        .then(result => result.data)
        .then(employee => employee.forEach(entry => {
            let tmpSalesman = new Salesman(undefined, entry.firstName, entry.lastName, entry.employeeId, entry.unit, entry.code);
            if(tmpSalesman.department === 'Sales') {
                dbService.storeSalesman(tmpSalesman);
                result.push(tmpSalesman);
            }
        }));
    res.status(200).send(result);
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
    let salesOrdersResult = await opencrxService.getSalesorders()
        .catch(err => {
            console.log(err)
        })
    for(let salesOrder of salesOrdersResult) {
        let order = new Salesorder(salesOrder._id, salesOrder.customername, salesOrder.clientRankingNumber, salesOrder.governmentId, salesOrder.itemsHooverGo, salesOrder.itemsHooverClean, salesOrder.year);
        let storage = await dbService.storeRecord(order).catch(err => console.log(err));
        s.push(order);
    }
    res.status(200).send(s);
}