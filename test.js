var SortedSet = require('./'),
    assert = require('assert'),
    d = describe;

// check that sorting is correct after adding random items
// check that sorting is correct
d("inserting", function() {
    d("into 3,2,1,0 a value of", function() {
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
