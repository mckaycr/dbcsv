dbcsv
=====

[![Build Status](https://travis-ci.org/tleen/dbcsv.png?branch=master)](https://travis-ci.org/tleen/dbcsv)

A simple database sourced from csv file(s). An alternative to [csvdb](https://www.npmjs.org/package/csvdb) which is actually really great and where you should be looking for this sort of functionality first. I needed something a little simpler and more specific for a project. Due to the nature of CSV files everything in dbcsv is treated as a string, even the numbers.


### Use

```javascript
var db = require('dbcsv')(<csv source filename>, [options object]);
```

#### Options
The options object may contain:

- **encoding** string, encoding value of the CSV source, defaults to '*utf8*'.
- **headers** boolean, treat the first line as column headers, defaults to *true*. With this enabled you may alias columns with their header names in search() and column(), likewise results are returned as key, value pairs with the header value as the key. When disabled the column numerical index is used as the key. Column index may always be used in search() and column().
- **trim** boolean, remove whitespace from entries, defaults to *true*.
- **headersLower** boolean, transform header names to lowercase, defaults to *true*, only useful if **headers** is enabled.

#### Properties

- **.headers** array of column header values, will be numeric values if headers are disabled.
- **.numColumns** the number of columns in the database.
- **.size** the number of rows in the database (excluding the header row if headers are active).
- **.version** the package version of this module

#### Methods

- **.column(key)** return an array of all the data in a column, key is the column index (leftmost starting from 0), key may also be header value if headers are active.
- **.row(index)** return single row array at numeric index starting at 0, if headers are enabled first data row is index 0.
- **.search(query)** returns a two dimensional array of all rows exactly matching properties represented in the query object, if query is a function return all rows where function returns truthy.

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

