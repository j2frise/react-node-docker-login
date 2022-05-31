//imports
var express = require('express');
var usersCtrl = require('./routes/usersController');

//Router
exports.router = (function(){
    var apiRouter = express.Router();

    //Users routes
    apiRouter.route('/auth/register/').post(usersCtrl.register);
    apiRouter.route('/auth/login/').post(usersCtrl.login);
    apiRouter.route('/users/:id/').get(usersCtrl.getUser);
    apiRouter.route('/users/').get(usersCtrl.getUsers);
    apiRouter.route('/auth/logout/').get(usersCtrl.logout);
    apiRouter.route('/auth/connected/').get(usersCtrl.connected);

    return apiRouter
})();