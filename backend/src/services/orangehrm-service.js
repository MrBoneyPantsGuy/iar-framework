const axios = require('axios');
const auth = require('../apis/auth-api');
const authService = require("../services/auth-service");
const url = 'https://sepp-hrm.inf.h-brs.de/symfony/web/index.php/api/v1';

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