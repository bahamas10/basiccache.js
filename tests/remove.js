var util = require('util');

var BasicCache = require('../');
var cache = new BasicCache();

console.log('setting `key` to `value`');
cache.set('key', 'value');

console.log('cache["key"] = %s', util.inspect(cache.get('key')));

console.log('deleting `key`');
cache.remove('key');

console.log('cache["key"] = %s', util.inspect(cache.get('key')));
