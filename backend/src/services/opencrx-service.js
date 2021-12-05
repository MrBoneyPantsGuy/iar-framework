const axios = require('axios');
const Customer = require('../models/Customers');
const baseUrl = 'https://sepp-crm.inf.h-brs.de/opencrs-rest-CRX'
const Salesorders = require('../models/Salesorders');
const credentials = {
    username: 'guest',
    password: 'guest',
};
//configure the authentication
const config = {
    headers: {
        'Accept': 'application/json'
    },
    auth: credentials,
};

exports.getAllCustomers = async () => {
    const contacts = await axios.get(`${baseUrl}/org.opencrx.kernel.account1/provider/CRX/segment/Standard/account`, config);
    const uncleardCustomers = contacts.data.objects;
    let customers = [];
    uncleardCustomers.forEach((obj) => {
        if(customers['@type'] === "org.opencrx.kernel.account1.LegalEntity"){
            let customer = new Customer(obj.identity.split('/')[obj.identity.split('/').length], obj.name, obj.accountRating);
            customers.push(customer);
        }
    });
    return customers;
}

exports.getSalesorders = async () => {
    //get all Salesorder
    const salesordersRes = await axios.get(`${baseUrl}/org.opencrx.kernel.contract1/provider/CRX/segment/Standard/salesOrder`, config);
    const uncleardOrders = salesordersRes.data.objects;
    let salesorders = [];
    uncleardOrders.forEach((order) => {
        //tmp variables for splitting the Salesman href
        let temp = order.salesRep;
        let tmp = temp['@href'].split('/');
        //Id for the responsible salesman
        const salesmanId = tmp[tmp.length];
        //Id for the Order
        const salesorderId = order['@href'].split('/')[order['@href'].split('/').length];
        //year of the order
        const year = order.createdAt.split('-')[0];
        //tmp variables for splitting the customer href
        temp = order.customer;
        tmp = temp['@href'].split('/');
        //the id of the customer
        const customerId = tmp[tmp.length];
        //search for customer details
        const customer = this.getAllCustomers().forEach((c) => {
            if(c._id === customerId){
                return c;
            }
        })
        //number of items of HooverClean
        let itemsHooverClean;
        //number of items of HooverGo
        let itemsHooverGo
        //get all positions of this salesorder
        const positions = await.get(`${order['@href']}/position`, config);
        const unclearedPositions = positions.data.objects;
        unclearedPositions.forEach((position) => {
            //check if hooverClean or HooverGo and set number of items sold
            if(position.productDescription === "Hoover for service agents"){
                itemsHooverClean = position.quantity;
            } else {
                itemsHooverGo = position.quantity;
            }
        });
        //insert all values in a new salesorder
        let salesorder = new Salesorders(salesorderId, customer.name, customer.accountRating, salesmanId, itemsHooverGo, itemsHooverClean, year);
        //add salesorder to list
        salesorders.push(salesorder);
    });
    //returns all cleared Salesorders
    return salesorders;
}