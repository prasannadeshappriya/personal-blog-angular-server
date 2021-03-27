module.exports = {
    sendEmail: async function(data, transporter, callback){
        // email options
        let mailOptions = {
            from: 'prasanna.14rox@gmail.com',
            to: 'prasannadeshappriya@gmail.com',
            subject: 'Comment From Personal Blog',
            html: "<h3>You have a message from website</h3>" + 
                        "<h5>" + data.firstName + " " + data.lastName + "</h5>" +
                        "<h5>Email: " + data.email + "</h5>" +
                        "<h5>Telephone: " + data.telephone + "</h5>" +
                        "<h5>Message: " + data.comment + "</h5>"
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
                return callback(false);
            }
            console.log(response);
            return callback(true);
        });
    }
};