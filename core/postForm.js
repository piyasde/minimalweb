var util = require('util');
var EventEmitter = require('events').EventEmitter;
var logger = require('./logger');

var formidable = require('formidable'),
	fs = require("fs");

var postForm = function(req,res,uploadPath) {
    var self = this;
    var form = new formidable.IncomingForm({ 
          uploadDir: uploadPath,  
	  keepExtensions: true
	});

    form
	.on('file', function(field, file) {
		// Uploaded file rename to original name and extension
		fs.rename(file.path, form.uploadDir + "/" + file.name, function(err) {
		    if ( err ) logger.logInfo('ERROR: ' + err);
		});
        })
        .on('error', function(err) {
            //logger.logInfo("an error has occured with form upload");
            logger.logInfo(err);
            req.resume();
        })
        .on('end', function() {
            logger.log('-> upload done');
        });	

    form.parse(req, function(err, fields, files) {
	  self.emit('post', req,res,fields, files);
	});
    
};

util.inherits(postForm, EventEmitter);

module.exports = postForm;
