# spies url parser

## Why?



## What?



## How?

When a user selects the following options:

![spies-search-fields](https://cloud.githubusercontent.com/assets/194400/15152068/db61b016-16cb-11e6-8811-4607baa2bf93.png)

The url is:
`http://www.spies.dk/bestil-pakkerejse?QueryDepID=12678&QueryCtryID=-1&QueryAreaID=0&QueryResID=-1&QueryDepDate=20160701&QueryDur=8&CategoryId=2&QueryRoomAges=|42,42,9,10&QueryUnits=1`


### Using Node:

```js
var url = require('url');
var qs = require('querystring');

function parse (urlstr) {
  var parts = url.parse(urlstr);
  console.log(JSON.stringify(parts, null, 2));
  var query = qs.parse(parts.query);
  console.log(query);
  return parts;
}

var urlstr = 'http://www.spies.dk/bestil-pakkerejse?QueryDepID=12678&QueryCtryID=-1&QueryAreaID=0&QueryResID=-1&QueryDepDate=20160701&QueryDur=8&CategoryId=2&QueryRoomAges=|42,42,9,10&QueryUnits=1';

parse(urlstr);
```

Result:

```js
{
  "protocol": "http:",
  "slashes": true,
  "auth": null,
  "host": "www.spies.dk",
  "port": null,
  "hostname": "www.spies.dk",
  "hash": null,
  "search": "?QueryDepID=12678&QueryCtryID=-1&QueryAreaID=0&QueryResID=-1&QueryDepDate=20160701&QueryDur=8&CategoryId=2&QueryRoomAges=%7C42,42,9,10&QueryUnits=1",
  "query": "QueryDepID=12678&QueryCtryID=-1&QueryAreaID=0&QueryResID=-1&QueryDepDate=20160701&QueryDur=8&CategoryId=2&QueryRoomAges=%7C42,42,9,10&QueryUnits=1",
  "pathname": "/bestil-pakkerejse",
  "path": "/bestil-pakkerejse?QueryDepID=12678&QueryCtryID=-1&QueryAreaID=0&QueryResID=-1&QueryDepDate=20160701&QueryDur=8&CategoryId=2&QueryRoomAges=%7C42,42,9,10&QueryUnits=1",
  "href": "http://www.spies.dk/bestil-pakkerejse?QueryDepID=12678&QueryCtryID=-1&QueryAreaID=0&QueryResID=-1&QueryDepDate=20160701&QueryDur=8&CategoryId=2&QueryRoomAges=%7C42,42,9,10&QueryUnits=1"
}
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

### No Node
