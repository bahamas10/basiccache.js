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

cache.set('key', 'value', 5 * 1000);
// key will expire in 5 seconds, regardless of access

cache.get('key');
// => 'value'

setTimeout(function() {
  cache.get('key');
  // => 'value'
}, 3 * 1000);

setTimeout(function() {
  cache.get('key');
  // => undefined
}, 6 * 1000);

```

expiry is set per individual key

Function
--------

### new BasicCache([opts])

- `opts.debug`: print debug info to the console on stderr, defaults to `false`

### cache.get(key)

returns the cached item if it exists and hasn't expired.  if the item doesn't
exist, or has been invalidated, this function will return `undefined`

### cache.set(key, value, [expires])

set a key to a value, `expires` is the number of milliseconds from now when
this specific cache entry expires, defaults to 5 * 60 * 1000 (5 minutes)

### cache.remove(key)

remove an entry from the cache, no errors are thrown if the key doesn't exist or is already invalidated

### cache.clear()

remove all entries from the cache

License
-------

MIT
