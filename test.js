'use strict';
require('should');
var assert = require("assert");
var request = require('superagent');
var expect = require('expect.js');
var minimalweb = require('./index');

describe('serverapps', function(){
  before(function(){
  		// function start
  		var reqInterceptor = minimalweb.reqInterceptor;
		var route = minimalweb.route;
		var logger = minimalweb.logger;
		var fMiddle = require('./example-middlewares/firstMiddleWare');
		var sMiddle = require('./example-middlewares/secondMiddleWare');
		route.use(fMiddle);
		route.use(sMiddle);
		var routeCollection = require('./routeCollection').getRouteCollection().routeCollection;
		route.setRouteCollection(routeCollection);
		reqInterceptor.on('beforeProcessRequest', function(req,res,routeCollectionconfig) {
			if(req.url=="/mwplain")
				{
					res.writeHead(200, {'Content-Type': 'text/plain'});
					res.end('this process requires login');
				}
		  });
		minimalweb.spawn("127.0.0.1","3001");
  		// function end
  })

describe('server', function(){
  describe('minimalweb-plain-login', function(){
    it('should return plain text in response, also test of request filter', function(done){
    	request.get('http://127.0.0.1:3001/mwplain').end(function(res){
       		expect(res).to.exist;
		expect(res.status).to.equal(200);
		expect(res.text).to.equal('this process requires login');
		done();
  	});
    })
  });
  describe('minimalweb-plain', function(){
    it('should return plain text in response', function(done){
    	request.get('http://127.0.0.1:3001/mwplain/').end(function(res){
       		expect(res).to.exist;
		expect(res.status).to.equal(200);
		expect(res.text).to.equal('This is controller text');
		done();
  	});
    })
  });
  describe('minimalweb-plain-rest', function(){
    it('should return plain text in response', function(done){
    	request.get('http://127.0.0.1:3001/mwplain/1').end(function(res){
       		expect(res).to.exist;
		expect(res.status).to.equal(200);
		expect(res.text).to.equal('This is controller text with name mwplain and value 1');
		done();
  	});
    })
  });
  describe('minimalweb-plain-with-request-parameters', function(){
    it('should return plain text in response', function(done){
    	request.get('http://127.0.0.1:3001/mwplainreq?mwplain=1').end(function(res){
       		expect(res).to.exist;
		expect(res.status).to.equal(200);
		expect(res.text).to.equal('This is controller text with name mwplain and value 1');
		done();
  	});
    })
  });
  describe('minimalweb-plain-with-request-parameters and /', function(){
    it('should return plain text in response', function(done){
    	request.get('http://127.0.0.1:3001/mwplainreq/?mwplain=1').end(function(res){
       		expect(res).to.exist;
		expect(res.status).to.equal(200);
		expect(res.text).to.equal('This is controller text with name mwplain and value 1');
		done();
  	});
    })
  });
  describe('minimalweb-json', function(){
    it('should return json in response', function(done){
    	request.get('http://127.0.0.1:3001/mwjson/').end(function(res){
       		expect(res).to.exist;
		expect(res.status).to.equal(200);
		expect(res.text).to.equal('{\"name\":\"Ram\"}');
		done();
  	});
    })
  });
  describe('minimalweb-html', function(){
    it('should return html in response', function(done){
    	request.get('http://127.0.0.1:3001/mwhtml/').end(function(res){
       		expect(res).to.exist;
		expect(res.status).to.equal(200);
		expect(res.text).to.equal('<h2>This is controller text</h2>');
		done();
  	});
    })
  });
  describe('minimalweb-xml', function(){
    it('should return xml in response', function(done){
    	request.get('http://127.0.0.1:3001/mwxml').end(function(res){
       		expect(res).to.exist;
		expect(res.status).to.equal(200);
                //need to understand how to get XML
		done();
  	});
    })
  });
  describe('minimalweb-staticpage', function(){
    it('should return static file in response', function(done){
    	request.get('http://127.0.0.1:3001/mwindexpage').end(function(res){
       		expect(res).to.exist;
		expect(res.status).to.equal(200);
		expect(res.text).to.contain('<h1>This is Index File</h1>');
		done();
  	});
    })
  });
  describe('minimalweb-staticpage-cache', function(){
    it('should return static file in response test of cache', function(done){
    	request.get('http://127.0.0.1:3001/mwindexpage').end(function(res){
       		expect(res).to.exist;
		expect(res.status).to.equal(200);
		expect(res.text).to.contain('<h1>This is Index File</h1>');
		done();
  	});
    })
  });
  describe('minimalweb-dynamicpage', function(){
    it('should return dynamic file in response', function(done){
    	request.get('http://127.0.0.1:3001/mwdynamicpage').end(function(res){
       		expect(res).to.exist;
		expect(res.status).to.equal(200);
		expect(res.text).to.contain('Ram');
		done();
  	});
    })
  });
  describe('minimalweb-methodundo', function(){
    it('should return plain text in response', function(done){
    	request.get('http://127.0.0.1:3001/mwmethodundo').end(function(res){
       		expect(res).to.exist;
		expect(res.status).to.equal(200);
		expect(res.text).to.equal('this is a call of method async from Dynamic Class for undo');
		done();
  	});
    })
  });
  describe('minimalweb-methoddo', function(){
    it('should return html in response', function(done){
    	request.get('http://127.0.0.1:3001/mwmethoddo').end(function(res){
       		expect(res).to.exist;
		expect(res.status).to.equal(200);
		expect(res.text).to.equal('<h2>This is controller text from Method </h2>');
		done();
  	});
    })
  }); 		
  describe('minimalweb-method-rest', function(){
    it('should return xml in response', function(done){
    	request.get('http://127.0.0.1:3001/mwmethoddo/1').end(function(res){
       		expect(res).to.exist;
		expect(res.status).to.equal(200);
		expect(res.text).to.equal('<h2>This is controller text from Method </h2>');
		done();
  	});
    })
  });
  describe('minimalweb-postForm', function(){
    it('should return json in response', function(done){
	request.post('http://127.0.0.1:3001/mwpostForm')
	.send("{ \"firstname\": \"Mickey\", \"lastname\" : \"Mouse\" }")
	.end(function(res){
       		expect(res).to.exist;
		expect(res.status).to.equal(200);
		expect(res.text).to.contain('{\"person\":{\"name\":\"Ram\"}}');
		done();
  	});
    })
  });
})
after(function(){
  	process.kill(process.pid, 'SIGINT');
})
});


