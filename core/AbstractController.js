/**
 * Core Controller
 * It is mainly used as abstraction of most of the functionalities of a controller
 */

var fileHelper = require('./staticfilehelper').getStaicFilehelper();
var reqInterceptor = require('./requestInterceptor');
var config = require('../config');
var logger = require('./logger');

var ri= new reqInterceptor();
var AbstractController = function () {
	logger.log("AbstractController constructed");
}

AbstractController.prototype ={
    		
    process: function(req,res,callback) {
	var processtype = this.processType;	
    	var processPlainString = this.processPlainString;	
        var processHTMLString = this.processHtmlString;
        var processFileName = this.processFileName;
        var processOutFileName = this.processOutFileName;
        var processJsonString = this.processJsonString;
        var processxmlString = this.processXmlString;
	
	process.nextTick(function() 
        {
		switch (processtype)
		{
			case 'plain': 
				{	
					var plainString = processPlainString;
					res.writeHead(200, {'Content-Type': 'text/'+processtype});
					res.end(plainString);
					ri.interceptResponse(req,res);
					return callback(null,'Done - Plain Process');
					//break;
				}
			case 'html':
 				{	
					var htmlString = processHTMLString;
					res.writeHead(200, {'Content-Type': 'text/'+processtype});
					res.end(htmlString);
					ri.interceptResponse(req,res);	
					return callback(null,'Done - Html Process');
					//break;
				}
			case 'json':
 				{	
					var jsonString = processJsonString;
					res.writeHead(200, {'Content-Type': 'application/json'});
					res.end(jsonString);
					ri.interceptResponse(req,res);
					return callback(null,'Done - Json Process');
					//break;
				}
			case 'xml':
 				{	
					var xmlString = processxmlString;
					res.writeHead(200, {'Content-Type': 'application/xml'});
					res.end(xmlString);
					ri.interceptResponse(req,res);
					return callback(null,'Done - Xml Process');
					//break;
				}

			case 'static':
 				{	
					var fileName = processFileName;
					fileHelper.processFile(req,res,fileName);			
					ri.interceptResponse(req,res);
					return callback(null,'Done - Static File Process');
					//break;
				}
			case 'dynamic':
 				{	
					var fileName = processFileName;
					var jsonString = processJsonString;
					logger.log('ac--'+jsonString);
					res.requiredData = jsonString;
					fileHelper.processFile(req,res,fileName);
					ri.interceptResponse(req,res);			
					return callback(null,'Done - Dynamic File Process');
					//break;
				}
			case 'postdata':
 				{	
					logger.log(processOutFileName);
					var jsonString = processJsonString;
					res.requiredData = jsonString;
					if(typeof res.requiredData==='undefined')
					{
						res.requiredData = "{\"result\":\"no data is set\"}"
					}
					var fileName = processOutFileName;
					if((typeof fileName !=='undefined')&&(fileName !='')){
						
						//logger.log('last call');
						fileHelper.processFile(req,res,fileName);
					}
					else
					{
						res.writeHead(200, {'content-type': 'application/json'});
						logger.log('general post ends here');
						res.end(res.requiredData);				
					}
					processOutFileName ='';
					ri.interceptResponse(req,res);
					return callback(null,'Done - Post File Process');
					//break;
				}
			
			default:
				{  
					var err = new Error('No such process type found');
					return callback(err);
				}
		}
	});
    },
    setProcessType : function(pType) {
	this.processType = pType;
	return this;
    },
    setString : function(pString) {
	this.processPlainString = pString;
    },
    setFileName : function(lFileName) {
	this.processFileName = lFileName;
	return this;
    },
    setOutFileName : function(lFileName) {
	this.processOutFileName = lFileName;
	return this;
    },	
    setHtml : function(pHtml) {
	this.processHtmlString = pHtml;
    },
    setJson : function(pJson) {
	this.processJsonString = pJson;
    },
    setXml : function(pXml) {
	this.processXmlString = pXml;
    },	
    getRequestInterceptor: function() {
	return ri;
    }				
};

module.exports.getAbstractController = function() {
	return new AbstractController();
};


