var assert = require('assert');
var urls = require('./fixtures.json').urls;
console.log(urls);
var parse = require('../');

describe('Parses the Query string of a Spies.dk url', function () {
  it('Parse fixture', function (done) {
    var q = parse(urls[0]);
    assert(q.QueryDepDate = '20160701');
    done();
  });
});
