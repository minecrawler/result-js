'use strict';

const hProto = require('../interface/result.h').prototype;
const sym = require('../interface/result-sym.h');


hProto.or = function ($val) {
    if (!this[sym.isOk]) {
        this[sym.value] = $val;
        this[sym.isOk] = true;
    }

    return this;
};
