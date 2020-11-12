//Models
const statModel = require('../models/statistics.model');

module.exports = {
    getAllStatisticsRecords: async function(){
        try {
            let statRecords = await statModel.getAllStatisticsRecords();
            if (statRecords === null) {
                return [200, { records: [] }];
            }
            return [200, { records: statRecords }];
        } catch (err) {
            console.log(err); //Log the error
            return [500, {message: "Internal server error"}];
        }
    },
    getAllStatisticsRecordCount: async function(){
        try {
            let statRecords = await statModel.getStatisticsCount();
            if (statRecords === null) {
                return [200, { count: 0 }];
            }
            return [200, { count: statRecords }];
        } catch (err) {
            console.log(err); //Log the error
            return [500, {message: "Internal server error"}];
        }
    },
    createStatisticRecord: async function(clientIp){
        try {
            let statRecords = await statModel.createStatisticsRecord(clientIp);
            return [201, { response: statRecords }];
        } catch (err) {
            console.log(err); //Log the error
            return [500, {message: "Internal server error"}];
        }
    }
};