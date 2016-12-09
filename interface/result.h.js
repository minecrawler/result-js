'use strict';

module.exports = class Result {
    
    constructor (val, err) { /*super();*/ this._init(val, err); };
    
    static asMixin(superclass) { throw 'Not Implemented: Result::asMixin!'; };
    static fromSuccess(val) { throw 'Not Implemented: Result::fromSuccess!'; };
    static fromError(err) { throw 'Not Implemented: Result::fromError!'; };
    static fromPromise(promise) { throw 'Not Implemented: Result::fromPromise!'; };
    
    isOk() { throw 'Not Implemented: Result::isOk!'; };
    isErr() { throw 'Not Implemented: Result::isErr!'; };
    and(val) { throw 'Not Implemented: Result::and!'; };
    andThen(resultEmitter) { throw 'Not Implemented: Result::andThen!'; };
    or(val) { throw 'Not Implemented: Result::or!'; };
    orElse(resultEmitter) { throw 'Not Implemented: Result::orElse!'; };
    unwrap() { throw 'Not Implemented: Result::unwrap!'; };
    expect(msg) { throw 'Not Implemented: Result::expect!'; };
    match(okHandler, errHandler) { throw 'Not Implemented: Result::match!'; };
};
