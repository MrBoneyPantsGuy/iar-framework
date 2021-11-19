const express = require('express');
const router = express.Router();
const {checkAuthorization} = require('../middlewares/auth-middleware');

/*
    In this file is the routing for the REST-endpoints under /api managed
 */

const authApi = require('../apis/auth-api'); //api-endpoints are loaded from separate files
router.post('/login', authApi.login); //the function decides which request type should be accepted
router.delete('/login', checkAuthorization,authApi.logout); //middlewares can be defined in parameters
router.get('/login', authApi.isLoggedIn); //the function, which handles requests is specified as the last parameter

const userApi = require('../apis/user-api');
router.get('/user', checkAuthorization, userApi.getSelf);

const salesmanApi = require('../apis/salesman-api');
router.get('/salesman', checkAuthorization , salesmanApi.getSalesman);
router.get('/salesman/:id', checkAuthorization , salesmanApi.getSalesmanById);
router.post('/salesman', checkAuthorization, salesmanApi.createSalesman);
router.put('/salesman/:id', checkAuthorization, salesmanApi.updateSalesman);
router.delete('/salesman/:id', checkAuthorization, salesmanApi.deleteSalesman);

const recordApi = require('../apis/record-api');
router.get('/record/:id', checkAuthorization , recordApi.getRecordById);
router.post('/record', checkAuthorization, recordApi.createRecord);
router.put('/record/:id', checkAuthorization, recordApi.updateRecord);
router.delete('/record/:id', checkAuthorization, recordApi.deleteRecord);

module.exports = router;