/**
 * Starting Point of the Application
 */
var server = require('./server');
var config = require('./config');
server.minimalWeb(config.host,config.port);
