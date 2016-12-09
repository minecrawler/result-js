#!/sbin/node

'use strict';

var Result = require('.');

var r = Result.fromPromise(new Promise(($res, $rej) => {
    
    setTimeout($res.bind(undefined, 'HELLOW!'), 3000);
}));

console.log(r.expect('An exception occurred'));
