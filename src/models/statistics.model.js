const models = require('../database/models');
const { Op } = require('sequelize')

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
    },
    getPreviousDayStats: async function(startDate){
        return await models.statistics.findAll({
            where: {
                createdAt: {
                    [Op.gte]: startDate
                }
              }
        });
    }
};