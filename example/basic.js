'use strict';

var dbcsv = require('..'),
path = require('path');

var source = path.resolve(__dirname, '../test/sample.csv');

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
