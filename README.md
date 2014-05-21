basiccache.js
=============

An extremely basic cache with a simple expiry system

Installation
------------

    npm install basiccache

Usage
-----

### first

node

``` js
var BasicCache = require('basiccache');
```

html

``` html
<script src="basiccache.min.js"></script>
<!-- // defines BasicCache() -->
```

### then

``` js
var cache = new BasicCache();

cache.set('foo', 'bar');
// 'foo' will never expire

cache.set('key', 'value', 5 * 1000);
// key will expire in 5 seconds, regardless of access

cache.get('key');
// => 'value'

setTimeout(function() {
  cache.get('key');
  // => 'value'
}, 3 * 1000);

setTimeout(function() {
  cache.get('key');  // => undefined
  cache.get('foo');  // => 'bar'
}, 6 * 1000);

```

expiry can be set per individual key, or pass to constructor:

```js
// default all keys to expire in one hour
var cache = new BasicCache({ expires: 3600 * 1000 })
```

Function
--------

### new BasicCache([opts])

- `opts.debug`: a function to use to print debug messages, defaults to a `noop`
- `opts.expires`: default expire time in ms
- `opts.prefix`: string to prefix the cache keys with for the internal cache object,
defaults to `basiccache_`
- `opts.purgeInterval`: a time, in ms, to purge the cache of expired items, defaults to no timer

### cache.get(key)

Returns the cached item if it exists and hasn't expired. If the item doesn't
exist, or has been invalidated, this function will return `undefined`.

### cache.set(key, value, [expires])

Set a key to a value, `expires` is the number of milliseconds from now when
this specific cache entry expires. If not configured, and no `opts.expires` was set,
the cache will never expire.

### cache.remove(key)

Remove an entry from the cache, no errors are thrown if the key doesn't exist or is already invalidated.

### cache.clear()

Remove all entries from the cache.

### cache.purge()

Remove expired items from the cache.

### cache.startTimer()

Start the timer for purging expired items.

### cache.cancelTimer()

Stop the purge timer.


License
-------

MIT
