/**
 * Example Controller to get text/Html/XML/Json
 * A controller which can be used to get text/Html/XML/Json as response
 */

var logger = require('../index').logger;
var controller = require('../index').abstractController;


var MethodController = function() {
  logger.log("MethodController constructed");
}

//Extends abstract controller
MethodController.__proto__ = controller;



MethodController.getIndexDyn = function(req,res) {
	// process specific business logic
	// set the processed string to controller setJson method
	// place to use any service callback
	MethodController.setJson("{\"person\":{\"name\":\"Ram\"}}");
	MethodController.process(req,res,function(err,content){
		logger.log('content -'+content);
	});

  }

MethodController.getIndexDynError = function(req,res) {
	// process specific business logic
	// set the processed string to controller setJson method
	// place to use any service callback
	MethodController.setJson("{\"person\":{\"name\":\"Ram\"}}");
	MethodController.process(req,res,function(err,content){
		logger.log('content -'+content);
	});

  }


MethodController.getIndexStc = function(req,res) {
	// process specific business logic
	// set the processed string to controller setJson method
	// place to use any service callback
	MethodController.process(req,res,function(err,content){
		logger.log('content -'+content);
	});
}
MethodController.getIndexStcError = function(req,res) {
	// process specific business logic
	// set the processed string to controller setJson method
	// place to use any service callback
	MethodController.process(req,res,function(err,content){
		logger.log('content -'+content);
	});

  }
MethodController.getIndexStcNoSuchPage = function(req,res) {
	// process specific business logic
	// set the processed string to controller setJson method
	// place to use any service callback
	MethodController.process(req,res,function(err,content){
		logger.log('content -'+content);
	});

  }


module.exports.getMethodController = function() {
	return MethodController;
};
