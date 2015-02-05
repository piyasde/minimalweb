var bunyan = require('bunyan');
var config = require('../config');

var logger = bunyan.createLogger({
    name: 'minimalweb-application',
    streams: [{
        type: 'rotating-file',
        path: config.logpath + '/minimalweb-application.log',
        period: '1d',   // daily rotation
        count: 20       // keep 20 back copies
    }]
});

var log = function(message){
	logger.info(message);
}


var logInfo = function(message){
	logger.info(message);
}

var logWarn = function(message){
	logger.warn(message);
}

module.exports.log = log;
module.exports.logInfo = logInfo;
module.exports.logWarn = logWarn;

