/**
 * Creation of the HTTP Server is done here
 * can be used for Middleware Attachement to request processing
 * can be used for BeforeRequestProcess Event
 */

var http = require('http');
var morgan       = require('morgan');
var fs = require("fs");

var route = require('./core/route');
var logger = require('./core/logger');
var fMiddle = require('./example-middlewares/firstMiddleWare');
var sMiddle = require('./example-middlewares/secondMiddleWare');
var config = require('./config');

var reqIntercept = new route.getRequestInterceptor(); 
var accessLogStream = fs.createWriteStream(__dirname + '/' +config.logpath + '/minimalweb-access.log', {flags: 'a'});

/**
 * practical use of the middleware pattern implemented in the framework
 * For example, here we have used Morgan for Request Access log
 */
route.use(morgan('combined', {stream: accessLogStream}));

/**
 * Use of the middleware pattern implemented in the framework
 * For example, here we had used our custom middlewares
 * CSRF Attack can be prevented by using custom middleware
 */
route.use(fMiddle);
route.use(sMiddle);

// Creation of the HTTP Server	 
var minimalWeb = function(host,port) {
	var server = http.createServer(function (req, res) {
	  route.injectSession(req,res);
	   route.route(req,res);
	}).listen(port, host);
	
};

/**
 * Use of Request Interceptor before processing actual request 
 * Used Event Emitter Pattern here
 * Generally, we will use this event to authorise the user to use the event
 * Here,
 * 1. We can check any url directly, or
 * 2. We iterate through route collection configuration and check 'loginrequired' property
 * Point no 2 related code is currently commented out
 */

reqIntercept.on('beforeProcessRequest', function(req,res,routeCollectionconfig) {
	// If we want to directly check the URL for some business logic
	if(req.url=="/mwplain")
		{
			res.writeHead(200, {'Content-Type': 'text/plain'});
			res.end('this process requires login');
		}
	
	//We can write all check on collection here
	/*for(i=0;i<routeCollectionconfig.length;i++){
		if(req.url==routeCollectionconfig[i].requestPath)
		{		
			if(typeof routeCollectionconfig[i].loginrequired !=='undefined'){
				res.writeHead(200, {'Content-Type': 'text/plain'});
				res.end('this process requires login' + '\n');
			}
		}
	}*/
  });

module.exports.minimalWeb = minimalWeb;
