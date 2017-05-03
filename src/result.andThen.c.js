'use strict';

require('../interface/result.h').prototype.andThen = function ($resultEmitter) {

    return this.isOk() ? $resultEmitter(this._val) : this._err;
};
