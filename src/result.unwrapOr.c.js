'use strict';

const hProto = require('../interface/result.h').prototype;
const sym = require('../interface/result-sym.h');


hProto.unwrapOr = function ($val) {
    if (!this[sym.isOk]) {
        return $val;
    }

    return this[sym.value];
};
