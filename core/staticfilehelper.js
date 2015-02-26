var logger = require('./logger');

var ejs = require('ejs');

var fs = require("fs"),
	path = require("path");

var mimeTypes = {
  '.js' : 'text/javascript',
  '.html': 'text/html',
  '.css' : 'text/css',
  '.ejs': 'text/html',
};

var serverPath;

var staicFileHelper = function() {
  //logger.log("staicFilehelper constructed");
}

var json = {};
staicFileHelper.processFile = function (req,res,filePath) {
	//fs.exists(filePath, function (exists) { 
	    //if (exists) {
	      if(typeof res.requiredData==='undefined')
		{	
		      var headers = {'Content-type': mimeTypes[path.extname(filePath)]};
			logger.log('sfileheplerstattic--'+res.requiredData);
			json = {};		
			if(typeof res.requiredData !=='undefined')
				{
					json = JSON.parse(res.requiredData);
				}
			ejs.renderFile(filePath,{json:json,filepath:serverPath,cache:true},
				function(err, result) {
					if (!err) {
						res.writeHead(200, headers);
						res.end(result);
					}
					// render or error
					else {
						res.writeHead(500);
						res.end('Probably the json variable property declaration are not right\n' 
							+'or other Server Error... file path '
							+filePath+' server path '+serverPath);
						logger.log(err);
					}
			});
		      return;	
		}
	      else
		{
			logger.log('sfileheplerdynamic--'+res.requiredData);
			json = {};
			if(typeof res.requiredData !=='undefined')
				{
					json = JSON.parse(res.requiredData);
				}
		      var headers = {'Content-type': mimeTypes[path.extname(filePath)]};
			var json = JSON.parse(res.requiredData);
			ejs.renderFile(filePath,{json:json,filepath:serverPath,cache:true},
				function(err, result) {
					if (!err) {
						res.writeHead(200, headers);
						res.end(result);
					}
					// render or error
					else {
						logger.logInfo('Internal Server Error');
						logger.logWarn('Internal Server Error');
			
						res.writeHead(500);
						res.end('Probably the json variable property declaration are not right\n' 
							+'or other Server Error... file path '
							+filePath+' server path '+serverPath);
						logger.log(err);
					}
			});
		      return;	
		}
	    //}
	    //else
		//{
		//  	  res.writeHead(200, {'Content-Type': 'text/plain'});
		//	  res.end('No such page found\n');
		//}	
	//});
}

staicFileHelper.setServerPath = function (filePath) {
	serverPath = filePath;
}

module.exports.getStaicFilehelper = function(){
  	return staicFileHelper;
};


