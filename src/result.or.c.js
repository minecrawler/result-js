'use strict';

const h = require('../interface/result.h');
const hProto = h.prototype;
const sym = require('../interface/result-sym.h');


hProto.or = function ($val) {
    return this[sym.isOk]
        ? this
        : h.fromSuccess($val)
    ;
};
