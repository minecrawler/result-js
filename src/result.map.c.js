'use strict';

const Result = require('../interface/result.h');
const hProto = Result.prototype;
const sym = require('../interface/result-sym.h');


hProto.map = function ($op) {
    const op = typeof $op === 'function'
        ? $op
        : () => this[sym.value]
    ;

    if (this[sym.isOk]) {
        this[sym.value] = op(this[sym.value]);
    }

    return this;
};
