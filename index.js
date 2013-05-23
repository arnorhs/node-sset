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
    this.addFromArray(arr);
}

/*
 * Add item to the array
 * accepts multiple arguments
 *
 * returns the index of the first item inserted
 */
SortedSet.prototype.add = SortedSet.prototype.push = function() {
    return this.addFromArray(arguments);
};

/*
 * Add items from an unsorted array-like object
 * (Note: #add() uses this method with it's arguments object)
 *
 * returns the index of the first item inserted
 */
SortedSet.prototype.addFromArray = function(arr) {
    var firstIndex;
    for (var i = arr.length-1; i >= 0; i--) {
        firstIndex = this.addOne(arr[i]);
    }
    return firstIndex;
};

/*
 * Adds a single item into the array
 *
 * returns the index of the item that was inserted
 */
SortedSet.prototype.addOne = function(item) {
    var x, l,
        idx = this.indexOf(item);
    if (idx < 0) {
        x = -idx - 1;
        l = 0;
    } else {
        x = idx;
        l = 1;
    }
    this.items.splice(x, l, item);
    return x;
};

/*
 * returns a string summary of contents
 */
SortedSet.prototype.toString = function(value) {
    var contents = this.items.length > 0 ? "[" + this.items.toString() + "]" : "empty";
    return "{" + this.constructor.name + " " + contents + "}";
};

/*
 * Gets an item by index from the array
 */
SortedSet.prototype.get = function (idx) {
    return this.items[idx];
};

/*
 * Removes an item by value from the array
 *
 * returns the item that was removed, or undefined if
 * not found
 */
SortedSet.prototype.remove = function(value) {
    var idx = this.indexOf(value);
    if (idx < 0) return;
    return this.removeAtIndex(idx);
};

/*
 * Removes an item at an index
 *
 * returns an array of the items that were found or undefined if
 * nothing was found. (Default behavior of splice removal)
 */
SortedSet.prototype.removeAtIndex = function(idx) {
    return this.items.splice(idx, 1)[0];
};

/*
 * Checks for the presence of a value in the array
 *
 * Returns true if it was found, false if not
 */
SortedSet.prototype.contains = function(item) {
    return this.indexOf(item) >= 0;
};

/*
 * Checks for the presence of all values in an array
 *
 * Returns true if they were all found, false if not
 */
SortedSet.prototype.containsAll = function(arr) {
    for (var i = 0, l = arr.length; i < l; i++) {
        if (!this.contains(arr[i])) return false;
    }
    return true;
};

/*
 * Does a binary search for the particular item.
 *
 * Returns the index if the item is found, if not, the index of the item
 * that is the closest match + 1 will be returned as a minus value (that
 * is decided by the binary-search module)
 */
SortedSet.prototype.indexOf = function(item) {
    return binSearch(this.items, item, this.cmp);
};

function defaultCmp(a,b) {
    return a-b;
}

