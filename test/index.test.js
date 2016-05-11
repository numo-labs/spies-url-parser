var assert = require('assert');
var urls = require('./fixtures.json').urls;
console.log(urls);
var parse = require('../');

describe('make_birthday', function () {
  it('Returns a Temporary birthday date for a given age', function (done) {
    var age = '21';

    var today = new Date();
    var Y = today.getFullYear() - parseInt(age, 10); // subtract age (in years)
    var M = today.getMonth();
    var D = today.getDate();
    var expected = '' + Y + '-' + M + '-' + D; // e.g: 1995-05-11
    console.log('   expected:', expected);
    var birthday = parse.make_birthday(age);

    assert.equal(birthday, expected);
    done();
  });
});

describe('Parse Passenger Mix from QueryRoomAges URL Query Parameter', function () {
  it('gets passenger mix (birthdays) from QueryRoomAges', function (done) {
    var query = parse(urls[0]);
    var pax_mix = parse.parse_passenger_mix(query.QueryRoomAges);
    assert.equal(pax_mix.adults.length, 2);
    done();
  });

  it('Parses edge case unusual value: &QueryUnits=1#h1=prilo ...', function (done) {
    var query = parse(urls[5]);
    var pax_mix = parse.parse_passenger_mix(query.QueryRoomAges);
    assert.equal(pax_mix.children.length, 3);
    done();
  });
});

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
