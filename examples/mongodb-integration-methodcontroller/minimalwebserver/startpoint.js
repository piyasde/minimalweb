var minimalweb = require('minimalweb');

// Need for routing functionality
var route = minimalweb.route;

//Need for logging functionality
var logger = minimalweb.logger;

//If we want to middlewares
var corsMiddle = require('./server-middlewares/corsMiddleWare');

route.use(corsMiddle);

/**
 * routing collection is aquired and send to route for request processing 	
 */
var routeCollection = require('./routeCollection').getRouteCollection().routeCollection;
route.setRouteCollection(routeCollection);

/**
 * Last step - start the server
 */
minimalweb.spawn("127.0.0.1","3001");
logger.log('server started');
