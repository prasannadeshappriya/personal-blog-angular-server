const password_validator = require('password-validator');
const pass_hash = require('password-hash');
const jwt = require('jsonwebtoken');
const auth_config = require('./../../config/config');
const constants = require('./../util/constants');

//Models
const userModel = require('../models/user.model');
const configModel = require('../models/config.model');

module.exports = {
    userLogin: async function(email, password) {
        try {
            let user = await userModel.getUserByEmail(email);
            //No match for given email address
            if (user === null) {
                return [401, {message: "email is not associated to any account"}];
            }
            //Check the password with the hashed password
            if (pass_hash.verify(password, user.PASSWORD)) {
                //Create the login token
                let token = jwt.sign({email: user.EMAIL}, auth_config.secret, {
                    expiresIn: 60 * 60 * 1   //Token expire in 1 Hours
                });
                //Return response with user details
                return [200, {
                    email: user.EMAIL,
                    first_name: user.FIRST_NAME, 
                    last_name: user.LAST_NAME,
                    token: token
                }];
            }
            return [401, {message: "Email or password is invalid"}];
        } catch (err) {
            console.log(err); //Log the error
            return [500, {message: "Internal server error"}];
        }
    },
    registerUser: async function(firstName,lastName,email, password){
        // Create a schema
        let schema = new password_validator();
        // Add properties to it
        schema
            .is().min(8)                                    // Minimum length 8
            .is().max(100)                                  // Maximum length 100
            .has().uppercase()                              // Must have uppercase letters
            .has().lowercase()                              // Must have lowercase letters
            .has().digits()                                 // Must have digits
            .has().not().spaces();                          // Should not have spaces
        if(!schema.validate(password)){
            return [400, {message: 'Invalid password'}];
        }
        try {
            let config = await configModel.getConfigByCode(constants.USER_CREATE);
            //Check the permission (global)
            if (config != null && (config.CONFIG_VALUE).toLowerCase() === 'false') {
                return [403, {message: "Registration process is disabled by the admin"}];
            }
            let data = await userModel.findOrCreateUser(
                firstName,
                lastName,
                email, 
                pass_hash.generate(password)
            );
            let created = data[1];
            let user = data[0];
            if (created) {
                let token = jwt.sign({email: user.EMAIL}, auth_config.secret, {
                    expiresIn: 60 * 60 * 24   //Token expire in 24 Hours
                });
                return [201, {
                    first_name: user.FIRST_NAME, 
                    last_name: user.LAST_NAME,
                    email: user.EMAIL, 
                    token: token
                }];
            }
            return [409, {message: 'User already exist'}];
        } catch (err) {
            console.log(err); //Log the error
            return [500, {message: 'Server error occurred'}];
        }
    }
};