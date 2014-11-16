dbcsv
=====

A simple database sourced from csv file(s). An alternative to [csvdb](https://www.npmjs.org/package/csvdb) which is actually really great and where you should be looking for this sort of functionality first. I needed something a little simpler and more specific for a project. Due to the nature of CSV files everything in dbcsv is treated as a string, even the numbers.


### Use

```javascript
var db = require('dbcsv')(<csv source filename>, [options]);
```


### Example

[/example/basic.js](example/basic.js) applied to source file [../test/sample.csv](test/sample.csv).

```javascript
var dbcsv = require('..'),
path = require('path');

var source = path.resolve(__dirname, './test/sample.csv');

var db = dbcsv(source);

console.log('-- .headers --');
console.log(db.headers);

console.log('-- .numColumns --');
console.log(db.numColumns);

console.log('-- .size --');
console.log(db.size);

console.log('-- .version --');
console.log(db.version);

console.log('-- .column(0) --');
console.log(db.column(0));

console.log('-- .row(0) --');
console.log(db.row(0));

console.log('-- .search({threshold : "3.0"}) --');
console.log(db.search({threshold : '3.0'}));
```

```text
-- .headers --
[ 'id', 'threshold', 'description' ]

-- .numColumns --
3

-- .size --
4

-- .version --
0.0.0

-- .column(0) --
[ '1', '2', '3', '4' ]

-- .row(0) --
{ id: '1',
  threshold: '5.0',
  description: 'This is the first row of data' }

-- .search({threshold : "3.0"}) --
[ { id: '2',
    threshold: '3.0',
    description: 'This is the second row of data' },
  { id: '4',
    threshold: '3.0',
    description: 'This is the fourth row of data' } ]
```

### ToDo

* better csv parsing options
* read only for now - the need to write out is not present yet
* seperate "has headers" from "use headers" in configuration
* there will be a conflict for headers if headers have numeric index 
* better searching (perhaps allow search on a custom function)

