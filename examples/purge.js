var BasicCache = require('../');
var cache = new BasicCache({debug: true, purgeInterval: 1000 });

var key, value;

for (var i = 0; i < 10; i++) {
  key = 'key-' + i;
  value = i;
  cache.set(key, value, i * 100);
}

setTimeout(function() {
  console.log('1s later, Remains %s item', Object.keys(cache.cache).length);
  cache.sleep();
}, 1000)
