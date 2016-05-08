var url = require('url');
var qs = require('querystring');

function parse (urlstr) {
  var parts = url.parse(urlstr);
  console.log(JSON.stringify(parts, null, 2));
  var query = qs.parse(parts.query);
  console.log(query);
  return parts;
}

module.exports = parse;

var urlstr = 'http://www.spies.dk/bestil-pakkerejse?QueryDepID=12678&QueryCtryID=-1&QueryAreaID=0&QueryResID=-1&QueryDepDate=20160701&QueryDur=8&CategoryId=2&QueryRoomAges=|42,42,9,10&QueryUnits=1';

parse(urlstr);
