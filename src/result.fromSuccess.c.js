'use strict';

const H = require('../interface/result.h');
const sym = require('../interface/result-sym.h');


H.fromSuccess = function ($val) {
    const result = new H();

    result[sym.isOk] = true;
    result[sym.value] = $val;

    return result;
};
