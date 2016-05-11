# spies url parser

## Why?
<img style="float: right;" src="https://cloud.githubusercontent.com/assets/194400/15152068/db61b016-16cb-11e6-8811-4607baa2bf93.png">

Urls on [Spies.dk](http://www.spies.dk/) contain the query parameters
of the options people selected when they performed their holiday search.


## What?

When a search is performed on Spies.dk the options selected are stored as query parameters in the url.

## How?

When a user selects the following options:
+ From: København
+ Where:

The url is:
```
http://www.spies.dk/bestil-pakkerejse?QueryDepID=12678
&QueryCtryID=-1&QueryAreaID=0&QueryResID=-1
&QueryDepDate=20160701&QueryDur=8&CategoryId=2
&QueryRoomAges=|42,42,9,10&QueryUnits=1
```
Which we parse as:

```js
{
  "departure_airport": "København - CPH",
  "pax_mix": {
    "passengers": [
      "1974-4-11",
      "1974-4-11",
      "2007-4-11",
      "2006-4-11"
    ],
    "adults": 2,
    "children": 2
  },
  "duration_weeks": 1,
  "departure_date": "2016-07-01"
}
```

### Parse the URl

```js
function parse (url) {
  var q = url.split('?')[1];
  var params = q.split('&');
  return params.reduce(function (obj, item) {
    var k = item.split('=')[0];
    var v = item.split('=')[1];
    obj[k] = v;
    return obj;
  }, {});
}

module.exports = parse;

var urlstr = 'http://www.spies.dk/bestil-pakkerejse?QueryDepID=12678&QueryCtryID=-1&QueryAreaID=0&QueryResID=-1&QueryDepDate=20160701&QueryDur=8&CategoryId=2&QueryRoomAges=|42,42,9,10&QueryUnits=1';
var q = parse(urlstr);
console.log(q);
```

Result:

```js
{ QueryDepID: '12678',
  QueryCtryID: '-1',
  QueryAreaID: '0',
  QueryResID: '-1',
  QueryDepDate: '20160701',
  QueryDur: '8',
  CategoryId: '2',
  QueryRoomAges: '|42,42,9,10',
  QueryUnits: '1' }
```

### Things we need to *extract*

+ Departure Airport
+ Destination
+ Duration of Holiday
+ Departure date
+ Adults
+ Children
