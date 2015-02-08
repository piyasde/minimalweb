var cacheServer = require('./cache').getCacheServer();
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


var staicFileHelper = function() {
  //logger.log("staicFilehelper constructed");
}

staicFileHelper.processFile = function (req,res,filePath) {
	fs.exists(filePath, function (exists) { 
	    if (exists) {
	      if(typeof res.requiredData==='undefined')
		{	
		      var headers = {'Content-type': mimeTypes[path.extname(filePath)]};
		      if (cacheServer.cachestore[filePath]) {
			//logger.log('cache  deliver');
			res.writeHead(200, headers);
			res.end(cacheServer.cachestore[filePath].content);
			return;
		      }

		      var s = fs.createReadStream(filePath).once('open', function () {
			logger.log('stream deliver');
			res.writeHead(200, headers);
			this.pipe(res);
		      }).once('error', function (e) {
			logger.log(e);
			res.writeHead(500);
			res.end('Internal Server Error...');
		      });

		      fs.stat(filePath, function (err, stats) {
			if (stats.size < cacheServer.maxSize) {
			  var bufferOffset = 0;
			  cacheServer.cachestore[filePath] = {content: new Buffer(stats.size),
					    timestamp: Date.now()};
			  s.on('data', function (data) {
			    data.copy(cacheServer.cachestore[filePath].content, bufferOffset);
			    bufferOffset += data.length;
			  });
			}
		      });
		      return;	
		}
	      else
		{
		      logger.log(filePath); 	
		      var headers = {'Content-type': mimeTypes[path.extname(filePath)]};
			var json = JSON.parse(res.requiredData);
			ejs.renderFile(filePath,json,
				function(err, result) {
					if (!err) {
						res.writeHead(200, headers);
						res.end(result);
					}
					// render or error
					else {
						res.writeHead(500);
						res.end('Internal Server Error...');
						logger.log(err);
					}
			});
		      return;	
		}
	    }
	    else
		{
		  	  res.writeHead(200, {'Content-Type': 'text/plain'});
			  res.end('No such page found\n');
		}	
	});
}



module.exports.getStaicFilehelper = function(){
  	return staicFileHelper;
};


