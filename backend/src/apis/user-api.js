const userService = require('../services/user-service')
/**
 * endpoint, which returns information about the user, which is currently authenticated
 * @param req express request
 * @param res express response
 * @return {Promise<void>}
 */
exports.getSelf = async function(req, res){
    res.send(req.session.user); //retrieve userdata of authenticated user from session and return it
}

exports.add = async function(req,res){
    userService.add(req.app.get('db'),req.body).then(()=>res.send(req.body) ).catch((error)=>{console.error(error);res.status(500).send('User creation failed');})
}