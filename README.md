# spies url parser

## Why?



## What?



## How?

When a user selects the following options:

![spies-search-fields](https://cloud.githubusercontent.com/assets/194400/15152068/db61b016-16cb-11e6-8811-4607baa2bf93.png)

The url is:
`http://www.spies.dk/bestil-pakkerejse?QueryDepID=12678&QueryCtryID=-1&QueryAreaID=0&QueryResID=-1&QueryDepDate=20160701&QueryDur=8&CategoryId=2&QueryRoomAges=|42,42,9,10&QueryUnits=1`


### Browser Version

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

Same result:

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
+ Duration of Holiday
+ Departure date
+ Adults
+ Children
