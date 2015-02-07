/**
 * Example Controller to get Static File
 * A controller which can be used to get Static File as response
 */

var logger = require('../index').logger;
var controller = require('../index').abstractController;

var selfController = function () {
	logger.log("selfController constructed");
}

//Extends abstract controller
selfController.__proto__ = controller;

selfController.processRequest = function(req,res) {
	// process specific business logic
	// set the processed string to controller setJson method
	// place to use any service callback
        selfController.process(req,res,function(err,content){
		logger.log('content -'+content);
	});
}


module.exports.getStaticFileController = function() {
	return selfController;
};


