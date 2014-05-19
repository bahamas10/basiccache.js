/**
 * basiccache.js
 *
 * An extremely basic cache with a simple expiry system
 *
 * Author: Dave Eddy <dave@daveeddy.com>
 * License: MIT
 */
function BasicCache(opts) {
  if (!(this instanceof BasicCache)) {
    return new BasicCache(opts)
  }

  opts = opts || {};
  opts.prefix = opts.prefix || 'basiccache_';

  var self = this;

  self.opts = opts;
  self.cache = {};

  if (opts.purgeInterval) {
    self._purge_timer = setInterval(function() {
      self.purge();
    }, opts.purgeInterval);
  }
  if ('function' == typeof opts.debug) {
    self.debug = opts.debug;
  } else if (!opts.debug) {
    self.debug = function noop() { };
  }
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
  key = this.opts.prefix + key;
  if (this.cache[key] === undefined) {
    this.debug('failed to pull "%s" from cache', key);
    return;
  }
  if (d > this.cache[key].expires_at) {
    this.debug('key "%s" expired at: %s', key, this.cache[key].expires_at);
    delete this.cache[key];
    return;
  }
  this.debug('key "%s" pulled from cache', key);
  return this.cache[key].value;
};

/**
 * set an item in the cache
 *
 * expires defaults to 5 minutes
 */
BasicCache.prototype.set = function(key, value, expires) {
  key = this.opts.prefix + key;
  this.cache[key] = {
    value: value,
    expires_at: Date.now() + (expires || 5*60*1000)
  };
  return this.cache[key].expires_at;
};

/**
 * remove an item from the cache
 */
BasicCache.prototype.remove = function(key) {
  key = this.opts.prefix + key;
  delete this.cache[key];
};

/**
 * clear all items from the cache
 */
BasicCache.prototype.clear = function() {
  for (var key in this.cache) {
    if (!this.cache.hasOwnProperty(key))
      continue;
    delete this.cache[key];
  }
};


/**
 * Clear expired items
 */
BasicCache.prototype.purge = function() {
  var d = Date.now(), count = 0
  for (var key in this.cache) {
    if (this.cache[key] && d > this.cache[key].expires_at) {
      delete this.cache[key];
      count += 1;
    }
  }
  this.debug('Purged %s expired item(s).', count)
}

/**
 * Clear purge interval
 */
BasicCache.prototype.sleep = function() {
  clearInterval(this._purge_timer)
}

/**
 * internal debug function
 */
BasicCache.prototype.debug = function() {
  console.log.apply(console, arguments);
};
