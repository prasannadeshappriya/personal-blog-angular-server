//Get the controller classes
let apiController = require('../controller/user.controller');

module.exports = function (router, passport) {
    router.post('/login', function(req, res) {
        apiController.login(req, res);
    });
    router.post('/register', function(req, res) {
        apiController.register(req, res);
    });
    return router;
};