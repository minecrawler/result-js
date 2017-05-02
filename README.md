# result-js
Rusty Monad Results for JS
---

[![Build Status](https://travis-ci.org/minecrawler/result-js.svg?branch=master)](https://travis-ci.org/minecrawler/result-js)
[![Coverage Status](https://coveralls.io/repos/github/minecrawler/result-js/badge.svg)](https://coveralls.io/github/minecrawler/result-js)

Standard JS error management is done via `throw` and `try..catch` statements.
They, however, pose the risk that error opportunities are not handled by the user of an API,
hence pose the risk of fatal runtime errors.

In order to make a user aware of the risk of failure, monad error management was created.
One of the most prominent usages of such a result system is `core::result::Result` of the programming language Rust.

This module is based on the Rust implementation, but brings some changes in order to better use it in JS.
One of the major differences is, that there are no `Ok()` and `Err()`.
Instead, certain methods can be used to determine the Result type and value or error.


## Installation

    npm i result-js --save


## API

All methods work just as described in the [Rust documentation](https://doc.rust-lang.org/core/result/enum.Result.html).

```js
/**
 * Rusty Result wrapper
 *
 * @type {Result}
 */
module.exports = class Result {

    /**
     * Create new Result from either a value or an error
     * Leave the one you don't need undefined
     * You have to pass something to exactly one of the two
     * 
     * @param {*} val
     * @param {*} err
     */
    constructor (val, err) { this._init(val, err); };

    /**
     * Create success Result with a return value.
     *
     * @param {*} val
     * @returns {Result}
     */
    static fromSuccess(val) {};

    /**
     * Create error Result with a return value.
     *
     * @param {*} err
     * @returns {Result}
     */
    static fromError(err) {};

    /**
     * Similar to Rust's `try!`, but only returns a {Result} to the caller
     *
     * @param {function} fun Function to execute
     * @returns {Result}
     */
    static fromTry(fun) {};

    /**
     * Register global convenience-functions Ok() and Err()
     */
    static registerGlobals() {};

    /**
     * Returns true if the result is Ok.
     *
     * @returns {boolean}
     */
    isOk() {};

    /**
     * Returns true if the result is Err.
     *
     * @returns {boolean}
     */
    isErr() {};

    /**
     * Returns `val` if the result is Ok, otherwise returns the Err value of itself.
     *
     * @param {*} val
     * @returns {*}
     */
    and(val) {};

    /**
     * Calls `resultEmitter` if the result is Ok, otherwise returns the Err value of itself.
     * This function can be used for control flow based on Result values.
     *
     * @param {ResultEmitter} resultEmitter
     * @returns {*}
     */
    andThen(resultEmitter) {};

    /**
     * Returns `val` if the result is Err, otherwise returns the Ok value of itself.
     *
     * @param {*} val
     * @returns {*}
     */
    or(val) {};

    /**
     * Calls `resultEmitter` if the result is Err, otherwise returns the Ok value of itself.
     * This function can be used for control flow based on result values.
     *
     * @param {ResultEmitter} resultEmitter
     * @returns {*}
     */
    orElse(resultEmitter) {};

    /**
     * Unwraps a result, yielding the content of an Ok.
     *
     * @throws if the value is an Err, with a message provided by the Err's value.
     * @returns {*}
     */
    unwrap() {};

    /**
     * Unwraps a result, yielding the content of an Ok.
     *
     * @throws if the value is an Err, with a message including the passed message, and the content of the Err.
     * @param {String} msg
     * @returns {*}
     */
    expect(msg) {};

    /**
     * JS convenience then-like handler (sync)
     *
     * @param {ResultHandler} okHandler
     * @param {ResultHandler} errHandler
     */
    match(okHandler, errHandler) {};

    /**
     * JS convenience then-like handler (async)
     *
     * @param {ResultHandler} okHandler
     * @param {ResultHandler} errHandler
     */
    then(okHandler, errHandler) {};
};

/**
 * This Callback is used to produce a final Result
 *
 * @callback ResultEmitter
 * @param {*} val
 *   `val` will contain the result of {Result}.
 * @returns {*}
 */

/**
 * This Callback is used as a return-handler
 *
 * @callback ResultHandler
 * @param {*} ret
 *   `ret` will either contain the result or the error, depending on the parameter position of the callback
 */
```


## Simple Example

In the following example, you can see that the traditional way needs a lot more LoC, the type of myResult is not pinned and you might forget to use `try..catch`.
The Result Monad helps to clean this mess up!

For more simple examples, please take a look at `./test.js`, on which Travis CI and Coveralls tests are based!

```js
'use strict';

// Traditional way

const syncButMightFail = () => {

  throw 'NaY!';
};

let myResult = 'YaY';
try {
  myResult = syncButMightFail();
}
catch($e) {
  console.log($e.toString()); // don't even care...
}


// -------------------------------------
// With Result


const Result = require('result-js');

const syncButMightFail = () => {

  return Result.fromError('NaY!');
};

const myResult = syncButMightFail().or('YaY');
```


## Usage

### Create new Result

```js
'use strict';

const Result = require('result-js');

const resultOk = Result.fromSuccess('YaY');
const resultErr = Result.fromError('NaY');

// ...
```


### Register Ok() and Err()

```js
// ...

// After the following line, Ok() and Err() will be available on a global level.
// That means that you can do stuff, like
//     return Ok(val);
//     return Err('failed!');
Result.registerGlobals();

// ...
```


### Check if Error

```js
// ...

if (resultOk.isOk() || !resultOk.isErr()) { console.log('Result is OK; this will be visible!'); }
if (resultErr.isOk() || !resultErr.isErr()) { console.log('Result is OK; this will _not_ be visible!'); }
```


### Get Value

```js
// ...

// `unwrap` will throw if the Result is an Error
var myResult = resultOk.unwrap();

// `expect` will also throw if the Result is an Error, but add a message
myResult = resultOk.expect('uh oh!');

// `and` will return the passed value instead of the Ok-value if the Result is not an error
myResult = resultOk.and('SURPRISE!');
myResult = resultOk.andThen(res => res + ' for Result!');


// `or` will return the passed value instead of the Result's error value in case the Result was an error
myResult = resultErr.or('no error any more!');
myResult = resultErr.orElse(err => new Error(err));

// Or just a very simple match, just what you already know from then-ables, like Promises
resultErr.match(okVal => {
  console.log('Since we use the `resultErr` Result, this message will never be visiable!');
}, errVal => {
  console.log('This message will be visible! The error is: ' + errVal);
});
```


### Control Flow

```js
// ...

console.log(
  resultOk.andThen(() => Ok(2)).andThen(val => val * val)
);
// -> 4


console.log(
  resultErr.orElse(() => Ok(3)).andThen(val => val * val)
);
// -> 9
```
