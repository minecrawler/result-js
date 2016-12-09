'use strict';

require('../interface/result.h').prototype.orElse = function ($resultEmitter) {

    return this.isErr() ? $resultEmitter() : this._val;
};
