/**
 * Example Controller to get text/Html/XML/Json
 * A controller which can be used to get text/Html/XML/Json as response
 */

var logger = require('../index').logger;
var controller = require('../index').abstractController;

var MethodController = function() {
}

//Extends abstract controller
MethodController.__proto__ = controller;


MethodController.do = function(req,res) {
	// process specific business logic
	// set the processed string to controller setJson method
	// place to use any service callback
	MethodController.setHtml("<h2>This is controller text from Method </h2>");
	MethodController.process(req,res,function(err,content){
		logger.log('content -'+content);
	});	
  }


MethodController.undo = function(req,res) {
	// process specific business logic
	// set the processed string to controller setJson method
	// place to use any service callback
	MethodController.setString("this is a call of method async from Dynamic Class for undo");
	MethodController.process(req,res,function(err,content){
		logger.log('content -'+content);
	});
  }

module.exports.getMethodController = function() {
	return MethodController;
};
