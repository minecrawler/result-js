'use strict';

require('../interface/result.h').prototype.andThen = function ($resultEmitter) {

    return this.isOk() ? $resultEmitter(this._val) : new Error(this._err);
};
