const userService = require('../services/user-service')
const authService = require('../services/auth-service');
const authUrl = 'https://sepp-hrm.inf.h-brs.de/symfony/web/index.php/oauth/issueToken';
const axios = require("axios");

/**
 * endpoint, which handles login
 * @param req express request
 * @param res express response
 * @return {Promise<void>}
 */
exports.login = function (req, res){
    const db = req.app.get('db');//get database from express

    userService.verify(db, req.body).then(user=> { //verify credentials via user-service
        authService.authenticate(req.session, user); //mark session as authenticated
        res.send('login successful');
    }).catch(_=>{
        res.status(401).send('login failed');
    })
}

/**
 * endpoint, which handles logout
 * @param req express request
 * @param res express response
 * @return {Promise<void>}
 */
exports.logout = function (req, res){
    authService.deAuthenticate(req.session); //destroy session
    res.send('logout successful');
}

/**
 * endpoint, which returns whether a user is authenticated
 * @param req express request
 * @param res express response
 * @return {Promise<void>}
 */
exports.isLoggedIn = function (req, res){
    if(authService.isAuthenticated(req.session)){ //check via auth-service
        res.send({loggedIn: true});
    }else {
        res.send({loggedIn: false});
    }
}

exports.getOrangeHRMBearerToken = async (req, res) => {
    const data = {
        'password': '*Safb02da42Demo$',
        'username': 'demouser',
        'grant_type': 'password',
        'client_id': 'api_oauth_id',
        'client_secret': 'oauth_secret'
    }
    let token = await axios.post(authUrl, data)
        .then(result => result.data)
        .catch(err => console.log(err));
    res.status(200).send(token);
}