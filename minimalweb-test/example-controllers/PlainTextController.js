/**
 * Example Controller to get Plain text
 * A controller which can be used to get Plain text as response
 */

var logger = require('minimalweb').logger;
var controller = require('minimalweb').abstractController;

var selfController = function () {
	logger.log("selfController constructed");
}

//Extends abstract controller
selfController.__proto__ = controller;

selfController.processRequest = function(req,res) {
        logger.log('session usage --'+req.session.user);
	// process specific business logic
	// set the processed string to controller setString method
	// place to use any service callback
	selfController.setString("This is controller text");
	selfController.process(req,res,function(err,content){
		logger.log('content -'+content);
	});
}

selfController.getRequestInterceptor().on('afterProcessResponse', function(req,res) {
	// We can use this event after request processing 
	//Guaranteed Asynchronous Functionality
	process.nextTick(function() 
        {
	    logger.log("sample request processing after process response");		  
	});
});


module.exports.getPlainTextController = function() {
	return selfController;
};


