const axios = require('axios');
const Customer = require('../models/Customers');
const baseUrl = 'https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX'
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
        if(obj['@type'] === "org.opencrx.kernel.account1.LegalEntity"){
            let customer = new Customer(obj.identity.split('/')[obj.identity.split('/').length-1], obj.name, obj.accountRating);
            customers.push(customer);
        }
    });
    return customers;
}

exports.getPositions = async (link) => {
    //get all positions of this salesorder
    let po = [];
    const positions = await axios.get(`${link}/position`, config);
    let pos = positions.data.objects;
    if(pos != undefined){
        pos.forEach((obj) => {
            po.push(obj);
        });
    }
    return po;
}

exports.getGovernmentId = async (link) => {
    const response = await axios.get(`${link}`, config);
    const salesman = response.data;
    return salesman.governmentId;
}

exports.getSalesorders = async () => {
    //get all Salesorder
    const salesordersRes = await axios.get(`${baseUrl}/org.opencrx.kernel.contract1/provider/CRX/segment/Standard/salesOrder`, config);
    const uncleardOrders = salesordersRes.data.objects;
    let salesorders = [];
    for(let order of uncleardOrders){
        //set governmentId (only id that is in both services)
        const governmentId = await this.getGovernmentId(order.salesRep['@href']);
        //Id for the Order
        const salesorderId = order['@href'].split('/')[order['@href'].split('/').length-1];
        //year of the order
        const year = order.createdAt.split('-')[0];
        //tmp variables for splitting the customer href
        temp = order.customer;
        tmp = temp['@href'].split('/');
        //the id of the customer
        const customerId = tmp[tmp.length-1];
        //search for customer details
        let customer;
        await this.getAllCustomers()
            .then(custom => custom.forEach((c) => {
            if(c._id === customerId){
                customer = c;
            }
        }));
        //number of items of HooverClean
        let itemsHooverClean;
        //number of items of HooverGo
        let itemsHooverGo;

        await this.getPositions(order['@href'])
            .then(pos => pos.forEach((position) => {
            //check if hooverClean or HooverGo and set number of items sold
            if(position.productDescription === "Hoover for service agents"){
                itemsHooverClean = position.quantity;
            } else {
                itemsHooverGo = position.quantity;
            }
        }));
        //insert all values in a new salesorder
        let salesorder = new Salesorders(salesorderId, customer.name, customer.accountRating, governmentId, itemsHooverGo, itemsHooverClean, year);
        //add salesorder to list
        salesorders.push(salesorder);
    };
    //returns all cleared Salesorders
    return salesorders;
}

