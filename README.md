[![npm version](https://badge.fury.io/js/minimalweb.svg)](http://badge.fury.io/js/minimalweb)
[![Build Status](https://travis-ci.org/piyasde/minimalweb.svg?branch=master)](https://travis-ci.org/piyasde/minimalweb.svg?branch=master)
[![Coverage Status](https://coveralls.io/repos/piyasde/minimalweb/badge.svg?branch=master)](https://coveralls.io/r/piyasde/minimalweb?branch=master)
[![Code Climate](https://codeclimate.com/github/piyasde/minimalweb/badges/gpa.svg)](https://codeclimate.com/github/piyasde/minimalweb)
[ ![Codeship Status for piyasde/minimalweb](https://codeship.com/projects/27b39020-9126-0132-1525-6e434ff849c7/status?branch=master)](https://codeship.com/projects/61652)

# minimalweb (A Model-View-Controller Framework)   
A simple web framework with node.js which has provision to support rest api and http request. 
The framework will only support request/response handling. 
The Model and Service related implementation will be needed to be done by user. 
The view can be attached in Configuration or can be injected from Controller.

It is integrated with Travis CI and Codeship for Continuous Building and Code Coverage Report can be found in Coveralls. 

```sh
$ npm install minimalweb
```

## Framework access

```js
var minimalweb = require('minimalweb')
```

### Framework Feature Support

*   Get Method Handling
*   Post Method Handling
*   Post Method Handling with Upload
*   Limited set of REST Support (Upto Now)
*   Request Parameter Handling
*   Session Handling
*   Custom Middleware support at Request Processing Level
*   Central Request Interceptor Support
*   After Response Interceptor Support at Controller Level
*   Minimum caching support for static file serving
*   Routing configuration through JSON Array

#### The First Project (Get Plain Text as response)

##### Create a Controller -

File - `PlainTextController.js`

```js
var controller = require('minimalweb').abstractController;
var selfController = function () {
}
selfController.__proto__ = controller;

selfController.processRequest = function(req,res) {
	selfController.setString("This is controller text");
	selfController.process(req,res,function(err,content){
		logger.log('content -'+content);
	});
}
```

##### Create a Route Collection -

File - `routeCollection.js`

```js
var routeCollection =
[
	{requestPath:'/mwplain',executeController:require('./PlainTextController').getPlainTextController(),format:"plain"}
]

function collection() {
    this.routeCollection = routeCollection;
}

var getRouteCollection = function() {
	return new collection();
};

module.exports.getRouteCollection = getRouteCollection;
```
##### Create the start point of the Server -

File - `startpoint.js`

```js
var minimalweb = require('minimalweb');

// Need for routing functionality
var route = minimalweb.route;

/**
 * routing collection is aquired and send to route for request processing 	
 */
var routeCollection = require('./routeCollection').getRouteCollection().routeCollection;
route.setRouteCollection(routeCollection);

/**
 * Last step - start the server
 */
minimalweb.spawn("127.0.0.1","3001");
```
#### Sample Project

Sample project is given with features in `minimalweb-test` folder in project root.

Controllers are with functionalities -
*   PlainTextController        - featured with `plain text` handling
*   PlainRequestController     - featured with `Request Parameter` handling
*   PlainRestController        - featured with `Rest API` handling
*   PlainHtmlController        - featured with `plain text` handling
*   PlainXmlController         - featured with `xml` handling
*   PlainJsonController        - featured with `json` handling
*   methodController           - featured with `method` handling in Controller
*   StaticFileController       - featured with `static file` handling
*   DynamicFileController      - featured with `dynamic file` handling i.e. render with server side variable values.
*   PostController             - featured with `post` handling with/without upload

#### Tests

Tests are done wih mocha. Main test file is `test.js` in project root.

#### Code Coverage

Code coverage is done with `istanbul`. Report can be found in [Coveralls](https://coveralls.io/r/piyasde/minimalweb).

#### Website

*   [minimalweb.me](http://www.minimalweb.me)

### Some features where commuity libraries are used -
*   Session Handling through `express-session`
*   Post Variables Handling through `formidable`
*   Javascript template handling with `ejs`
*   Application Access log implementation with `morgan` (Process Request)
*   Application log implementation with `bunyan`

##### Thanks to all of the contributors in npm registry, whose libray are used to build the current framework

#### Left works
*   Error handling
*   All REST Pattern Handling 
*   Provision for generic javascript template engine handling

#### Known Issues

*   Rigorous load testing is required.

#### License

[MIT](https://github.com/piyasde/minimalweb/blob/master/LICENSE)

