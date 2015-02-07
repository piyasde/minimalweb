var minimalweb = require('minimalweb');
// If we want to use the request before processing
var reqInterceptor = minimalweb.reqInterceptor;

// Need for routing functionality
var route = minimalweb.route;

//Need for logging functionality
var logger = minimalweb.logger;



//If we want to middlewares
var fMiddle = require('./example-middlewares/firstMiddleWare');
var sMiddle = require('./example-middlewares/secondMiddleWare');
/**
 * Use of the middleware pattern implemented in the framework
 * For example, here we had used our custom middlewares
 * CSRF Attack can be prevented by using custom middleware
 */
route.use(fMiddle);
route.use(sMiddle);
/**
 * routing collection is aquired and send to route for request processing 	
 */
var routeCollection = require('./routeCollection').getRouteCollection().routeCollection;
route.setRouteCollection(routeCollection);

/**
 * Use of Request Interceptor before processing actual request 
 * Used Event Emitter Pattern here
 * Generally, we will use this event to authorise the user to use the event
 * Here,
 * 1. We can check any url directly, or
 * 2. We iterate through route collection configuration and check 'loginrequired' property
 * Point no 2 related code is currently commented out
 */

reqInterceptor.on('beforeProcessRequest', function(req,res,routeCollectionconfig) {
	// 1. If we want to directly check the URL for some business logic
	if(req.url=="/mwplain")
		{
			res.writeHead(200, {'Content-Type': 'text/plain'});
			res.end('this process requires login');
		}
	
	//2. We can write all check on collection here
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


/**
 * Last step - start the server
 */
minimalweb.spawn("127.0.0.1","3001");
logger.log('server started');
