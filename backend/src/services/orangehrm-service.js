const axios = require('axios');
const url = 'https://sepp-hrm.inf.h-brs.de/symfony/web/index.php/api/v1';

exports.getAllEmployees = async () => {
    let res = await fetch(url + '/')
}