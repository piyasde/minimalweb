var logger = require('./logger');
var config = require('../config');

var cacheObj = function() {
  logger.logInfo("cache constructed");
}

cacheObj.prototype = {
  cachestore : {},
  maxSize: config.maxSize|| 26214400,
  maxAge : config.maxAge|| 5400 * 1000,
  cleaninterval: config.cleaninterval|| 7200 * 1000,//(ms) two hours 
  cleanetimestart: 0, 
  clean: function (now) {
    if ((now - this.cleaninterval) > this.cleanetimestart) {
      logger.logInfo('cleaning data...');
      this.cleanetimestart = now;
      var that = this;
      Object.keys(this.cachestore).forEach(function (file) {
        if (now > that.cachestore[file].timestamp + that.maxAge) {
          delete that.cachestore[file];
        }
      });
    }
  }
}

module.exports.getCacheServer = function() {
	return new cacheObj();
};

