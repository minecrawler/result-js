'use strict';

const H = require('../interface/result.h');
const sym = require('../interface/result-sym.h');


H.fromError = function ($err) {
    const result = new H();

    result[sym.isOk] = false;
    result[sym.value] = $err;

    return result;
};
