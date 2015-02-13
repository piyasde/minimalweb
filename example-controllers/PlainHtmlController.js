/**
 * Example Controller to get Html
 * A controller which can be used to get Html as response
 */

var logger = require('../index').logger;
var controller = require('../index').abstractController;

var selfController = function () {
}

//Extends abstract controller
selfController.__proto__ = controller;

selfController.processRequest = function(req,res) {
        req.session.user = "me";
	// process specific business logic
	// set the processed string to controller setHtml method
	// place to use any service callback
	selfController.setHtml("<h2>This is controller text</h2>");
	selfController.process(req,res,function(err,content){
		logger.log('content -'+content);
	});
}

module.exports.getPlainHtmlController = function() {
	return selfController;
};


