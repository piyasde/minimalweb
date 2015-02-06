/**
 * Creation of the HTTP Server is done here
 * can be used for Middleware Attachement to request processing
 * can be used for BeforeRequestProcess Event
 */
var config = require('./config');
var fs = require("fs");

function initializeConfigs()
{
	if (!fs.existsSync(config.presentationPath)) {
	    fs.mkdirSync(config.presentationPath,0744);	
	}
	if (!fs.existsSync(config.uploadPath)) {
	    fs.mkdirSync(config.uploadPath,0744);	
	}
	if (!fs.existsSync(config.logpath)) {
	    fs.mkdirSync(config.logpath,0744);	
	}
	if (!fs.existsSync(config.logpath+"/minimalweb-application.log")) {
	    fs.writeFileSync(config.logpath+"/minimalweb-application.log", ""); 
	}
	
}

initializeConfigs();


var http = require('http');
var morgan       = require('morgan');

var route = require('./core/route');
var logger = require('./core/logger');

var reqIntercept = new route.getRequestInterceptor(); 


var accessLogStream = fs.createWriteStream(__dirname + '/' +config.logpath + '/minimalweb-access.log', {flags: 'a'});

/**
 * practical use of the middleware pattern implemented in the framework
 * For example, here we have used Morgan for Request Access log
 */
route.use(morgan('combined', {stream: accessLogStream}));


/**
 * Initialize Log Directory and files
 */



// Creation of the HTTP Server	 
var minimalWeb = function(host,port) {
	var server = http.createServer(function (req, res) {
	  route.injectSession(req,res);
	   route.route(req,res);
	}).listen(port, host);
	
};


module.exports.minimalWeb = minimalWeb;
module.exports.requestInterceptor = reqIntercept;
module.exports.logger = logger;
module.exports.route = route;

