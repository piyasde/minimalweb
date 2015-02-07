var logger = require('minimalweb').logger;

var secondFunction = function (req,res,next) {
      logger.log("second Function executed");
      logger.log(req.url);
      next();
  };

//module.exports.secondFunction = secondFunction;

module.exports = function(req,res,next) {
      return secondFunction(req,res,next);
  };
