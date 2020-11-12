//Repositories
const apiRepository = require('../repository/api.repository');

module.exports = {
    sendEmail: async function(req, res, transporter){
        if(typeof req.body==='undefined'){
            return res.json(400,{message: 'body data is required'});}

        var data = {
            firstName: req.body.first_name,
            lastName: req.body.last_name,
            email: req.body.email,
            telephone: req.body.telephone,
            comment: req.body.comment
        }

        if (!data.firstName || !(data.lastName)) {
            return res.status(500).send("Both first name and last name are required");
        }
        if (!data.email) {
            return res.status(500).send("email is required");
        }
        if (!data.telephone) {
            return res.status(500).send("telephone is required");
        }
        if (!data.comment) {
            return res.status(500).send("comment is required");
        }

        try{
            await apiRepository.sendEmail(data, transporter, async function(status) {
                if(status){
                    return res.status(200).json({message: 'Email successfully sent'});
                }else{
                    return res.status(500).json({message: 'Something went wrong!, Try again.'});}
            });
        }catch (err){
            return res.status(500).json({message: 'Something went wrong!, Try again.'});
        }
    }
};