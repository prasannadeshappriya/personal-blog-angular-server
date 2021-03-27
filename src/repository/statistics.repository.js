//Models
const statModel = require('../models/statistics.model');
var nodemailer = require('nodemailer');
const hbs = require('nodemailer-handlebars');

module.exports = {
    getAllStatisticsRecords: async function(){
        try {
            let statRecords = await statModel.getAllStatisticsRecords();
            if (statRecords === null) {
                return [200, { records: [] }];
            }
            return [200, { records: statRecords }];
        } catch (err) {
            console.log(err); //Log the error
            return [500, {message: "Internal server error"}];
        }
    },
    getAllStatisticsRecordCount: async function(){
        try {
            let statRecords = await statModel.getStatisticsCount();
            if (statRecords === null) {
                return [200, { count: 0 }];
            }
            return [200, { count: statRecords }];
        } catch (err) {
            console.log(err); //Log the error
            return [500, {message: "Internal server error"}];
        }
    },
    createStatisticRecord: async function(clientIp){
        try {
            let statRecords = await statModel.createStatisticsRecord(clientIp);
            return [201, { response: statRecords }];
        } catch (err) {
            console.log(err); //Log the error
            return [500, {message: "Internal server error"}];
        }
    },
    getStatInfoForCrons: async function(){
        const data = {}
        try {
            const datePeriod = 7;
            const startDate = new Date(new Date().setDate(new Date().getDate() - datePeriod));
            startDate.setUTCHours(0,0,0,0);

            const now = new Date();
            now.setUTCHours(0,0,0,0);

            let statRecords = await statModel.getPreviousDayStats(startDate);
            let statRecordsCount = await statModel.getStatisticsCount();
            const html = this.getHtmlString(statRecords, startDate, now, statRecordsCount);
            return html;
        } catch (err) {
            let error = "<h3>Error: " + err + "</h3>"
            console.log(err); //Log the error
            return error;
        }
    },
    getHtmlString(statRecords, startDate, endDate, statCount){
        let html = "<h3>" + endDate + "</h3>" +
                        "<h3>Statistics From<br>" +
                        "<b>" + startDate + " to " + endDate + "</b></h3>" +
                        "<h4>Total statistic count: " + statCount + "</h4>";

        const borderTop = "border-top: 1px solid #000000;";
        const borderLeft = "border-left: 1px solid #000000;";
        const borderRight = "border-right: 1px solid #000000;";
        const borderBottom = "border-bottom: 1px solid #000000;";

        const tableWidth = 50;

        html = html + "<table style=\"width:" + tableWidth + "%\">\n" + 
                            "<tr>\n" +
                            "  <th style=\"" + borderBottom + borderTop + borderRight + borderLeft + "\">Access Time</th>\n" + 
                            "  <th style=\"" + borderBottom + borderRight + borderTop + "\">IP</th>\n" + 
                            "</tr>\n";

        if(statRecords){
            if(statRecords.length > 0){
                statRecords.forEach(sat => {
                    html = html + "<tr>\n" +
                                    "  <td style=\"" + borderBottom + borderRight + borderLeft + "\">" + sat.createdAt + "</td>\n" +
                                    "  <td style=\"" + borderBottom + borderRight + "\">" + sat.IP + "</td>\n" +
                                    "</tr>\n";
                })
            }else{
                html = html + "<tr>\n" +
                                    "  <td style=\"" + borderBottom + borderRight + borderLeft + "\"></td>\n" +
                                    "  <td style=\"" + borderBottom + borderRight + "\"></td>\n" +
                                    "</tr>\n";
            }
        }
        else{
            html = html + "<tr>\n" +
                                "  <td style=\"" + borderBottom + borderRight + borderLeft + "\"></td>\n" +
                                "  <td style=\"" + borderBottom + borderRight + "\"></td>\n" +
                                "</tr>\n";
        }

        html = html + "</table>"
        return html;
    }
};