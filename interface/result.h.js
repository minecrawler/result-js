'use strict';

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

/**
 * Rusty Result wrapper
 *
 * @type {Result}
 */
module.exports = class Result {
    
    constructor (val, err) { this._init(val, err); };

    /**
     * Create success Result with a return value.
     *
     * @param {*} val
     * @returns {Result}
     */
    static fromSuccess(val) { /* throw 'Not Implemented: Result::fromSuccess!'; */ };

    /**
     * Create error Result with a return value.
     *
     * @param {*} err
     * @returns {Result}
     */
    static fromError(err) { /* throw 'Not Implemented: Result::fromError!'; */ };

    /**
     * Returns true if the result is Ok.
     *
     * @returns {boolean}
     */
    isOk() { /* throw 'Not Implemented: Result::isOk!'; */ };

    /**
     * Returns true if the result is Err.
     *
     * @returns {boolean}
     */
    isErr() { /* throw 'Not Implemented: Result::isErr!'; */ };

    /**
     * Returns `val` if the result is Ok, otherwise returns the Err value of itself.
     *
     * @param {*} val
     * @returns {*}
     */
    and(val) { /* throw 'Not Implemented: Result::and!'; */ };

    /**
     * Calls `resultEmitter` if the result is Ok, otherwise returns the Err value of itself.
     * This function can be used for control flow based on Result values.
     *
     * @param {ResultEmitter} resultEmitter
     * @returns {*}
     */
    andThen(resultEmitter) { /* throw 'Not Implemented: Result::andThen!'; */ };

    /**
     * Returns `val` if the result is Err, otherwise returns the Ok value of itself.
     *
     * @param {*} val
     * @returns {*}
     */
    or(val) { /* throw 'Not Implemented: Result::or!'; */ };

    /**
     * Calls `resultEmitter` if the result is Err, otherwise returns the Ok value of itself.
     * This function can be used for control flow based on result values.
     *
     * @param {ResultEmitter} resultEmitter
     * @returns {*}
     */
    orElse(resultEmitter) { /* throw 'Not Implemented: Result::orElse!'; */ };

    /**
     * Unwraps a result, yielding the content of an Ok.
     *
     * @throws if the value is an Err, with a message provided by the Err's value.
     * @returns {*}
     */
    unwrap() { /* throw 'Not Implemented: Result::unwrap!'; */ };

    /**
     * Unwraps a result, yielding the content of an Ok.
     *
     * @throws if the value is an Err, with a message including the passed message, and the content of the Err.
     * @param {String} msg
     * @returns {*}
     */
    expect(msg) { /* throw 'Not Implemented: Result::expect!'; */ };

    /**
     * JS convenience then-like handler
     *
     * @param {ResultHandler} okHandler
     * @param {ResultHandler} errHandler
     */
    match(okHandler, errHandler) { /* throw 'Not Implemented: Result::match!'; */ };
};
