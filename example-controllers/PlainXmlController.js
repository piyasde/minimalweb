/**
 * Example Controller to get Html
 * A controller which can be used to get Html as response
 */

var logger = require('../index').logger;
var controller = require('../index').abstractController;

var selfController = function () {
	logger.log("selfController constructed");
}

//Extends abstract controller
selfController.__proto__ = controller;

selfController.processRequest = function(req,res) {
	var xmlString ="<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
	xmlString = xmlString + "<entities><entity><name>RAM</name><address>Address of Ram</address></entity></entities>";
	// process specific business logic
	// set the processed string to controller setXml method
	// place to use any service callback
        selfController.setXml(xmlString);
	selfController.process(req,res,function(err,content){
		logger.log('content -'+content);
	});
}

module.exports.getPlainXmlController = function() {
	return selfController;
};


