/**
 * parse a spies.dk url to extract params
 * @returns {Object} obj containing the parsed query parameters
 see: test/fixtures.json for examples
 */
function parse_url (urlstr) {
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
  var date = new Date();
  var Y = date.getFullYear() - parseInt(age, 10); // subtract age (in years)
  var M = date.getMonth();
  var D = date.getDate();
  return '' + Y + '-' + M + '-' + D;
}
/**
 *
 */
function parse_date_string (str) {
  var Y = str.slice(0, 4);
  var M = str.slice(4, 6);
  var D = str.slice(6, 8);
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
    passengers: [],
    adults: 0,
    children: 0
  };
  passengers.forEach(function (age) {
    if (age > 17) {
      mix.adults += 1;
    } else {
      mix.children += 1;
    }
    mix.passengers.push(make_birthday(age));
  });
  return mix;
}

function departure_airport_name (id) {
  var airport_name = '';
  switch (id) {
    case 12678:
      airport_name = 'København - CPH';
      break;
    case 126786:
      airport_name = 'Billund - BLL';
      break;
    case 12675:
      airport_name = 'Aalborg - AAL';
      break;
    case 37057:
      airport_name = 'Odense - ODE';
      break;
    case 12677:
      airport_name = 'Rønne - RNN';
      break;
    default: // default to Copenhagen
      airport_name = 'København - CPH';
      break;
  }
  return airport_name;
}

function format_object (url) {
  var query = parse_url(url);
  return {
    departure_airport: departure_airport_name(query.QueryDepID),
    pax_mix: parse_passenger_mix(query.QueryRoomAges),
    duration_weeks: Math.floor(query.QueryDur / 7),
    departure_date: parse_date_string(query.QueryDepDate)
  };
}

module.exports = format_object;
module.exports.parse_url = parse_url;
module.exports.make_birthday = make_birthday;
module.exports.parse_passenger_mix = parse_passenger_mix;
module.exports.parse_date_string = parse_date_string;
module.exports.departure_airport_name = departure_airport_name;

// var url = 'http://www.spies.dk/bestil-pakkerejse?QueryDepID=12678&QueryCtryID=-1&QueryAreaID=0&QueryResID=-1&QueryDepDate=20160701&QueryDur=8&CategoryId=2&QueryRoomAges=|42,42,9,10&QueryUnits=1';
// console.log(JSON.stringify(format_object(url), null, 2));
