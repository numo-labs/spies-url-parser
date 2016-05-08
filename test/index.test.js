var assert = require('assert');
var urls = require('./fixtures.json').urls;
console.log(urls);
var parse = require('../');

describe('Parses the Query string of a Spies.dk url', function () {
  it('Parse departure date', function (done) {
    var q = parse(urls[0]);
    assert(q.QueryDepDate = '20160701');
    done();
  });
  it('Parse departure date', function (done) {
    urls.forEach(function (url) {
      var q = parse(url);
      console.log(q.QueryDepID);
    });
    done();
  });
});
