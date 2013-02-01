var BasicCache = require('../');
var cache = new BasicCache({debug: true});

// set a key for 5 seconds
cache.set('key', new Date(), 5 * 1000);

// request the key and print it
console.log('now:\t\t%s', cache.get('key'));

// print the key 3 seconds later so it's in the cache
setTimeout(function() {
  console.log('3 seconds:\t%s', cache.get('key'));
}, 3 * 1000);

// print the key 6 seconds later so it's invalidated
setTimeout(function() {
  console.log('6 seconds:\t%s', cache.get('key'));
}, 6 * 1000);

