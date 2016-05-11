function parse (urlstr) {
  var q = urlstr.split('?')[1];
  var params = q.split('&');
  return params.reduce(function (obj, item) {
    var k = item.split('=')[0];
    var v = item.split('=')[1];
    obj[k] = v;
    return obj;
  }, {});
}

/**
 * The Spies.dk url query parameter for QueryRoomAges is a list of ages
 * but our package provider expects a birthday date as a string ...
 * so make_birthday accepts the age as a
 * @returns {String} birthday - a birthday date string in format: 'YYYY-MM-DD'
 *  e.g: '1986-05-11'
 */
function make_birthday (age) {
  var today = new Date();
  var Y = today.getFullYear() - parseInt(age, 10); // subtract age (in years)
  var M = today.getMonth();
  var D = today.getDate();
  return '' + Y + '-' + M + '-' + D;
}

/* Often called "Pax Mix"
 * parse_passenger_mix parses the QueryRoomAges URL Query Parameter
 * and returns a passenger mix we can use in React UI and Package Providers
 * @param {String} people - the value of a QueryRoomAges from spies URL
 *  Sample input: |42,42,12,15 (*yes, that's a pipe char before the ages*)
 * assigns *Temporary* Birthdays to passengers (which they can update later)
 * Assumes everyone has *just* turned their age i.e. if today is Wed 11 May
 * a user who is 42 years old had their birthday *yesterday*.
 */
function parse_passenger_mix (people) {
  var passengers = people.replace('|', '').split(',');
  var mix = {
    adults: [],
    children: []
  };
  passengers.forEach(function (age) {
    if (age > 17) {
      mix.adults.push(make_birthday(age));
    } else {
      mix.children.push(make_birthday(age));
    }
  });
  return mix;
}

module.exports = parse;
module.exports.make_birthday = make_birthday;
module.exports.parse_passenger_mix = parse_passenger_mix;

var urlstr = 'http://www.spies.dk/bestil-pakkerejse?QueryDepID=12678&QueryCtryID=-1&QueryAreaID=0&QueryResID=-1&QueryDepDate=20160701&QueryDur=8&CategoryId=2&QueryRoomAges=|42,42,9,10&QueryUnits=1';
var q = parse(urlstr);
console.log(q);
