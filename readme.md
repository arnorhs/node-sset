# sset - Sorted Set for javascript

Yet another sorted set.

Uses binary-sort to insert and search and insert in set.

Also is much faster than searching through a normal array, as per this (maybe unfair) benchmark:
![benchmark](http://f.cl.ly/items/2Q0d1b2y47290q3r0809/Screen%20Shot%202013-05-22%20at%201.58.46%20AM.png)

### Usage:

```javascript
var SortedSet = require('SortedSet');

var set = SortedSet([5,4,2,1]);

set.add(3);

// set will now contain 1, 2, 3, 4, 5
```

### Custom comparator

var set = SortedSet(function(a, b) {
    return a.val - b.val;
});

set.add({val: 5}, {val: 3});

// set now contains [{val: 3}, {val: 5}];
```

### Installation

    npm install sset

### Todo

Obvious ***big*** things missing, namely:

- union
- get thing at index
- map
- filter
- shift
- pop
- toArray
- join

### License

MIT
