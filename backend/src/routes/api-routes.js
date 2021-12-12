const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

const {checkAuthorization} = require('../middlewares/auth-middleware');

/*
    In this file is the routing for the REST-endpoints under /api managed
 */

// ------------------------------------------------------
// Do not remove brackets from checkAuthorization() call!
// ------------------------------------------------------

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

const authApi = require('../apis/auth-api'); //api-endpoints are loaded from separate files
router.post('/login', authApi.login); //the function decides which request type should be accepted
router.delete('/login', checkAuthorization(),authApi.logout); //middlewares can be defined in parameters
router.get('/login', authApi.isLoggedIn); //the function, which handles requests is specified as the last parameter

const userApi = require('../apis/user-api');
router.get('/user', checkAuthorization(), userApi.getSelf);

const salesmanApi = require('../apis/salesman-api');
router.get('/salesman/id/:salesmanid', checkAuthorization(), salesmanApi.getSalesmanBySalesmanId);
router.get('/salesman/employeeid/:employeeid', checkAuthorization(), salesmanApi.getSalesmanByEmployeeId);
router.get('/salesman', checkAuthorization(), salesmanApi.getAllSalesman);
router.get('/salesman/query/:attribute/:key', checkAuthorization(), salesmanApi.querySalesmen);
router.post('/salesman', checkAuthorization(), salesmanApi.createSalesman);
router.put('/salesman/:id', checkAuthorization(), salesmanApi.updateSalesman);
router.delete('/salesman/:id', checkAuthorization(), salesmanApi.deleteSalesman);

const recordApi = require('../apis/record-api');
router.get('/record/:id', checkAuthorization(), recordApi.getRecordById);
router.post('/record', checkAuthorization(), recordApi.createRecord);
router.put('/record/:id', checkAuthorization(), recordApi.updateRecord);
router.delete('/record/:id', checkAuthorization(), recordApi.deleteRecord);

const controlApi = require('../apis/control-api');
router.get('/control/fetchemployees', checkAuthorization(), controlApi.fetchAllEmployees);
router.get('/control/getallsalesorders', checkAuthorization(), controlApi.getAllSalesorders);
router.get('/control/getallcustomers', checkAuthorization(), controlApi.getAllCustomers);
module.exports = router;