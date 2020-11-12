//Repositories
const userRepository = require('../repository/user.repository');

module.exports = {
    login: async function(req,res){
        if(typeof req.body==='undefined'){
            return res.status(400).json({message: '\'email\' and \'password\' are required'});}
        let email = req.body.email;
        let password = req.body.password;
        if(typeof email==='undefined' ||
        email===''){return res.status(400).json({message: '\'email\' is required'});}
        if(typeof password==='undefined' ||
            password===''){return res.status(400).json({message: '\'password\' is required'});}
        //Authenticate user login credentials
        let response = await userRepository.userLogin(email, password);
        return res.status(response[0]).json( response[1]);
    },
    register: async function(req,res){
        if(typeof req.body==='undefined'){
            return res.status(400).json({message: '\'email\' and \'password\' are required'});}
        let email = req.body.email;
        let password = req.body.password;
        let firstName = req.body.firstName;
        let lastName = req.body.lastName;
        if(typeof email==='undefined' ||
            email===''){return res.status(400).json({message: '\'email\' is required'});}
        if(typeof password==='undefined' ||
            password===''){return res.status(400).json({message: '\'password\' is required'});}
        if(typeof firstName==='undefined' ||
            firstName===''){return res.status(400).json({message: '\'firstName\' is required'});}
        if(typeof lastName==='undefined' ||
            lastName===''){return res.status(400).json({message: '\'lastName\' is required'});}
        //Create the user account and login in
        let response = await userRepository.registerUser(firstName,lastName,email,password);
        return res.status(response[0]).json(response[1]);
    }
};