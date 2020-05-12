var express = require('express');
var router = express.Router();

module.exports = function(transporter) {
    router.get('/', function(req, res, next) {
        res.render('index', { 
            status: 'running',
            version: '1.0.0',
            admin: 'Prasanna Deshappriya',
            adminEmail: 'prasannadeshappriya@gmail.com'
            });
    });

    router.post('/send-email-debug', function(req, res) {
        return res.status(200).json({message: "Email successfully sent"});
    });

    router.post('/send-email', function(req, res) {
        //console.log(transporter);
        var firstName = req.body.first_name;
        var lastName = req.body.last_name;
        var email = req.body.email;
        var telephone = req.body.telephone;
        var comment = req.body.comment;

        if (!firstName || !(lastName)) {
            return res.status(500).send("Both first name and last name are required");
        }
        if (!email) {
            return res.status(500).send("email is required");
        }
        if (!telephone) {
            return res.status(500).send("telephone is required");
        }
        if (!comment) {
            return res.status(500).send("comment is required");
        }
    
        // email options
        let mailOptions = {
            from: 'prasanna.14rox@gmail.com',
            to: 'prasannadeshappriya@gmail.com',
            subject: 'Comment From PersonL Blog',
            html: "<h3>You have a message from website</h3>" + 
                        "<h5>" + firstName + " " + lastName + "</h5>" +
                        "<h5>Email: " + email + "</h5>" +
                        "<h5>Telephone: " + telephone + "</h5>" +
                        "<h5>Message: " + comment + "</h5>"
            // template: 'email',
            // context: {
            //     firstName: firstName,
            //     lastName: lastName,
            //     email: email,
            //     telephone: telephone,
            //     comment: comment
            // } 
        };

        // send email
        transporter.sendMail(mailOptions, (error, response) => {
            if (error) {
                console.log(error);
                return res.status(500).json({error: error});
            }
            console.log(response);
            return res.status(200).json({message: "Email successfully sent"});
        });
    });
    return router;
}
