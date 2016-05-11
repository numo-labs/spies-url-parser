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

function format_object (query) {

}

module.exports = format_object;
module.exports.parse_url = parse_url;
module.exports.make_birthday = make_birthday;
module.exports.parse_passenger_mix = parse_passenger_mix;
module.exports.departure_airport_name = departure_airport_name;
