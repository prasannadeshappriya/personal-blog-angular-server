const models = require('../database/models');

module.exports = {
    getConfigByCode: async function(code){
        return await models.config.findOne({
            where: {CONFIG_NAME: code}
        });
    },
    findOrCreateConfig: async function(code, value){
        return await models.config.findOrCreate({
            where: {
                CONFIG_NAME: code
            },
            defaults: {
                CONFIG_NAME: code,
                CONFIG_VALUE: value
            }
        });
    }
};