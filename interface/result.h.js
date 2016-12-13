'use strict';

/**
 * This Callback is used to produce a final Result
 *
 * @callback Emitter~ResultEmitter
 * @param {*} val
 *   `val` will contain the result of {Result}.
 * @returns {*}
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
    static fromSuccess(val) { throw 'Not Implemented: Result::fromSuccess!'; };

    /**
     * Create error Result with a return value.
     *
     * @param {*} err
     * @returns {Result}
     */
    static fromError(err) { throw 'Not Implemented: Result::fromError!'; };

    /**
     * Returns true if the result is Ok.
     *
     * @returns {boolean}
     */
    isOk() { throw 'Not Implemented: Result::isOk!'; };

    /**
     * Returns true if the result is Err.
     *
     * @returns {boolean}
     */
    isErr() { throw 'Not Implemented: Result::isErr!'; };

    /**
     * Returns `val` if the result is Ok, otherwise returns the Err value of itself.
     *
     * @param {*} val
     * @returns {*}
     */
    and(val) { throw 'Not Implemented: Result::and!'; };

    /**
     * Calls `resultEmitter` if the result is Ok, otherwise returns the Err value of itself.
     * This function can be used for control flow based on Result values.
     *
     * @param {Emitter~ResultEmitter} resultEmitter
     * @returns {*}
     */
    andThen(resultEmitter) { throw 'Not Implemented: Result::andThen!'; };
    or(val) { throw 'Not Implemented: Result::or!'; };
    orElse(resultEmitter) { throw 'Not Implemented: Result::orElse!'; };
    unwrap() { throw 'Not Implemented: Result::unwrap!'; };
    expect(msg) { throw 'Not Implemented: Result::expect!'; };
    match(okHandler, errHandler) { throw 'Not Implemented: Result::match!'; };
};
