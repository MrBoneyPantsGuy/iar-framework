const authUrl = 'https://sepp-hrm.inf.h-brs.de/symfony/web/index.php/oauth/issueToken';
const axios = require("axios");
/**
 * marks user's session as authenticated
 * @param session current session
 * @param {User} user information about the current user
 */
exports.authenticate = function (session, user){
    session.authenticated = true;
    delete user.password;
    session.user = user;
}

/**
 * checks session, if user is authenticated
 * @param session current session
 * @return {boolean} true if user is authenticated
 */
exports.isAuthenticated = function (session){
    return session.authenticated ? true : false;
}

/**
 * resets session to a 'non authenticated' state
 * @param session current session
 */
exports.deAuthenticate = function (session){
    session.authenticated = false;
    session.user = undefined;
    session.destroy();
}

exports.getOrangeHRMBearerToken = async () => {
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
    return(token);
}