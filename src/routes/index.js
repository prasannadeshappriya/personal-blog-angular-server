var express = require('express');
var router = express.Router();

//Route configurations
module.exports = function (transporter, app, passport) {
    //API routes
    app.use('/api', require('../../src/routes/api.routes')(router, transporter));

    //User routes
    app.use('/user', require('../../src/routes/user.routes')(router, passport));

    //Statistics routes
    app.use('/stat', require('../../src/routes/statistics.routes')(router, passport));
};