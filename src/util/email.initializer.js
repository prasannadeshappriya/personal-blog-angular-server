var nodemailer = require('nodemailer');
const hbs = require('nodemailer-handlebars');

transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'appdevprasanna322@gmail.com' ,
        pass: 'aSd123456789'
    }
});

transporter.use('compile', hbs({
    viewEngine: 'express-handlebars',
    viewPath: './views/'
}));

module.exports = transporter;