/**
 * Starting Point of the Application
 */
var server = require('./server');
var config = require('./config');
var controller = require('./core/AbstractController').getAbstractController();
var postForm = require('./core/postForm');



function spawn(host,port)
{
	server.minimalWeb(host,port);
}
module.exports.spawn = spawn;
module.exports.reqInterceptor = server.requestInterceptor;
module.exports.logger = server.logger;
module.exports.route = server.route;
module.exports.abstractController = controller;
module.exports.postForm = postForm;
