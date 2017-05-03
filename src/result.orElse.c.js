'use strict';

const hProto = require('../interface/result.h').prototype


hProto.orElse = function ($resultEmitter) {

    return this.isErr() ? $resultEmitter(this._err) : this._val;
};

hProto.unwrapOrElse = hProto.orElse;
