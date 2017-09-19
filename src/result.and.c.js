'use strict';

const H = require('../interface/result.h').prototype;
const sym = require('../interface/result-sym.h');


H.and = function ($val) {
    if (this[sym.isOk]) {
        this[sym.value] = $val;
    }

    return this;
};
