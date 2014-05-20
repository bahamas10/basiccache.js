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
    return new BasicCache(opts);
  }

  opts = opts || {};
  opts.prefix = opts.prefix || 'basiccache_';
  opts.expires = opts.expires || opts.expire || opts.ttl;

  this.opts = opts;
  this.cache = {};

  if (opts.purgeInterval) {
    this.startTimer(opts.purgeInterval)
  }
  if ('function' == typeof opts.debug) {
    this.debug = opts.debug;
  } else {
    this.debug = function noop() { };
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
  key = this.opts.prefix + key;
  var obj = this.cache[key];
  if (this.cache[key] === undefined) {
    this.debug('miss cache for "%s"', key);
    return;
  }
  if (obj.expires_at && Date.now() > obj.expires_at) {
    this.debug('cache for "%s" expired at: %s', key, this.cache[key].expires_at);
    delete this.cache[key];
    return;
  }
  this.debug('hit cache for "%s"', key);
  return this.cache[key].value;
};

/**
 * Set an item in the cache
 */
BasicCache.prototype.set = function(key, value, expires) {
  key = this.opts.prefix + key;
  expires = expires || this.opts.expires;
  this.cache[key] = {
    value: value,
    // use `undefined`, so comparison to any Date will return `false`
    expires_at: expires ? Date.now() + expires : undefined
  };
  return this.cache[key].expires_at;
};

/**
 * Remove an item from the cache
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
  var d = Date.now(), count = 0;
  for (var key in this.cache) {
    if (this.cache[key] && d > this.cache[key].expires_at) {
      delete this.cache[key];
      count += 1;
    }
  }
  this.debug('Purged %s expired item(s).', count);
};

/**
 * Start a purge timer
 */
BasicCache.prototype.startTimer = function(interval) {
  var self = this;
  self._purge_timer = setInterval(function() {
    self.purge();
  }, interval);
};

/**
 * Clear purge interval
 */
BasicCache.prototype.sleep = function() {
  if (this.hasOwnProperty('_purge_timer')) {
    clearInterval(this._purge_timer);
    delete this._purge_timer;
  }
};
