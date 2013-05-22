# SortedSet

Yet another sorted set.

Uses binary-sort to insert and search and insert in set

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

### Todo

Obvious ***big*** things missing, namely:

- delete
- union
- get thing at index
- map
- filter
- shift
- pop
- toArray

