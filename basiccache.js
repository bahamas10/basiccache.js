/**
 * basiccache.js
 *
 * An extremely basic cache with a simple expiry system
 *
 * Author: Dave Eddy <dave@daveeddy.com>
 * License: MIT
 */
function BasicCache(opts) {
  this.opts = opts || {};
  this.cache = {};
}

if (typeof exports !== 'undefined') {
  module.exports = BasicCache;
}

/**
 * get an item from the cache, returns `undefined`
 * if not found
 */
BasicCache.prototype.get = function(key) {
  var d = Date.now();
  if (this.cache[key] === undefined) {
    this.debug('failed to pull "' + key + '" from cache');
    return;
  }

  if (d > this.cache[key].invalid) {
    this.debug('key "' + key + '" expired at: ' + this.cache[key].invalid);
    delete this.cache[key];
    return;
  }

  this.debug('key "' + key + '" pulled from cache');
  return this.cache[key].value;
};

/**
 * set an item in the cache
 *
 * expires defaults to 5 minutes
 */
BasicCache.prototype.set = function(key, value, expires) {
  var invalid = Date.now() + (expires || 5*60*1000);
  this.cache[key] = {};
  this.cache[key].value = value;
  this.cache[key].invalid = invalid;
  return this.cache[key].invalid;
};

/**
 * remove an item from the cache
 */
BasicCache.prototype.remove = function(key) {
  delete this.cache[key];
};

/**
 * clear all items from the cache
 */
BasicCache.prototype.clear = function() {
  for (var key in this.cache) {
    if (!this.cache.hasOwnProperty(key)) continue;
    delete this.cache[key];
  }
};

/**
 * internal debug function
 */
BasicCache.prototype.debug = function() {
  if (this.opts.debug) console.log.apply(console, arguments);
};
