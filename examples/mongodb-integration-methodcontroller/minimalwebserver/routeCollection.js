/** 
 * The route configuration details (Controller Specific Configurations)
 * requestpath            - The path where the request will be landed
 * executeController      - The controller, which is responsible for executing request
 * format                 - How we expect the output from Server (most important property)
 *				- plain - we want plain text as response
 *				- html - we want html as response
 *				- json - we want json as response
 *				- xml - we want xml as response
 *				- static -we want static file as response
 *				- dynamic - we want the file populated with response data
 *				- postdata - to post a form with or without upload
 * loginrequired          - whether this url is required login
 * methodname             - if we want the same controller with different methods for execution
 * responseFile           - The response will render this file
 * outputFile             - With Post Request, if we want to get response request with some data, we will specifiy the file name here
 */




var routeCollection =
[
	{requestPath:'/getusers',executeController:require('./server-controllers/methodController').getMethodController(),format:"json",methodName:"get"},
	{requestPath:'/insertuser',
		executeController:require('./server-controllers/methodController').getMethodController(),
		format:"postdata", methodName:"insert"}
]

/** 
 * The route configuration will be available to the framework by calling this function 
 * @constructor
 */

function collection() {
    this.routeCollection = routeCollection;
}

var getRouteCollection = function() {
	return new collection();
};


module.exports.getRouteCollection = getRouteCollection;


