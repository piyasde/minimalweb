var logger = require('../index').logger;

var firstFunction = function (req,res,next) {
      logger.log("first Function executed");
      logger.log(req.url);
      next();
  };

//module.exports.firstFunction = firstFunction;

module.exports = function(req,res,next) {
      return firstFunction(req,res,next);
  };
