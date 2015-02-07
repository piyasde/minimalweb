var util = require('util');
var EventEmitter = require('events').EventEmitter;
var reqInterceptor=function() {
    this.interceptRequest = interceptRequest;
    this.interceptResponse = interceptResponse;
}    

function interceptRequest(req,res,config)
    {
	this.emit('beforeProcessRequest', req,res,config);
    }		

function interceptResponse(req,res)
    {
		this.emit('afterProcessResponse', req,res);
    }		


util.inherits(reqInterceptor, EventEmitter);

module.exports = reqInterceptor;



    	
