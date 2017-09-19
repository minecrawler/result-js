'use strict';

const H = require('../interface/result.h').prototype;
const sym = require('../interface/result-sym.h');


H.unwrapAnd = function ($val) {
    if (this[sym.isOk]) {
        return $val;
    }

    throw new Error('The contained value is an Err!');
};
