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
	{requestPath:'/mwplain',executeController:require('./example-controllers/PlainTextController').getPlainTextController(),format:"plain",loginrequired:"true"},
	{requestPath:'/mwplain/:id',executeController:require('./example-controllers/PlainTextController').getPlainTextController(),format:"plain"},
	{requestPath:'/mwhtml',executeController:require('./example-controllers/PlainHtmlController').getPlainHtmlController(),format:"html"},
	{requestPath:'/mwjson',executeController:require('./example-controllers/PlainJsonController').getPlainJsonController(),format:"json"},
	{requestPath:'/mwxml',executeController:require('./example-controllers/PlainXmlController').getPlainXmlController(),format:"xml"},
	{requestPath:'/mwmethoddo',executeController:require('./example-controllers/methodController').getMethodController(),format:"html",methodName:"do"},   
	{requestPath:'/mwmethodundo',executeController:require('./example-controllers/methodController').getMethodController(),
		format:"plain",methodName:"undo"},   
	{requestPath:'/mwindexpage',
		executeController:require('./example-controllers/StaticFileController').getStaticFileController(),
		responseFile:"index.html",format:"static"},  // Get Handling Static File
	{requestPath:'/mwpostpage',
		executeController:require('./example-controllers/StaticFileController').getStaticFileController(),
		responseFile:"mwpost.html",format:"static"},  // Get Handling Static File
	{requestPath:'/mwpostuploadpage',
		executeController:require('./example-controllers/StaticFileController').getStaticFileController(),
		responseFile:"mwpostupload.html",format:"static"},  // Get Handling Static File
	{requestPath:'/mwcontactuspage',
		executeController:require('./example-controllers/StaticFileController').getStaticFileController(),
		responseFile:"contactus.html",format:"static"},  // Get Handling Static File
	{requestPath:'/mwdynamicpage',
		executeController:require('./example-controllers/DynamicFileController').getDynamicFileController(),
		responseFile:"index1.html",format:"dynamic"},  // Get Handling Dynamic File
	{requestPath:'/mwaboutuspage',
		executeController:require('./example-controllers/StaticFileController').getStaticFileController(),
		responseFile:"aboutus.html",format:"static"},  // Get Handling Static File
	{requestPath:'/mwproductpage',
		executeController:require('./example-controllers/StaticFileController').getStaticFileController(),
		responseFile:"product.html",format:"static"},  // Get Handling Static File
	{requestPath:'/mwpostForm',
		executeController:require('./example-controllers/PostController').getPostController(),
		format:"postdata", methodName:"do"}, // Post Handling Controller Call with Method and upload/without upload
	{requestPath:'/mwpostFormOut',
		executeController:require('./example-controllers/PostController').getPostController(),
		format:"postdata",outputFile :"index1.html", methodName:"do"}, 
		// Post Handling Controller Call with Method and upload/without upload
	
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


