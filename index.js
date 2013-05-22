var util = require('util'),
    binSearch = require('binary-search');

module.exports = SortedSet;

function SortedSet(arr, cmp) {
    if (!(this instanceof SortedSet)) {
        return new SortedSet(arr, cmp);
    }

    // allow arguments to be passed in in any order
    if (typeof arr === 'function') {
        var x = cmp;
        cmp = arr;
        arr = x;
    }

    this.items = [];
    this.cmp = cmp || defaultCmp;

    arr = arr || [];
    // add all elements sorted
    this.add.apply(this, arr);
}

/*
 * Add items to the array
 * accepts multiple arguments
 * returns the index of the first element inserted
 */
SortedSet.prototype.add = function() {
    var x, l, idx;
    for (var i = arguments.length-1; i >= 0; i--) {
        idx = this.indexOf(arguments[i]);
        if (idx < 0) {
            x = -idx - 1;
            l = 0;
        } else {
            x = idx;
            l = 1;
        }
        this.items.splice(x, l, arguments[i]);
    }
    return x;
};

/*
 * returns a string summary of contents
 */
SortedSet.prototype.toString = function(value) {
    return "[SortedSet " + this.items.toString() + "]";
};

SortedSet.prototype.contains = function(item) {
    return this.indexOf(item) >= 0;
};

SortedSet.prototype.containsAll = function(arr) {
    for (var i = 0, l = arr.length; i < l; i++) {
        if (!this.contains(arr[i])) return false;
    }
    return true;
};

SortedSet.prototype.indexOf = function(item) {
    return binSearch(this.items, item, this.cmp);
};

function defaultCmp(a,b) {
    return a-b;
}

