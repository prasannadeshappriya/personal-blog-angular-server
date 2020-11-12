//Repositories
const statRepository = require('../repository/statistics.repository');

module.exports = {
    getAllStatisticsRecords: async function(req,res){
        let response = await statRepository.getAllStatisticsRecords();
        return res.status(response[0]).json( response[1]);
    },
    getAllStatisticsRecordCount: async function(req,res){
        let response = await statRepository.getAllStatisticsRecordCount();
        return res.status(response[0]).json(response[1]);
    },
    createStatisticRecord: async function(req,res){
        if(typeof req.body==='undefined'){
            return res.status(400).json({message: '\'clientIp\' is required'});}
        let clientIp = req.body.clientIp;
        if(typeof clientIp==='undefined' ||
            clientIp===''){return res.status(400).json({message: '\'clientIp\' is required'});}
        let response = await statRepository.createStatisticRecord(clientIp);
        return res.status(response[0]).json(response[1]);
    }
};