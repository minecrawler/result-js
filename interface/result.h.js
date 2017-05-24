'use strict';

//                                          ...
//                       s,                .                    .s
//                        ss,              . ..               .ss
//                        'SsSs,           ..  .           .sSsS'
//                         sSs'sSs,        .   .        .sSs'sSs
//                          sSs  'sSs,      ...      .sSs'  sSs
//                           sS,    'sSs,         .sSs'    .Ss
//                           'Ss       'sSs,   .sSs'       sS'
//                  ...       sSs         ' .sSs'         sSs       ...
//                 .           sSs       .sSs' ..,       sSs       .
//                 . ..         sS,   .sSs'  .  'sSs,   .Ss        . ..
//                 ..  .        'Ss .Ss'     .     'sSs. ''        ..  .
//                 .   .         sSs '       .        'sSs,        .   .
//                  ...      .sS.'sSs        .        .. 'sSs,      ...
//                        .sSs'    sS,     .....     .Ss    'sSs,
//                     .sSs'       'Ss       .       sS'       'sSs,
//                  .sSs'           sSs      .      sSs           'sSs,
//               .sSs'____________________________ sSs ______________'sSs,
//            .sSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS'.Ss SSSSSSSSSSSSSSSSSSSSSs,
//                                    ...         sS'
//                                     sSs       sSs
//                                      sSs     sSs
//                                       sS,   .Ss
//                                       'Ss   sS'
//                                        sSs sSs
//                                         sSsSs
//                                          sSs
//                                           s

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
 * This callback is used as NodeJS-style handler
 *
 * @callback NodeJSStyleHandler
 * @oaram {*} err null if no error occurred
 * @param {*} val null if an error occurred
 */

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
     * Returns `val` if the result is Ok, otherwise returns the Err value of itself.
     *
     * @param {*} val
     * @returns {*}
     */
    and(val) { throw new Error ('Not Implemented: Result.and'); };

    /**
     * Calls `resultEmitter` if the result is Ok, otherwise returns the Err value of itself.
     * This function can be used for control flow based on Result values.
     *
     * @param {ResultEmitter} resultEmitter
     * @returns {*}
     */
    andThen(resultEmitter) { throw new Error ('Not Implemented: Result.andThen'); };

    /**
     * Returns `val` if the result is Err, otherwise returns the Ok value of itself.
     * Since there are no strict types in JS, this method and unwrapOr are identical.
     *
     * @alias unwrapOr
     * @param {*} val
     * @returns {*}
     */
    or(val) { throw new Error ('Not Implemented: Result.or'); };

    /**
     * Calls `resultEmitter` if the result is Err, otherwise returns the Ok value of itself.
     * This function can be used for control flow based on result values.
     * Since there are no strict types in JS, this method and unwrapOrElse are identical.
     *
     * @alias unwrapOrElse
     * @param {ResultEmitter} resultEmitter
     * @returns {*}
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
     * Unwraps a result, yielding the content of an Err.
     * 
     * @throws if the value is an Ok, with a custom panic message provided by the Ok's value.
     * @returns {*}
     */
    unwrapErr() { throw new Error ('Not Implemented: Result.unwrapErr'); };

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
