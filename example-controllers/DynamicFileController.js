/**
 * Example Controller to get Dynamic File
 * A controller which can be used to get Dynamic File as response
 */

var logger = require('../index').logger;
var controller = require('../index').abstractController;

var selfController = function () {
}

//Extends abstract controller
selfController.__proto__ = controller;

selfController.processRequest = function(req,res) {
	// For get request
	// process specific business logic with request variables
	// set the processed string to controller setJson method
	// place to use any service callback
	// if we want something to send back with response
	// here we stick with json format
	// even we can render the response form with json, 
	// we are using 'ejs' as our template engine
	selfController.setJson("{\"person\":{\"name\":\"Ram\"}}");
	selfController.process(req,res,function(err,content){
		logger.log('content -'+content);
	});
}

module.exports.getDynamicFileController = function() {
	return selfController;
};


