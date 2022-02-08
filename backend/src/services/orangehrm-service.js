const axios = require('axios');
const auth = require('../apis/auth-api');
const authService = require("../services/auth-service");
const url = 'https://sepp-hrm.inf.h-brs.de/symfony/web/index.php/api/v1';
const FormData = require('form-data');

exports.getAllEmployees = async () => {
    // get a new token for the request
    let token = await authService.getOrangeHRMBearerToken()
        .then(res => res.access_token)
        .catch(err => console.log(err));

    // configure the route and include the new token
    let config = {
        method: 'get',
        url:  url + '/employee/search',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    };

    // call OrangeHRM Api and fetch all employees
    let employees = await axios(config)
        .then( response => response.data)
        .catch(function (error) {
            console.log(error);
        });
    return employees;
}

exports.updateBonusSalary = async (record) => {
    // get a new token for the request
    let token = await authService.getOrangeHRMBearerToken()
        .then(res => res.access_token)
        .catch(err => console.log(err));

    // Set up the data
    let data = new FormData();
    data.append('year', record.year);
    data.append('value', Math.trunc(record.totalBonusA + record.totalBonusB));  // orangeHRM endpoint cant deal with floats => truncate all decimal places

    // configure the route and include the new token
    let config = {
        method: 'post',
        url: url + `/employee/${record.employeeId}/bonussalary`,
        headers: {
            ...data.getHeaders(),   // creates content-type with boundary => something like 'Content-Type': 'multipart/form-data; boundary=--------------------------580187173548598276277598',
            'Authorization': 'Bearer ' + token,
            'Accept': 'application/json, text/plain, */*',
        },
        data : data
    };

    // call OrangeHRM Api and store the bonus
    let bonus = await axios(config)
        .then( response => console.log(response))
        .catch(function (error) {
            console.log(error);
        });
    return bonus;
}
