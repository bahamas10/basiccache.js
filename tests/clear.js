var util = require('util');

var BasicCache = require('../');
var cache = new BasicCache();

var key, value;

for (var i = 0; i < 10; i++) {
  key = 'key-' + i;
  value = i;
  console.log('setting `%s` to `%d`', key, value);
  cache.set(key, value);
}

console.log('\ntesting for presence\n');

for (var i = 0; i < 10; i++) {
  key = 'key-' + i;
  console.log('cache["%s"] = %s', key, util.inspect(cache.get(key)));
}

console.log('\nclearing cache\n');
cache.clear();

for (var i = 0; i < 10; i++) {
  key = 'key-' + i;
  console.log('cache["%s"] = %s', key, util.inspect(cache.get(key)));
}
