//Get the controller classes
let apiController = require('../controller/api.controller');

module.exports = function (router, transporter) {
    router.get('/', function(req, res, next) {
        res.render('index', { 
            status: 'running',
            version: '1.0.0',
            admin: 'Prasanna Deshappriya',
            adminEmail: 'prasannadeshappriya@gmail.com'
            });
    });

    router.post('/send-email-debug', function(req, res) {
        return res.status(200).json({message: "Email successfully sent"});
    });

    router.post('/send-email', function(req, res) {
        apiController.sendEmail(req, res, transporter);
    });

    return router;
};