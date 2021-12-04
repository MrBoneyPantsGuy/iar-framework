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
    const salesorders = await axios.get(`${baseUrl}/org.opencrx.kernel.contract1/provider/CRX/segment/Standard/salesOrder`, config);
    const uncleardOrders = salesorders.data.objects;
    uncleardOrders.forEach((order) => {
        const temp = order.salesRep;
        const tmp = temp['@href'].split('/');
        const salesmanId = tmp[tmp.length];
        const salesorderId = order['@href'].split('/')[order['@href'].split('/').length];
        const orderName = order.name;
    });
}