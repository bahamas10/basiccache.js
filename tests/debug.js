var BasicCache = require('../');
var cache = new BasicCache({debug: console.log});

// set a key for 500ms
cache.set('key', new Date(), 500);

// request the key and print it
console.log('now:\t\t%s', cache.get('key'));

// print the key 3 seconds later so it's in the cache
setTimeout(function() {
  console.log('300ms:\t%s', cache.get('key'));
}, 300);

// print the key 6 seconds later so it's invalidated
setTimeout(function() {
  console.log('600ms:\t%s', cache.get('key'));
}, 600);

