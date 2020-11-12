//Get the controller classes
let statController = require('../controller/statistics.controller');

module.exports = function (router, passport) {
    router.get(
        '/get-all-stat-records', 
        passport.authenticate('jwt', {session :false}),
        function(req, res) {
            statController.getAllStatisticsRecords(req, res);
        }
    );
    router.get(
        '/get-all-stat-record-count', 
        passport.authenticate('jwt', {session :false}),
        function(req, res) {
            statController.getAllStatisticsRecordCount(req, res);
        }
    );
    router.post('/create-stat', function(req, res) {
        statController.createStatisticRecord(req, res);
    });
    return router;
};