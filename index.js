/**
 * Starting Point of the Application
 */
var server = require('./server');
var config = require('./config');
var controller = require('./core/AbstractController').getAbstractController();
var postForm = require('./core/postForm');
var fileHelper = require('./core/staticfilehelper').getStaicFilehelper();

var nodestatic = require('node-static'),
  http = require('http'),
  util = require('util');


var staticpath = "public";
var staticport = "3101";
var staticserver;
var staticserverondiffenv;


var setStaticport = function(port){
	staticport = port||"3101";	
}

var setPublicpath = function(path){
	staticpath = path||"public";	
}

var startStaticServerOnDiffAddr = function(path){
	staticserverondiffenv = path;	
}



function spawn(host,port)
{
	if(typeof staticserverondiffenv==='undefined')
	{
		var file = new(nodestatic.Server)(staticpath, { 
		  cache: 600, 
		  headers: { 'X-Powered-By': 'node-static' } 
		});

		console.log("staticport --"+staticport);
		http.createServer(function(req, res) {
		  //req.addListener('end', function() {
		    file.serve(req, res, function(err, result) {
		      if (err) {
			console.error('Error serving %s - %s', req.url, err.message);
			if (err.status === 404 || err.status === 500) {
			  res.writeHead(err.status, err.headers);
			  res.end();
			}else {
			  res.writeHead(err.status, err.headers);
			  res.end();
			}
		      } else {
			console.log('%s - %s', req.url, res.message); 
		      }
		    });
		  //});
		}).listen(staticport);
		fileHelper.setServerPath("http://"+host+":"+staticport);
		
	}
	else 
	{
		fileHelper.setServerPath(staticserverondiffenv);
	}
	
	//startStaticServer(staticserverport,'public');
	server.minimalWeb(host,port);
}
module.exports.spawn = spawn;
module.exports.reqInterceptor = server.requestInterceptor;
module.exports.logger = server.logger;
module.exports.route = server.route;
module.exports.abstractController = controller;
module.exports.postForm = postForm;
module.exports.setStaticport = setStaticport;
module.exports.setPublicpath = setPublicpath;
module.exports.startStaticServerOnDiffAddr = startStaticServerOnDiffAddr;

