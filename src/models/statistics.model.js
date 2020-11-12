const models = require('../database/models');

module.exports = {
    getStatisticsCount: async function(){
        return await models.statistics.count();;
    },
    getAllStatisticsRecords: async function(){
        return await models.statistics.findAll();
    },
    createStatisticsRecord: async function(clientIp){
        return await models.statistics.create({
            IP: clientIp
        });
    }
};