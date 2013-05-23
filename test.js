var SortedSet = require('./'),
    assert = require('assert'),
    deepEqual = require('deep-equal'),
    d = describe;

d("Object created using the SortedSet constructor", function() {
    d("invoked with", function() {
        d("new", function() {
            var ss = new SortedSet;
            it("should be an instance of SortedSet", function() {
                assert(ss instanceof SortedSet, "Not an instance of SortedSet");
            });
        });
        d("out new", function() {
            var ss = SortedSet();
            it("should be an instance of SortedSet", function() {
                assert(ss instanceof SortedSet, "Not an instance of SortedSet");
            });
        });
    });
    d("and no parameters", function() {
        var ss;
        beforeEach(function() {
            ss = SortedSet();
        });
        it("should have an empty array", function() {
            assert(Array.isArray(ss.items), "items is not an array");
            assert(ss.items.length === 0, "items length is not 0");
        });
        it("should have a function comparator", function() {
            assert(typeof ss.cmp === "function", ".cmp is not a function");
        });
    });
    d("and comparator", function() {
        var ss, cmp = function(){};
        beforeEach(function() {
            ss = SortedSet(cmp);
        });
        it("should have an empty array", function() {
            assert(Array.isArray(ss.items), "items is not an array");
            assert(ss.items.length === 0, "items lenght is not 0");
        });
        it("should have the right function comparator", function() {
            assert(typeof ss.cmp === "function", ".cmp is not a function");
            assert(ss.cmp === cmp, ".cmp is not the same as the provided comparator");
        });
    });
    d("and array", function() {
        var ss, arr = [7777, 1337], arrCopy = arr.slice(0);
        beforeEach(function() {
            ss = SortedSet(arr);
        });
        it("should not modify the array", function() {
            assert(deepEqual(arr, arrCopy), "Array was modified");
        });
        it("should have an array with the same length", function() {
            assert(Array.isArray(ss.items), "items is not an array");
            assert(ss.items.length === arr.length, "items lenght is not 0");
        });
        it("should have a function comparator", function() {
            assert(typeof ss.cmp === "function", ".cmp is not a function");
        });
    });
    d("and", function() {
        var ss,
            arr = [7777, 1337],
            arrCopy = arr.slice(0),
            cmp = function(a,b){return a-b;};
        ["array, comparator", "comparator, array"].forEach(function(t) {
            d(t, function() {
                beforeEach(function() {
                    if (t === "array, comparator") {
                        ss = SortedSet(arr, cmp);
                    } else {
                        ss = SortedSet(cmp, arr);
                    }
                });
                it("should not modify the array", function() {
                    assert(deepEqual(arr, arrCopy), "Array was modified");
                });
                it("should have an array with the same length", function() {
                    assert(Array.isArray(ss.items), "items is not an array");
                    assert(ss.items.length === arr.length, "items length is not " + arr.length);
                });
                it("should have a function comparator", function() {
                    assert(typeof ss.cmp === "function", ".cmp is not a function");
                    assert(ss.cmp === cmp, ".cmp is not the same as the provided comparator");
                });
            });
        });
    });
});


d("SortedSet#add", function() {
    d("into [3,2,1,0] a value of", function() {
        var ss;
        beforeEach(function() {
            ss = SortedSet([3,2,1,0]);
        });
        d("7", function() {
            it("should have index 4", function() {
                ss.add(7);
                insertAssert(ss.indexOf(7), 4);
            });
        });
        d("-100", function() {
            it("should have index 0", function() {
                ss.add(-100);
                insertAssert(ss.indexOf(-100), 0);
            });
        });
        d("1.5", function() {
            it("should have index 2", function() {
                ss.add(1.5);
                insertAssert(ss.indexOf(1.5), 2);
            });
        });
        d("2", function() {
            it("should have index 2", function() {
                ss.add(2);
                insertAssert(ss.indexOf(2), 2);
                assert(ss.items.length === 4, "Inserted value did not replace existing value");
            });
        });
    });
});

d("SortedSet#get", function() {
    var first = 1111,
        last = 2222;
    var ss = SortedSet([first,last]);
    it("should return the correct item", function() {
        assert(ss.get(0) === first, "First item is not " + first);
        assert(ss.get(1) === last, "Last item is not " + last);
    });
});

var insertAssert = function(value, expected) {
    assert(value === expected, "Was not inserted correctly, expected: " + expected + ", but was: " + value);
};
