var logger = require('minimalweb').logger;
var controller = require('minimalweb').abstractController;

var userwork = require('../dataaccess/userdao');

// We are using form post functionality here
var postForm = require('minimalweb').postForm;


var MethodController = function() {
  logger.log("MethodController constructed");
}

//Extends abstract controller
MethodController.__proto__ = controller;


MethodController.get = function(req,res) {
	// process specific business logic
	// set the processed string to controller setJson method
	// place to use any service callback
	userwork.getUser(function (err, userString) {
		console.log(userString);
	
		if (err) {
		  res.send(HTTPStatus.INTERNAL_SERVER_ERROR,'Internal Server Error');
		}

		if(userString.length>0)
		{
			MethodController.setJson(userString);
		}
		else
		{
			MethodController.setJson("{\"error\":\"No Such Data\"}");
		}
		MethodController.process(req,res,function(err,content){
			console.log('content -'+content);
		});
	  });
  }


MethodController.insert = function(req,res) {
	// process specific business logic
	// set the processed string to controller setJson method
	// place to use any service callback
	var pf = new postForm(req,res,__dirname + '/../upload');
	pf.on('post', function(req,res,fields, files) {

		// process specific business logic with request variables
		// set the processed string to controller setJson method
		// place to use any service callback
		// if we want something to send back with response
		// here we stick with json format
		// even we can render the response form with json, 
		// we are using 'ejs' as our template engine

		userwork.insertUser(fields.mydata, function (err, contents) {
			if (err) {
				//res.end( "User not saved");
			    MethodController.setJson("{\"msg\":\"User not saved\"}");
			}
			else {
			    MethodController.setJson("{\"msg\":\"User not saved\"}");
			}
			MethodController.process(req,res,function(err,content){
			  	logger.log('content -'+content);
			    });
	    	
		});
	});  
}

module.exports.getMethodController = function() {
	return MethodController;
};
