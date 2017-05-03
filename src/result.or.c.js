'use strict';

const hProto = require('../interface/result.h').prototype


hProto.or = function ($val) {

    return this.isErr() ? $val : this._val;
};

hProto.unwrapOr = hProto.or;
