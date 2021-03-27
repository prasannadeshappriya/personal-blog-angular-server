const statRepository = require('../repository/statistics.repository');

module.exports = function (cron, transporter) {
    console.log("Starting Cron Jobs");

    //To scehdule every 12 hours
    //0 0 */12 * * *
    //To scehdule every 10 seconds
    //*/10 * * * * *
    //To scehdule day
    //'0 0 0 * * *'
    
    cron.schedule('0 0 0 * * *', async function(){
        let htmlStr = await statRepository.getStatInfoForCrons();
        let today = new Date();

        // email options
        let mailOptions = {
            from: 'prasanna.14rox@gmail.com',
            to: 'prasannadeshappriya@gmail.com',
            subject: 'Personal Blog Access Log Stat [' + today + ']',
            html: htmlStr
        };
        // send email
        transporter.sendMail(mailOptions, (error, response) => {
            if (error) {
                console.log(error);
            }
        });
    })
};