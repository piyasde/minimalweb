/**
 * Core Route
 * It is used to route the request to specified controller by reading information from routeCollection
 */
var querystring = require('querystring');
var session = require('express-session');
var pathToRegexp = require('path-to-regexp');
var url = require("url"),
    path = require("path"),
    fs = require("fs");

var config = require('../config');
var logger = require('./logger');
var routeCollection;
//var methodCollection;
var serveFile = false;
var maxData = 10 * 1024 * 1024; //2mb

// Session Specific Information 
var sess = session({ secret: 'our middleware', cookie: { maxAge: 60000 },saveUninitialized: true,resave: true});
//var cacheServer = require('./cache').getCacheServer();
var reqInterceptor = require('./requestInterceptor');
var staticFileController = require('./StaticFileController');

var ri= new reqInterceptor();
var restIndex = 0;
var functionStack = [];
var functionCount = 0;

var mimeTypes = {
  '.js' : 'text/javascript',
  '.html': 'text/html',
  '.css' : 'text/css'
};
var keyValuePair = [];

function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }
    return true;
}


/**
 * It is used to understand the url is in rest pattern or not 
 */

function restMatch(url,allPatterns)
{
  	for(var i=0;i<allPatterns.length;i++)
	{
		if(allPatterns[i].requestPath.lastIndexOf(":")>-1)
		{		
			var keys = [];
		        var pattern = allPatterns[i].requestPath;
			var re = pathToRegexp(pattern, keys); 	  
			var values = re.exec(url);
			if(values !== null)
			{
				restIndex = i; 
				return allPatterns[i].requestPath;
			}
		}
	}
	return '';
}

/**
 * It is used to make query parameters from rest URL
 */

function makeQueryParams(url,pattern)
{
  var restFound = false;
  var allPatternArray = pattern.split("/");
  var counter = 0;
  for(var i=0;i<allPatternArray.length;i++)
  {
	if(allPatternArray[0].lastIndexOf(":")>-1)
	{
		return [];
	}
	if(allPatternArray[i].lastIndexOf(":")>-1)
	{
		if(allPatternArray[i].lastIndexOf(":")>0)
		{
			return [];
		}
		else
		{
			if(!isNaN(parseInt(allPatternArray[i].substring(1))))
			{
				return [];
			}
			else
			{
				if(allPatternArray[i]!='')
				{			
					var keyValue ={};
					keyValue.name = allPatternArray[i-1];
					keyValue.value = "";
					keyValuePair[counter++]=keyValue;
					restFound = true;
				}
			}
		}
				
	}
  }
  if(restFound)
  { 	
	  counter = 0;
	  var allValueArray = url.split("/");
	  for(var i=0;i<allValueArray.length;i++)
	  {
	      	var keyStr = allValueArray[i];
		var valueJson =keyValuePair[counter];
		var valueStr = valueJson.name;
		if(keyStr===valueStr)
		{
			keyValuePair[counter++].value = allValueArray[i+1];
			if(keyValuePair.length==counter)
				break;
		}
	  } 
  }
  return keyValuePair;
} 

/**
 * It is used to execute the middleware functions. 
 * Private method to this module
 */

var execute = function(req,res,done) {
   logger.log("counter "+functionCount);	
   var counter = functionStack.length;
   var next = function() {
      if(--counter == 0) {
         done();
      }
   };
   for(var i = 0;i < functionStack.length; i++) {
      logger.log("functionStack execution");	
      functionStack[i](req,res,next);
   }
}

/**
 * It is used to grab the list of middleware functions. 
 * Public method to this module
 */

var use = function(func){
	functionStack[functionCount++]=func;
}

var setRouteCollection = function(collection){
	routeCollection=collection;
}


var route = function (req, res) {
  if(typeof routeCollection ==='undefined')
	{
		logger.log('Nothing is set at route...');
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.end('No route is set. Existing from the application\n');
		return;
	}
  
  execute(req,res,function(){
	logger.log('Middleware Execution Done...');
  });    
  // A place to create request parameters in json
  var requestPath = req.url;
  logger.log('requestPath is '+requestPath);
  var query = url.parse(req.url,true).query;
  var queryParams = [];
  var arrCount = 0;
  // First check in general request parameters
  for (var name in query) {
    if (query.hasOwnProperty(name)) {
        var value = query[name];
        // Do something
	queryParams[arrCount] = {};
	queryParams[arrCount].name = name;
	queryParams[arrCount].value = value;
	arrCount++;
    }
  }
  // Then check for request pattern as rest
  var restUrl = restMatch(requestPath,routeCollection);
  // if rest url, empty requestParams and make new requestparams on basis of rest
  // here we ignore general request query params
  // for rest apis, we will not take rest and general params in combine
  // so either general url with query
  // or rest query
  //logger.log('so the restUrl is --'+restUrl+'----'); 	 
  if(restUrl!=='')
  {
	queryParams = [];
	queryParams = makeQueryParams(requestPath,restUrl);
  }
  logger.log('so the query is --'+JSON.stringify(queryParams)+'----');

  req.queryParams = queryParams;
  	  	
  // Intercept for before request			
  ri.interceptRequest(req,res,routeCollection);
  var i = 0;
  if (req.method.toUpperCase() === "POST") {
	
 	for(i=0;i<routeCollection.length;i++){
		// Rest Call will not be allowed for post, so no checking		
		if(requestPath==routeCollection[i].requestPath)
		{
			if(routeCollection[i].format=='postdata')
			{

				serveFile = true;	
				if(typeof routeCollection[i].outputFile !=='undefined')
					{
						var  f = config.presentationPath + '/' + routeCollection[i].outputFile;
						var postController = routeCollection[i].executeController;
 						postController.setProcessType(routeCollection[i].format);
 						postController.setOutFileName(f);
						postController[routeCollection[i].methodName](req,res);
						
					}
					else
					{
						var  f = '';
						var postController = routeCollection[i].executeController;
 						postController.setProcessType(routeCollection[i].format);
						postController.setOutFileName(f);
						postController[routeCollection[i].methodName](req,res);
						
					}
				
			}
		}
	}
  }
  else if (req.method.toUpperCase() === "GET") {
	  logger.log('restUrl is '+restUrl);
	  if(restUrl!='')
	  {
		serveFile = true;		
		// Rest Url handling will be different
		logger.log('restIndex is ' + restIndex);
		if(typeof routeCollection[restIndex].methodName !=='undefined'){
			var methodController = routeCollection[restIndex].executeController;
			methodController.setProcessType(routeCollection[restIndex].format);
			methodController[routeCollection[restIndex].methodName](req,res);
		}
		else
		{	
			var simpleController = routeCollection[restIndex].executeController;
			simpleController.setProcessType(routeCollection[restIndex].format);
			simpleController.processRequest(req,res);
		}
		//cacheServer.clean(Date.now());	
	  }
	  else
	  {
		if(!isEmpty(query))
		{
			requestPath = requestPath.substring(0,(requestPath.indexOf("?")));
		}
		// checking for /
		if(requestPath.lastIndexOf("/")==(requestPath.length-1))
		{
			requestPath = requestPath.substring(0,requestPath.length-1);
		}
		
		  for(i=0;i<routeCollection.length;i++){
			if(requestPath==routeCollection[i].requestPath)
			{
				serveFile = true;
				if(typeof routeCollection[i].responseFile !=='undefined'){
					var  f = config.presentationPath + '/' + routeCollection[i].responseFile;
					var fileController = routeCollection[i].executeController;
					fileController.setFileName(f);
					fileController.setProcessType(routeCollection[i].format);
					if(typeof routeCollection[i].methodName !=='undefined')
						fileController[routeCollection[i].methodName](req,res);
					else
						fileController.processRequest(req,res);
				}
				else if(typeof routeCollection[i].methodName !=='undefined'){
					var methodController = routeCollection[i].executeController;
					methodController.setProcessType(routeCollection[i].format);
					methodController[routeCollection[i].methodName](req,res);
				}
				else
				{	
					var simpleController = routeCollection[i].executeController;
					simpleController.setProcessType(routeCollection[i].format);
					simpleController.processRequest(req,res);

				}
				//cacheServer.clean(Date.now());
			}
		  }
	  }
	  if(!serveFile)
		{
		  if(url.parse(req.url,true).pathname==="/"||url.parse(req.url,true).pathname==="")
			{
				//parse default static file
				//console.log('1111');
				if(typeof defaultfile === 'undefined')
					{
						defaultfile = "index.html";
					}
				var  f = config.presentationPath + '/' + defaultfile;
				var fileController = staticFileController.getStaticFileController();
				fileController.setFileName(f);
				fileController.setProcessType("static");
				//console.log('2222');
				fileController.processRequest(req,res);
				return;
			}
  		   else
			{	
		  		res.writeHead(200, {'Content-Type': 'text/plain'});
				res.end('No such resource found\n');
			}
		
		}		
	
  } 
  serveFile = false;
};

var injectSession = function (req,res) {
	req.session = sess;    
}

var getRequestInterceptor = function () {
	return ri;    
}


module.exports.route = route;
module.exports.use = use;
module.exports.injectSession = injectSession;
module.exports.getRequestInterceptor = getRequestInterceptor;
module.exports.setRouteCollection = setRouteCollection;

