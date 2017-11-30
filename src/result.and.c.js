'use strict';

const h = require('../interface/result.h');
const hProto = h.prototype;
const sym = require('../interface/result-sym.h');


H.and = function ($val) {
    return this[sym.isOk]
        ? h.fromSuccess($val)
        : this
    ;
};
