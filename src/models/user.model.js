const models = require('../database/models');

module.exports = {
    getUserByEmail: async function(email){
        return await models.user.findOne({
            where: {EMAIL: email}
        });
    },
    findOrCreateUser: async function(firstName, lastName, email, password){
        return await models.user.findOrCreate({
            where: {
                EMAIL: email
            },
            defaults: {
                FIRST_NAME: firstName,
                LAST_NAME: lastName,
                EMAIL: email,
                PASSWORD: password
            }
        });
    }
};