# result-js

[![Greenkeeper badge](https://badges.greenkeeper.io/minecrawler/result-js.svg)](https://greenkeeper.io/)
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
One of the major differences is that result-js uses lowerCamelCase instead of snake_case.
Additionally, the methods `ok()`, `err()` and `unwrapOrDefault()` were not implemented, since the former require a Option-dependency and the latter can easily be worked around by providing a default value yourself (using `Result.or()`).

`result-js` does not have any dependencies and conducts unit tests and coverage with `TAP` and `coveralls`.

**You can find the complete API, as defined in code, below the examples!**


## Installation

    npm i result-js --save


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


## API

All methods work just as described in the [Rust documentation](https://doc.rust-lang.org/core/result/enum.Result.html).
The interface below includes Exceptions, however all methods are fully implemented and will not throw.
The Exceptions are in place in order to provide you a clear, non-cluttered API overview.

```js
/**
 * Rusty Result wrapper
 *
 * @type {Result}
 */
module.exports = class Result {
    /**
     * Create success Result with a return value.
     *
     * @param {*} val
     * @returns {Result}
     */
    static fromSuccess(val) { throw new Error ('Not Implemented: Result.fromSuccess'); };

    /**
     * Create error Result with a return value.
     *
     * @param {*} err
     * @returns {Result}
     */
    static fromError(err) { throw new Error ('Not Implemented: Result.fromError'); };

    /**
     * Similar to Rust's `try!`, but only returns a {Result} to the caller
     *
     * @param {function} fun Function to execute
     * @returns {Result}
     */
    static fromTry(fun) { throw new Error ('Not Implemented: Result.fromTry'); };

    /**
     * Register global convenience-functions Ok() and Err()
     */
    static registerGlobals() { throw new Error ('Not Implemented: Result.registerGlobals'); };

    /**
     * Returns true if the result is Ok.
     *
     * @returns {boolean}
     */
    isOk() { throw new Error ('Not Implemented: Result.isOk'); };

    /**
     * Returns true if the result is Err.
     *
     * @returns {boolean}
     */
    isErr() { throw new Error ('Not Implemented: Result.isErr'); };

    /**
     * Maps a Result<T, E> to Result<U, E> by applying a function to a contained Ok value, leaving an Err value untouched.
     * This function can be used to compose the results of two functions.
     *
     * @param {function} op
     * @returns {Result}
     */
    map(op) { throw new Error ('Not Implemented: Result.map'); };

    /**
     * Maps a Result<T, E> to Result<T, F> by applying a function to a contained Err value, leaving an Ok value untouched.
     * This function can be used to pass through a successful result while handling an error.
     *
     * @param {function} op
     * @returns {Result}
     */
    mapErr(op) { throw new Error ('Not Implemented: Result.mapErr'); };

    /**
     * Returns an iterator over the possibly contained value.
     * The iterator yields one value if the result is Ok, otherwise none.
     *
     * @returns {Iterable.<*>}
     */
    iter() { throw new Error ('Not Implemented: Result.iter'); };

    /**
     * Returns `Ok(val)` if the result is Ok, otherwise returns `Err(err)` of itself.
     *
     * @param {*} val
     * @returns {Result}
     */
    and(val) { throw new Error ('Not Implemented: Result.and'); };

    /**
     * Calls `resultEmitter` if the result is Ok, otherwise returns `Err(err)` value of itself.
     * This function can be used for control flow based on Result values.
     *
     * @param {ResultEmitter} resultEmitter
     * @returns {Result}
     */
    andThen(resultEmitter) { throw new Error ('Not Implemented: Result.andThen'); };

    /**
     * Returns `Ok(val)` if the result is Err, otherwise returns `Ok(ok)` of itself.
     *
     * @param {*} val
     * @returns {Result}
     */
    or(val) { throw new Error ('Not Implemented: Result.or'); };

    /**
     * Calls `resultEmitter` if the result is Err, otherwise returns the `Ok(ok)` value of itself.
     * This function can be used for control flow based on result values.
     *
     * @param {ResultEmitter} resultEmitter
     * @returns {Result}
     */
    orElse(resultEmitter) { throw new Error ('Not Implemented: Result.orElse'); };

    /**
     * Unwraps a result, yielding the content of an Ok.
     *
     * @throws if the value is an Err, with a message provided by the Err's value.
     * @returns {*}
     */
    unwrap() { throw new Error ('Not Implemented: Result.unwrap'); };

    /**
     * Unwraps a result, yielding the content of optb. Else it throws.
     *
     * @param {*} optb
     * @return {*}
     */
    unwrapAnd(optb) { throw new Error ('Not Implemented: Result.unwrapAnd'); };

    /**
     * Unwraps a result, calling valEmitter with its value. If the value is an Err then it throws.
     *
     * @param {ValueEmitter} valEmitter
     * @return {*}
     */
    unwrapAndThen(valEmitter) { throw new Error ('Not Implemented: Result.unwrapAndThen'); };

    /**
     * Unwraps a result, yielding the content of an Err.
     *
     * @throws if the value is an Ok, with a custom panic message provided by the Ok's value.
     * @returns {*}
     */
    unwrapErr() { throw new Error ('Not Implemented: Result.unwrapErr'); };

    /**
     * Unwraps a result, yielding the content of an Ok. Else it returns optb.
     *
     * @param {*} optb
     * @return {*}
     */
    unwrapOr(optb) { throw new Error ('Not Implemented: Result.unwrapOr'); };

    /**
     * Unwraps a result, yielding the content of an Ok. If the value is an Err then it calls valEmitter with its value.
     *
     * @param {ValueEmitter} valEmitter
     * @return {*}
     */
    unwrapOrElse(valEmitter) { throw new Error ('Not Implemented: Result.unwrapOrElse'); };

    /**
     * Unwraps a result, yielding the content of an Ok.
     *
     * @throws if the value is an Err, with a message including the passed message, and the content of the Err.
     * @param {String} msg
     * @returns {*}
     */
    expect(msg) { throw new Error ('Not Implemented: Result.expect'); };

    /**
     * Unwraps a result, yielding the content of an Err.
     *
     * @throws if the value is an Ok, with a panic message including the passed message, and the content of the Ok.
     * @param {String} msg
     * @returns {*}
     */
    expectErr(msg) { throw new Error ('Not Implemented: Result.expectErr'); };

    /**
     * JS convenience then-like handler (sync)
     *
     * @param {ResultHandler} okHandler
     * @param {ResultHandler} errHandler
     */
    match(okHandler, errHandler) { throw new Error ('Not Implemented: Result.match'); };

    /**
     * JS convenience method to handle a result NodeJS-style
     * Example:
     * Result.fromError('uh oh!').node((err, val) => {
     *   // do sth.
     * });
     *
     * @param {NodeJSStyleHandler} handler
     */
    node(handler) { throw 'Not Implemented: Result.node'; };
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
 * This Callback is used to produce a final Value
 *
 * @callback ValueEmitter
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

/**
 * This callback is used as NodeJS-style handler
 *
 * @callback NodeJSStyleHandler
 * @oaram {*} err null if no error occurred
 * @param {*} val null if an error occurred
 */
```
