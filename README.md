[![npm version](https://badge.fury.io/js/minimalweb.svg)](http://badge.fury.io/js/minimalweb)
[![Build Status](https://travis-ci.org/piyasde/minimalweb.svg?branch=master)](https://travis-ci.org/piyasde/minimalweb.svg?branch=master)
[![Coverage Status](https://coveralls.io/repos/piyasde/minimalweb/badge.svg?branch=master)](https://coveralls.io/r/piyasde/minimalweb?branch=master)[ ![Codeship Status for piyasde/minimalweb](https://codeship.com/projects/27b39020-9126-0132-1525-6e434ff849c7/status?branch=master)](https://codeship.com/projects/61652)

# minimalweb
A simple web framework with node.js which has provision to support rest api and http request
Integrated with Travis CI which is testing against AWS SETUP.

```sh
$ npm install minimalweb@0.1.6
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
*   Minimum caching support for static file serving
*   Routing configuration through JSON Array

### Some features where commuity libraries are used -
*   Session Handling through express-session
*   Post Variables Handling through formidable

##### Thanks to all of the contributors in npm registry, whose libray are used to build the current framework

#### License

[MIT](https://github.com/piyasde/minimalweb/blob/master/LICENSE)

   
