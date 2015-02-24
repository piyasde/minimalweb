var logger = require('minimalweb').logger;

var corsFunction = function (req,res,next) {
      res.setHeader("Access-Control-Allow-Origin", "http://localhost");
      res.setHeader("Access-Control-Allow-Methods", "GET, POST");
      next();
  };

//module.exports.firstFunction = firstFunction;

module.exports = function(req,res,next) {
      return corsFunction(req,res,next);
  };
